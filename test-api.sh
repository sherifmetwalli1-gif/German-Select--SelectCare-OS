#!/bin/bash
# Comprehensive API Test Suite for SelectCareOS

BASE_URL="${1:-http://localhost:3000}"
PASS=0
FAIL=0
TOTAL=0

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m'

test_endpoint() {
    local method=$1
    local endpoint=$2
    local expected_status=$3
    local data=$4
    local description=$5
    
    TOTAL=$((TOTAL + 1))
    
    if [ "$method" == "GET" ]; then
        response=$(curl -s -w "\n%{http_code}" "$BASE_URL$endpoint")
    else
        response=$(curl -s -w "\n%{http_code}" -X "$method" -H "Content-Type: application/json" -d "$data" "$BASE_URL$endpoint")
    fi
    
    status_code=$(echo "$response" | tail -n1)
    body=$(echo "$response" | sed '$d')
    
    # Check for success field in JSON OR valid JSON response
    success=$(echo "$body" | grep -o '"success":\s*true' | head -1)
    is_json=$(echo "$body" | grep -o '^{' | head -1)
    
    if [[ "$status_code" == "$expected_status" ]] && [[ -n "$success" || -n "$is_json" ]]; then
        echo -e "${GREEN}✓ PASS${NC} [$method] $endpoint - $description"
        PASS=$((PASS + 1))
    else
        echo -e "${RED}✗ FAIL${NC} [$method] $endpoint - $description (Status: $status_code)"
        FAIL=$((FAIL + 1))
    fi
}

echo "=============================================="
echo "SelectCareOS API Test Suite"
echo "Base URL: $BASE_URL"
echo "=============================================="
echo ""

echo "--- Core Health & Info APIs ---"
test_endpoint "GET" "/api/health" "200" "" "Health check"
test_endpoint "GET" "/api" "200" "" "API info"

echo ""
echo "--- Doctor APIs ---"
test_endpoint "GET" "/api/doctors" "200" "" "List all doctors"
test_endpoint "GET" "/api/doctors/dr-metwalli" "200" "" "Get specific doctor"
test_endpoint "GET" "/api/doctors/dr-metwalli/availability?week=0" "200" "" "Doctor availability"

echo ""
echo "--- Instant Connect APIs ---"
test_endpoint "GET" "/api/instant-connect/stats" "200" "" "Instant Connect stats"
test_endpoint "GET" "/api/instant-connect/doctors" "200" "" "Available doctors"
test_endpoint "GET" "/api/instant-connect/doctors?specialty=Bariatric%20Surgery" "200" "" "Filter by specialty"

echo ""
echo "--- Doctor Schedule APIs ---"
test_endpoint "GET" "/api/instant-connect/doctor/dr-metwalli/schedule" "200" "" "Doctor schedule"
test_endpoint "GET" "/api/instant-connect/doctor/dr-metwalli/available-slots" "200" "" "Available slots"
test_endpoint "GET" "/api/instant-connect/doctor/dr-metwalli/history" "200" "" "Consultation history"
test_endpoint "GET" "/api/instant-connect/doctor/dr-metwalli/earnings" "200" "" "Doctor earnings"

echo ""
echo "--- Package & Treatment APIs ---"
test_endpoint "GET" "/api/packages" "200" "" "List packages"
test_endpoint "GET" "/api/treatments" "200" "" "List treatments"
test_endpoint "GET" "/api/wellness" "200" "" "Wellness services"
test_endpoint "GET" "/api/accommodations" "200" "" "Accommodations"
test_endpoint "GET" "/api/excursions" "200" "" "Excursions"

echo ""
echo "--- Vitals & Health APIs ---"
test_endpoint "GET" "/api/vitals/current" "200" "" "Current vitals"
test_endpoint "GET" "/api/vitals/history" "200" "" "Vitals history"
test_endpoint "GET" "/api/devices" "200" "" "Connected devices"
test_endpoint "GET" "/api/ai/analysis" "200" "" "AI health analysis"

echo ""
echo "--- User & Rewards APIs ---"
test_endpoint "GET" "/api/user/stats" "200" "" "User stats"
test_endpoint "GET" "/api/subscriptions/tiers" "200" "" "Subscription tiers"
test_endpoint "GET" "/api/rewards/config" "200" "" "Rewards config"
test_endpoint "GET" "/api/marketplace/products" "200" "" "Marketplace products"

echo ""
echo "--- MediSense Pro APIs ---"
test_endpoint "GET" "/api/medisense-pro/stats" "200" "" "MediSense stats"
test_endpoint "GET" "/api/medisense-pro/health" "200" "" "MediSense health"
test_endpoint "GET" "/api/medisense-pro/symptoms?query=chest" "200" "" "Search symptoms"
test_endpoint "GET" "/api/medisense-pro/conditions" "200" "" "List conditions"
test_endpoint "GET" "/api/medisense-pro/medications" "200" "" "List medications"

echo ""
echo "--- POST Tests ---"
test_endpoint "POST" "/api/instant-connect/connect" "200" '{"patientId":"test-123","patientName":"Test Patient","urgency":"routine"}' "Create instant connection"
test_endpoint "POST" "/api/instant-connect/doctor/status" "200" '{"doctorId":"dr-metwalli","status":"available"}' "Update doctor status"

echo ""
echo "=============================================="
echo -e "Results: ${GREEN}$PASS passed${NC}, ${RED}$FAIL failed${NC}, $TOTAL total"
echo "=============================================="

if [ $FAIL -gt 0 ]; then
    exit 1
fi
exit 0
