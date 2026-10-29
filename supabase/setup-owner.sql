-- Run once as the project administrator after applying migrations.
-- This address was explicitly selected by the shop owner in the conversation.
insert into private.allowed_owners(email) values('dolbundaljai@gmail.com') on conflict do nothing;
