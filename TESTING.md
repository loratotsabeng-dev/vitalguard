🧪 TESTING AND VALIDATION

# Test Plan & Results

## Test Environment
- OS: Windows 11
- Browsers: Microsoft Edge
- Simulated patient data: custom Python script

## Test Cases

| ID   | Feature    | Description                       | Steps                                   | Expected                          | Actual                               | Status   | Notes |
|------|------------|-----------------------------------|-----------------------------------------|-----------------------------------|--------------------------------------|----------|-------|
| T001 | Monitoring | Send HR=130                       | 1. Run mock script 2. Observe dashboard | Alert appears within 2s           | Alert appeared at 1.7s               | ✅ PASS  | -     |
| T002 | Chatbot    | Ask "dose of ibuprofen for child" | Type in chat                            | Returns correct weight‑based dose | Returned correct dose with reference | ✅ PASS  | -     |
| T003 | Smart Alert|                                   | ...                                     | ...                               | ...                                  | ...       | ...   |
| T003 |            |
| T003 |            |
| T004 |            |
| T005 |
| T006 |
| T007 |
| T008 |
| T009 |


## Screenshots of Key Tests
![Alert Test](link)
![Chatbot Response](link)

## Coverage Report
- Backend: 85% (see `coverage.xml`)
- Frontend: 78% (see Jest output)
