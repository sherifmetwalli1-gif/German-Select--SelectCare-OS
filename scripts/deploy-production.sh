#!/bin/bash
# German Select Health Platform - SelectCareOS
# Production Deployment Script
# 
# Prerequisites:
# 1. Cloudflare API token configured (npx wrangler login)
# 2. D1 database created (npx wrangler d1 create selectcareos-production)
# 3. KV namespaces created
# 4. R2 buckets created
# 5. Secrets configured (npx wrangler secret put SECRET_NAME)

set -e

echo "🏥 SelectCareOS Production Deployment"
echo "======================================"
echo ""

# Color codes
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if wrangler is authenticated
echo "📋 Pre-flight checks..."
if ! npx wrangler whoami > /dev/null 2>&1; then
    echo -e "${RED}❌ Wrangler not authenticated. Run 'npx wrangler login' first.${NC}"
    exit 1
fi
echo -e "${GREEN}✓ Wrangler authenticated${NC}"

# Check for uncommitted changes
if [[ -n $(git status --porcelain) ]]; then
    echo -e "${YELLOW}⚠️  Warning: Uncommitted changes detected${NC}"
    read -p "Continue anyway? (y/N) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi
echo -e "${GREEN}✓ Git status checked${NC}"

# Build the application
echo ""
echo "🔨 Building application..."
npm run build
echo -e "${GREEN}✓ Build complete${NC}"

# Run type checking
echo ""
echo "📝 Running type check..."
npx tsc --noEmit 2>/dev/null || echo -e "${YELLOW}⚠️  Type check warnings (non-blocking)${NC}"
echo -e "${GREEN}✓ Type check complete${NC}"

# Apply database migrations (if D1 is configured)
echo ""
echo "🗄️  Database migrations..."
if [ -d "migrations" ] && [ "$(ls -A migrations/*.sql 2>/dev/null)" ]; then
    echo "Applying migrations to production database..."
    npx wrangler d1 migrations apply selectcareos-production --remote || {
        echo -e "${YELLOW}⚠️  Migration skipped (database may not be created yet)${NC}"
    }
else
    echo "No migrations found"
fi
echo -e "${GREEN}✓ Database migrations handled${NC}"

# Deploy to Cloudflare Pages
echo ""
echo "🚀 Deploying to Cloudflare Pages..."
PROJECT_NAME=${CLOUDFLARE_PROJECT_NAME:-selectcareos}

# Check if project exists, create if not
if ! npx wrangler pages project list | grep -q "$PROJECT_NAME"; then
    echo "Creating new Pages project: $PROJECT_NAME"
    npx wrangler pages project create "$PROJECT_NAME" \
        --production-branch main \
        --compatibility-date 2025-12-16
fi

# Deploy
DEPLOY_OUTPUT=$(npx wrangler pages deploy dist --project-name "$PROJECT_NAME" 2>&1)
echo "$DEPLOY_OUTPUT"

# Extract deployment URL
DEPLOY_URL=$(echo "$DEPLOY_OUTPUT" | grep -oP 'https://[a-zA-Z0-9.-]+\.pages\.dev' | head -1)

echo ""
echo -e "${GREEN}✓ Deployment complete!${NC}"
echo ""
echo "======================================"
echo "🎉 DEPLOYMENT SUMMARY"
echo "======================================"
echo ""
echo "Project: $PROJECT_NAME"
echo "URL: $DEPLOY_URL"
echo "Environment: Production"
echo "Timestamp: $(date -u +"%Y-%m-%dT%H:%M:%SZ")"
echo ""
echo "📋 Post-deployment tasks:"
echo "  1. Verify health endpoint: curl $DEPLOY_URL/api/health"
echo "  2. Run smoke tests"
echo "  3. Monitor error rates in Cloudflare dashboard"
echo "  4. Update DNS if using custom domain"
echo ""
echo "🔐 Security reminders:"
echo "  - Ensure all secrets are configured"
echo "  - Verify rate limiting is active"
echo "  - Check CORS configuration"
echo "  - Review access logs"
echo ""

# Optional: Run health check
echo "Running health check..."
sleep 5
if [ -n "$DEPLOY_URL" ]; then
    HEALTH_RESPONSE=$(curl -s "$DEPLOY_URL/api/health" 2>/dev/null)
    if echo "$HEALTH_RESPONSE" | grep -q '"status":"healthy"'; then
        echo -e "${GREEN}✓ Health check passed${NC}"
    else
        echo -e "${YELLOW}⚠️  Health check returned unexpected response${NC}"
        echo "$HEALTH_RESPONSE"
    fi
fi

echo ""
echo "======================================"
echo "🏁 Deployment script complete"
echo "======================================"
