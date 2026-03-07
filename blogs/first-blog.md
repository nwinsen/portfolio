---
title: "How I improved my portfolio site"
date: "2026-02-28"
description: "How I moved from a Vercel SPA to a clean AWS deployment"
tags: ["infra", "aws"]
---

## Former: Vercel

Formerly, I had a one-shot click to host for this site.

As a bit of a side project, and as my first foray into true cloud hosting, I wanted to engineer both somewhere I could write thoughts, and track useful metrics both client and server side.

Thus, I turned to AWS - one of the most notorious cloud services on the market. :)

## New: AWS

### Client Side

- Here, I utilize Route53 for DNS configuration
- I utilize S3 to store public images and a dist/ folder.
- I use cloudfront as a CDN.

### Server Side

- The backend is simply just two lambda handlers which handle the posting and viewing of a blog post.
- On push of a new markdown file, GitHub Actions will automatically register a blog in the DynamoDB table.
- The client runs a UseEffect on view of a post, which sends a PATCH request to lambda to update the views by one.
