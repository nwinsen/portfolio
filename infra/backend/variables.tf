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
