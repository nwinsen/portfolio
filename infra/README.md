# DNS migration notes

This repo now models `winsen.dev` DNS in Cloudflare instead of Route 53.

## What changed

- `infra/frontend` creates the Cloudflare zone for `winsen.dev`
- `infra/frontend` manages the apex/root record for the CloudFront site
- `infra/frontend` manages ACM DNS validation records in Cloudflare
- `infra/backend` looks up the existing Cloudflare zone and manages:
  - `api.winsen.dev`
  - ACM DNS validation records for the API custom domain

AWS still owns the application infrastructure:

- CloudFront
- ACM certificates
- API Gateway
- Lambda
- S3
- DynamoDB

Cloudflare only becomes the authoritative DNS provider.

## Required inputs

Both stacks now require:

- `cloudflare_account_id`
- `CLOUDFLARE_API_TOKEN` in the environment

Example:

```bash
export CLOUDFLARE_API_TOKEN=...
terraform apply -var="cloudflare_account_id=..."
```

## Cutover order

1. Apply `infra/frontend` to create the Cloudflare zone and DNS records.
2. Read the `cloudflare_name_servers` output.
3. Update the registrar to use the Cloudflare nameservers.
4. Apply `infra/backend` so `api.winsen.dev` and API ACM validation records exist in Cloudflare too.
5. Verify `winsen.dev` and `api.winsen.dev` resolve correctly.
6. Remove the old Route 53 hosted zone only after the nameserver cutover is complete.

## Important note

The Cloudflare records in this repo are intentionally set with `proxied = false` for a low-risk DNS authority migration first. You can turn proxying on later once the move is stable.
