-- ============================================================================
-- Email alerts for Vulture Security website leads
-- ============================================================================
-- Every new row in public.leads with site = 'vulture-security' (the contact
-- form and the risk assessment form) is emailed to info@vulturesecurity.ca
-- through Resend. Reply to the alert and it goes straight to the visitor.
--
-- Where to run it: Supabase dashboard > virus-demos > SQL Editor > New query.
-- Paste this whole file, put the Resend API key in place of
-- PASTE_RESEND_API_KEY_HERE (step 2), click Run.
--
-- Before running:
--   * vulturesecurity.ca shows "Verified" in Resend > Domains
--   * a Resend API key with "Sending access", limited to vulturesecurity.ca
--
-- After running: clear the key out of the editor tab. It is stored encrypted
-- in Supabase Vault. Re-running this file later without a key keeps the
-- stored one, so the email wording can be changed without the key.
--
-- Other sites in the same leads table (e.g. Aspire) are not affected.
-- ============================================================================


-- 1. Outbound HTTP from the database (async, so saving a lead never waits on email)
create extension if not exists pg_net with schema extensions;


-- 2. Store the Resend API key in Vault
do $$
declare
  api_key  constant text := 'PASTE_RESEND_API_KEY_HERE';
  existing uuid;
begin
  select id into existing from vault.secrets where name = 'vulture_resend_api_key';

  if api_key = 'PASTE_RESEND_API_KEY_HERE' then
    if existing is null then
      raise exception 'Paste the Resend API key in step 2 first. It starts with re_';
    end if;
    raise notice 'Keeping the Resend key already stored in Vault.';
  elsif left(api_key, 3) <> 're_' then
    raise exception 'That does not look like a Resend API key. It should start with re_';
  elsif existing is null then
    perform vault.create_secret(api_key, 'vulture_resend_api_key', 'Resend key for Vulture Security lead alerts');
  else
    perform vault.update_secret(existing, api_key);
  end if;
end $$;


-- 3. The function that sends the alert
create schema if not exists private;
revoke all on schema private from public;

create or replace function private.email_vulture_lead()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  is_assessment boolean := coalesce(new.interest, '') = 'Free risk assessment';
  short_name    text    := left(regexp_replace(new.name, '\s+', ' ', 'g'), 80);
  api_key       text;
  recent        integer;
  subject       text;
  body          text;
  payload       jsonb;
begin
  -- Flood guard: at most 30 alerts an hour. Leads are still saved either way.
  select count(*) into recent
  from public.leads
  where site = 'vulture-security'
    and created_at > now() - interval '1 hour';
  if recent > 30 then
    return new;
  end if;

  select decrypted_secret into api_key
  from vault.decrypted_secrets
  where name = 'vulture_resend_api_key'
  limit 1;
  if api_key is null then
    return new;
  end if;

  subject := case
    when is_assessment then 'Risk assessment request: ' || short_name
    else 'Website message: ' || short_name
  end;

  body := concat_ws(E'\n',
    case
      when is_assessment then 'New free risk assessment request from vulturesecurity.ca.'
      else 'New message from the vulturesecurity.ca contact form.'
    end,
    '',
    'Name:   ' || new.name,
    'Email:  ' || new.email,
    'Phone:  ' || coalesce(nullif(new.phone, ''), 'not given'),
    '',
    coalesce(nullif(new.message, ''), '(no message)'),
    '',
    '----',
    'Received: ' || to_char(new.created_at at time zone 'America/Edmonton', 'FMMon FMDD, YYYY "at" FMHH12:MI AM') || ' Calgary time',
    'Page: ' || coalesce(new.source_url, 'unknown'),
    'Hit Reply to answer ' || short_name || ' directly.'
  );

  payload := jsonb_build_object(
    'from',    'Vulture Security Website <website@vulturesecurity.ca>',
    'to',      jsonb_build_array('Vulture Security <info@vulturesecurity.ca>'),
    'subject', subject,
    'text',    body
  );

  -- Replies go to the visitor, when their address is usable.
  if new.email ~* '^[^@\s<>",;]+@[^@\s<>",;]+\.[^@\s<>",;]+$' then
    payload := payload || jsonb_build_object('reply_to', new.email);
  end if;

  perform net.http_post(
    url                  := 'https://api.resend.com/emails',
    headers              := jsonb_build_object(
                              'Authorization', 'Bearer ' || api_key,
                              'Content-Type',  'application/json'),
    body                 := payload,
    timeout_milliseconds := 10000
  );

  return new;
exception when others then
  -- An alert problem must never stop a lead from being saved.
  raise warning 'Vulture lead alert not sent: %', sqlerrm;
  return new;
end;
$$;

revoke all on function private.email_vulture_lead() from public, anon, authenticated;


-- 4. Fire it for every new Vulture lead
drop trigger if exists email_vulture_lead on public.leads;
create trigger email_vulture_lead
  after insert on public.leads
  for each row
  when (new.site = 'vulture-security')
  execute function private.email_vulture_lead();


-- ============================================================================
-- Optional: send a test alert, then check it went out
-- ============================================================================
-- insert into public.leads (site, name, email, interest, message)
-- values ('vulture-security', 'Test Lead', 'info@vulturesecurity.ca',
--         'General enquiry', 'Test alert from Supabase. Safe to ignore.');
--
-- Wait a few seconds, then:
-- select created, status_code, content::text, error_msg
-- from net._http_response order by created desc limit 5;
--   status_code 200 = sent. 403 usually means the domain is not verified yet.
--
-- Remove the test row:
-- delete from public.leads where site = 'vulture-security' and name = 'Test Lead';
--
-- To turn alerts off:
-- drop trigger if exists email_vulture_lead on public.leads;
