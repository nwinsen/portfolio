variable "site_domain" {
  type    = string
  default = "winsen.dev"
}

variable "project_name" {
  description = "Project name"
  type        = string
  default     = "winsen-portfolio"
}

variable "api_subdomain" {
  type    = string
  default = "api"
}

variable "cloudflare_account_id" {
  description = "Cloudflare account id that owns the winsen.dev zone"
  type        = string
}

variable "api_gateway_target_domain_name" {
  description = "Existing API Gateway regional target read from the live Route 53 alias"
  type        = string
}
