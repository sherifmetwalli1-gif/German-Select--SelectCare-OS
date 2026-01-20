#!/bin/bash
# Frontend Page Test Suite for SelectCareOS

BASE_URL="${1:-http://localhost:3000}"
PASS=0
FAIL=0
TOTAL=0

GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m'

test_page() {
    local path=$1
    local description=$2
    
    TOTAL=$((TOTAL + 1))
    
    response=$(curl -s -w "\n%{http_code}" "$BASE_URL$path")
    status_code=$(echo "$response" | tail -n1)
    body=$(echo "$response" | sed '$d')
    
    # Check for HTML and no obvious errors
    has_html=$(echo "$body" | grep -c "<!DOCTYPE html\|<html" | head -1)
    has_error=$(echo "$body" | grep -ci "error\|exception\|undefined" | head -1)
    
    if [[ "$status_code" == "200" ]] && [[ "$has_html" -gt 0 ]]; then
        echo -e "${GREEN}✓ PASS${NC} $path - $description"
        PASS=$((PASS + 1))
    else
        echo -e "${RED}✗ FAIL${NC} $path - $description (Status: $status_code)"
        FAIL=$((FAIL + 1))
    fi
}

echo "=============================================="
echo "SelectCareOS Frontend Page Test Suite"
echo "Base URL: $BASE_URL"
echo "=============================================="
echo ""

echo "--- Main Pages ---"
test_page "/" "Home page"
test_page "/dashboard" "Patient Dashboard"
test_page "/premium" "Premium Home"
test_page "/services" "Services page"

echo ""
echo "--- Doctor Pages ---"
test_page "/doctors" "Doctors list"
test_page "/doctor/dr-metwalli" "Doctor profile"
test_page "/doctor-dashboard" "Doctor Dashboard"
test_page "/doctor-dashboard?id=dr-metwalli&lang=de" "Doctor Dashboard (German)"
test_page "/doctor-dashboard?id=dr-metwalli&tab=schedule" "Doctor Dashboard (Schedule)"

echo ""
echo "--- Booking & Consultation ---"
test_page "/booking" "Booking page"
test_page "/instant-doctor" "Instant Doctor"
test_page "/telemedicine" "Telemedicine"

echo ""
echo "--- Health Features ---"
test_page "/medisense" "MediSense AI"
test_page "/daily-wellness" "Daily Wellness"
test_page "/health-analytics" "Health Analytics"
test_page "/mindfulness" "Mindfulness"

echo ""
echo "--- Patient Features ---"
test_page "/patient-dashboard" "Patient Dashboard"
test_page "/care-team" "Care Team"
test_page "/timeline" "Treatment Timeline"
test_page "/family" "Family Hub"

echo ""
echo "--- Monetization ---"
test_page "/subscription" "Subscription"
test_page "/rewards" "Rewards"
test_page "/marketplace" "Marketplace"
test_page "/packages" "Care Packages"

echo ""
echo "--- Admin & Other ---"
test_page "/admin/dashboard" "Admin Dashboard"
test_page "/affiliate" "Affiliate Dashboard"
test_page "/ai-concierge" "AI Concierge"

echo ""
echo "=============================================="
echo -e "Results: ${GREEN}$PASS passed${NC}, ${RED}$FAIL failed${NC}, $TOTAL total"
echo "=============================================="

if [ $FAIL -gt 0 ]; then
    exit 1
fi
exit 0
