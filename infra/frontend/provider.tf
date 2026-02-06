# --- OPEN TOFU ENGINE SETTINGS ---
# This block configures OpenTofu itself, not the cloud resources.
terraform {
  # Pins the engine version. If a teammate has an older version, Tofu will 
  # stop and error out rather than potentially corrupting your state file.
  required_version = "~> 1.0" 

  required_providers {
    # The AWS "Provider" is a plugin that translates HashicorpConfigLanguage into AWS API calls.
    aws = {
      source  = "hashicorp/aws"
      # Pins the plugin version. Avoid "latest" so that 
      # new updates don't break our existing infrastructure unexpectedly.
      version = "~> 5.34.0" 
    }
  }
}

# --- AWS CONNECTION SETTINGS ---
# This block tells OpenTofu where and how to build your resources.
provider "aws" {
  # Your primary region. For CloudFront/ACM, you may eventually need a 
  # second provider block for us-east-1 (N. Virginia).
  region = "us-east-1" 

  # PRODUCTION STANDARD: Global Tagging
  # This automatically attaches these labels to EVERY resource (S3, Lambda, etc.).
  # It is vital for professional billing reports and resource organization.
  default_tags {
    tags = {
      Project     = var.project_name  # Groups all costs for this specific project
      Environment = "Production"    # Distinguishes from staging/dev accounts
      ManagedBy   = "OpenTofu"      # Warns manual clickers that this is automated
      Owner       = "Nick"          # Identifies who to talk to about these costs
    }
  }
}

provider "aws" {
  alias = "us_east_1"
  region = "us-east-1" # This is for configuration of SSL Certificates
}