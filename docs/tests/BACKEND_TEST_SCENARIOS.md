# Backend Test Scenarios - Supabase

## Test 1: Anonymous User Creation
**Steps:**
1. Fresh install extension
2. First capture

**Expected:**
- User auto-created dans public.users (via trigger)
- tier = 'free'
- email = null
- Capture count = 1 dans daily_usage

**SQL Verify:**
```sql
SELECT * FROM public.users ORDER BY created_at DESC LIMIT 1;
SELECT * FROM public.daily_usage ORDER BY created_at DESC LIMIT 1;
```

---

## Test 2: Daily Limit Enforcement
**Steps:**
1. User avec 9 captures today
2. Capture #10 → Success
3. Capture #11 → Should fail

**Expected:**
- check_limit() returns `allowed: false` après capture #10
- Modal upgrade apparaît
- daily_usage.captures_count = 10

**SQL Verify:**
```sql
SELECT * FROM daily_usage WHERE user_id = 'USER_ID' AND date = CURRENT_DATE;
```

---

## Test 3: Monthly Limit Enforcement
**Steps:**
1. User avec 199 captures ce mois
2. Daily counter reset (nouveau jour)
3. Capture #200 → Success
4. Capture #201 → Should fail

**Expected:**
- check_limit() returns `allowed: false`
- reason = 'monthly_limit'

**SQL Verify:**
```sql
SELECT SUM(captures_count) as total 
FROM daily_usage 
WHERE user_id = 'USER_ID' 
AND date >= DATE_TRUNC('month', CURRENT_DATE);
```

---

## Test 4: Pro User Unlimited
**Steps:**
1. Upgrade user to Pro (via Stripe webhook simulation)
2. Capture 50+ times

**Expected:**
- check_limit() always returns `allowed: true`
- No modal upgrade
- All captures counted dans daily_usage

**SQL Update Pro:**
```sql
UPDATE public.users 
SET tier = 'pro', stripe_customer_id = 'cus_test123' 
WHERE id = 'USER_ID';
```

---

## Test 5: Stripe Webhook
**Steps:**
1. Simulate Stripe checkout.session.completed
2. Send POST to /api/webhooks/stripe

**Payload:**
```json
{
  "type": "checkout.session.completed",
  "data": {
    "object": {
      "customer": "cus_test123",
      "subscription": "sub_test123",
      "client_reference_id": "USER_UUID",
      "customer_details": {
        "email": "test@example.com"
      }
    }
  }
}
```

**Expected:**
- User tier updated to 'pro'
- stripe_customer_id set
- stripe_subscription_id set

---

## Test 6: Edge Cases
**Scenario:** Concurrent requests
- 2 captures simultanées à la limite (capture #10)
- Expected: Atomic increment, un seul doit passer

**Scenario:** Timezone edge
- Capture à 23:59 UTC
- Capture à 00:01 UTC
- Expected: Daily counter reset

**Scenario:** User sans email (anonymous)
- check_limit() doit fonctionner
- increment_capture_count() doit fonctionner
