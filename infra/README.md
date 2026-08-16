# DNS migration notes

This repo now prepares `winsen.dev` for a hard DNS cutover from Route 53 to Cloudflare.

## What changed

- `infra/frontend` keeps the existing Route 53 zone and records alive
- `infra/frontend` creates the Cloudflare zone for `winsen.dev`
- `infra/frontend` creates matching apex/root and ACM validation records in Cloudflare
- `infra/backend` looks up the existing Cloudflare zone and manages:
  - `api.winsen.dev`
  - ACM DNS validation records for the API custom domain
- `infra/backend` also keeps the existing Route 53 API records alive until the registrar nameserver switch

AWS still owns the application infrastructure:

- CloudFront
- ACM certificates
- API Gateway
- Lambda
- S3
- DynamoDB

Cloudflare is prepared in parallel first, then becomes the authoritative DNS provider at nameserver cutover time.

## Required inputs

Both stacks now require:

- `cloudflare_account_id`
- `CLOUDFLARE_API_TOKEN` in the environment

The GitHub Actions Terraform workflow also requires these **production environment secrets**:

- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID`
- `TF_STATE_BUCKET`
- the existing `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY`

`TF_STATE_BUCKET` must be an existing, private S3 bucket with versioning enabled. The workflow uses native S3 state locking with `use_lockfile=true`; no DynamoDB table is required.

Example local setup:

```bash
export CLOUDFLARE_API_TOKEN=...
export TF_VAR_cloudflare_account_id=...
terraform init \
  -backend-config="bucket=..." \
  -backend-config="key=portfolio/frontend.tfstate" \
  -backend-config="region=us-east-1" \
  -backend-config="encrypt=true" \
  -backend-config="use_lockfile=true"
```

The `winsen.dev` Cloudflare zone already exists, so import it into the frontend state before the first plan:

```bash
terraform import cloudflare_zone.main <ZONE_ID>
```

Do not run the Actions apply until the existing AWS resources and Cloudflare zone are represented in the remote state. A fresh state would try to recreate production resources.

## Cutover order

1. Apply `infra/frontend` to create the Cloudflare zone and mirror the current frontend DNS there, while Route 53 stays live.
2. Apply `infra/backend` to mirror `api.winsen.dev` and the API ACM validation records into Cloudflare too.
3. Read the `cloudflare_name_servers` output.
4. Update the registrar to use the Cloudflare nameservers.
5. Verify `winsen.dev` and `api.winsen.dev` resolve correctly after the nameserver change propagates.
6. Remove the old Route 53 hosted zone and Route 53 records only after the cutover is confirmed stable.

## Important note

The Cloudflare records in this repo are intentionally set with `proxied = false` for a low-risk DNS authority cutover first. You can turn proxying on later once the move is stable.
