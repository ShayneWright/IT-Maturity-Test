#!/usr/bin/env bash
set -euo pipefail

project_root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$project_root"

if [[ ! -f dist/index.html || ! -d dist/assets ]]; then
  echo "dist is missing a production build (expected dist/index.html and dist/assets)." >&2
  echo "Run npm install, npm test, npm run lint, and npm run build first." >&2
  exit 1
fi

rm -f assessment-production.zip
(
  cd dist
  zip -q -r ../assessment-production.zip .
)

echo "Created $project_root/assessment-production.zip"
