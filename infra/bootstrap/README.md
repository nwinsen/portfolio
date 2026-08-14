# Terraform state bucket bootstrap

This stack creates the S3 bucket required by the frontend and backend Terraform state backends. It is intentionally bootstrapped once from a trusted machine with local state. Do not add this directory to the normal Terraform Actions plan/apply jobs.

The bucket is private, versioned, encrypted at rest, protected from public access, and configured to deny non-TLS requests. Terraform 1.11's S3 native lockfile is used by the main stacks, so no DynamoDB lock table is required.

## Bootstrap

From this directory, with AWS credentials configured for the account that owns the portfolio:

```bash
terraform init
terraform apply \
  -var="state_bucket_name=winsen-terraform-state-ACCOUNT_ID"
```

The bucket name must be globally unique. Use lowercase letters, numbers, dots, and hyphens only.

Then add the output value to the GitHub `production` environment as the secret:

```text
TF_STATE_BUCKET=<terraform output -raw state_bucket_name>
```

The main Terraform workflow uses `us-east-1`, matching the portfolio's existing deployment workflow.

## Safety

Keep the bootstrap state file backed up securely. Do not commit `terraform.tfstate`, `.tfvars`, or credentials. The bucket must exist before enabling the main Terraform plan/apply workflow.
