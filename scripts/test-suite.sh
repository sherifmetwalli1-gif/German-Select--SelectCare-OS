#!/bin/bash
# SelectCareOS Enterprise Test Suite
# Version: 2.4.0
# Last Updated: January 26, 2026

set -e

GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

BASE_URL="${1:-http://localhost:3000}"

echo "=============================================="
echo "  SelectCareOS™ Enterprise Test Suite"
echo "  Testing: $BASE_URL"
echo "=============================================="
echo ""

# Test counters
PASSED=0
FAILED=0
TOTAL=0

# Test function
test_endpoint() {
    local endpoint=$1
    local expected_code=${2:-200}
    local description=$3
    
    TOTAL=$((TOTAL + 1))
    
    code=$(curl -s -o /dev/null -w "%{http_code}" "$BASE_URL$endpoint")
    
    if [ "$code" -eq "$expected_code" ]; then
        echo -e "${GREEN}✓${NC} $endpoint ($code) - $description"
        PASSED=$((PASSED + 1))
    else
        echo -e "${RED}✗${NC} $endpoint (expected: $expected_code, got: $code) - $description"
        FAILED=$((FAILED + 1))
    fi
}

# Test JSON response
test_json() {
    local endpoint=$1
    local expected_field=$2
    local description=$3
    
    TOTAL=$((TOTAL + 1))
    
    response=$(curl -s "$BASE_URL$endpoint")
    
    if echo "$response" | grep -q "$expected_field"; then
        echo -e "${GREEN}✓${NC} $endpoint - $description"
        PASSED=$((PASSED + 1))
    else
        echo -e "${RED}✗${NC} $endpoint - $description (missing: $expected_field)"
        FAILED=$((FAILED + 1))
    fi
}

echo "1. Health & Status Checks"
echo "--------------------------"
test_json "/api/health" "healthy" "Health endpoint returns healthy"
test_json "/api/health" "SelectCareOS" "Platform name present"
test_json "/api/health" "2.0.0" "Version present"

echo ""
echo "2. Page Routes (All should return 200)"
echo "---------------------------------------"
test_endpoint "/" 200 "Home page"
test_endpoint "/dashboard" 200 "Patient dashboard"
test_endpoint "/services" 200 "Services page"
test_endpoint "/medisense" 200 "MediSense AI"
test_endpoint "/calculators" 200 "Health calculators"
test_endpoint "/doctors" 200 "Doctor listing"
test_endpoint "/booking" 200 "Booking system"
test_endpoint "/packages" 200 "Care packages"
test_endpoint "/wellness" 200 "Wellness hub"
test_endpoint "/telemedicine" 200 "Telemedicine portal"
test_endpoint "/doctor-dashboard" 200 "Doctor dashboard"
test_endpoint "/emergency" 200 "Emergency services"
test_endpoint "/instant-connect" 200 "Instant connect"
test_endpoint "/retreats" 200 "Medical retreats"
test_endpoint "/admin" 200 "Admin panel"
test_endpoint "/profile" 200 "User profile"
test_endpoint "/timeline" 200 "Treatment timeline"

echo ""
echo "3. API Endpoints"
echo "-----------------"
test_endpoint "/api/doctors" 200 "Doctors API"
test_endpoint "/api/packages" 200 "Packages API"
test_endpoint "/api/instant-connect/stats" 200 "Instant connect stats"
test_endpoint "/api/telemedicine/config" 200 "Telemedicine config"
test_endpoint "/api/accommodations" 200 "Accommodations API"

echo ""
echo "4. Data Integrity"
echo "------------------"
test_json "/api/doctors" "dr-metwalli" "Dr. Metwalli in doctors"
test_json "/api/doctors" "dr-sherif-aly" "Dr. Sherif Aly in doctors"
test_json "/api/packages" "healbridge-essential" "HealBridge package exists"
test_json "/api/packages" "vitacare-premium" "VitaCare package exists"

echo ""
echo "5. UI Component Tests"
echo "----------------------"

# Bottom nav test
bottom_nav_count=$(curl -s "$BASE_URL/dashboard" | grep -c "bottom-nav" || true)
TOTAL=$((TOTAL + 1))
if [ "$bottom_nav_count" -gt 0 ]; then
    echo -e "${GREEN}✓${NC} Dashboard has bottom navigation ($bottom_nav_count occurrences)"
    PASSED=$((PASSED + 1))
else
    echo -e "${RED}✗${NC} Dashboard missing bottom navigation"
    FAILED=$((FAILED + 1))
fi

# Gold color consistency test
gold_count=$(curl -s "$BASE_URL/dashboard" | grep -io "D4A843" | wc -l || true)
TOTAL=$((TOTAL + 1))
if [ "$gold_count" -gt 0 ]; then
    echo -e "${GREEN}✓${NC} Dashboard uses correct gold color #D4A843 ($gold_count occurrences)"
    PASSED=$((PASSED + 1))
else
    echo -e "${YELLOW}!${NC} Dashboard may have incorrect gold color"
    FAILED=$((FAILED + 1))
fi

echo ""
echo "=============================================="
echo "  Test Results"
echo "=============================================="
echo -e "  Passed: ${GREEN}$PASSED${NC}"
echo -e "  Failed: ${RED}$FAILED${NC}"
echo "  Total:  $TOTAL"
echo ""

if [ $FAILED -eq 0 ]; then
    echo -e "${GREEN}All tests passed!${NC}"
    exit 0
else
    echo -e "${RED}Some tests failed. Please review.${NC}"
    exit 1
fi
