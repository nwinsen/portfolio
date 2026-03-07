# --- OPEN TOFU ENGINE SETTINGS ---
terraform {
  required_version = "~> 1.0"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.34.0"
    }
  }
}

# --- AWS CONNECTION SETTINGS ---
provider "aws" {
  region = "us-east-1"

  default_tags {
    tags = {
      Project     = var.project_name
      Environment = "Production"
      ManagedBy   = "OpenTofu"
      Owner       = "Nick"
    }
  }
}

provider "aws" {
  alias  = "us_east_1"
  region = "us-east-1"
}
