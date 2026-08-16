variable "site_domain" {
  type    = string
  default = "winsen.dev"
}

variable "project_name" {
  description = "Project name"
  type        = string
  default     = "winsen-portfolio"
}

variable "cloudflare_account_id" {
  description = "Cloudflare account id that owns the winsen.dev zone"
  type        = string
}

variable "cloudfront_distribution_id" {
  description = "Existing CloudFront distribution serving the portfolio"
  type        = string
}
