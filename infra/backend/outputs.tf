output "api_url" {
  description = "Custom domain URL for the API"
  value       = "https://${var.api_subdomain}.${var.site_domain}"
}