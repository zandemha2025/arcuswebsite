#!/usr/bin/env bash
# Deploy a staging (preview) build to Vercel. Needs VERCEL_TOKEN in the environment.
set -euo pipefail
: "${VERCEL_TOKEN:?Set VERCEL_TOKEN}"
npx --yes vercel@latest pull --yes --environment=preview --token "$VERCEL_TOKEN"
npx --yes vercel@latest build --token "$VERCEL_TOKEN"
npx --yes vercel@latest deploy --prebuilt --token "$VERCEL_TOKEN"
