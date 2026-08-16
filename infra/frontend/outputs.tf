output "cloudflare_name_servers" {
  description = "Nameservers to set at the registrar during the Route 53 -> Cloudflare cutover"
  value       = data.cloudflare_zone.main.name_servers
}

output "site_url" {
  description = "Root site URL"
  value       = "https://${var.site_domain}"
}
