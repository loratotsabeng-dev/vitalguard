🧪 TESTING AND VALIDATION

# Test Plan & Results

## Test Environment
- OS: Windows 11
- Browsers: Microsoft Edge, Chrome
- Simulated patient data: AI-generated synthetic dataset

## Test Cases

| ID | Feature       | Description                     | Steps                                      | Expected                | Actual              | Status  |
|----|---------------|---------------------------------|--------------------------------------------|-------------------------|---------------------|---------|
|T01 |Log in         |User logs into the system        |1.Enter email 2.Enter password 3.Click login|User successfully logs in|Work as expected     |Pass     | 
|T02 |Dashboard      |Display patient overview         |1.Login 2.View dashboard                    |Dashboard is displayed   |Correct data shown   |Pass     |
|T03 |Prescription   |View prescription details        |1.Go to prescription tab                    |Prescription displayed   |Displayed correctly  |Pass     |
|T04 |Medical history|Scan QR code to view past records|1.Open medical history section              |Past medical records show|Records appear       |Pass     |
|T05 |Emergency alert|Trigger alert for abnormal vitals|1.Tap red button                            |Emergency alert sent     |Alert triggered      |Pass     |
|T06 |Scalability    |Consistent pages                 |1.Run pages on different devices            |Consistency and no crash |Work as expected     |Pass     |

## Screenshots of Key Tests
![Alert Test](link)
![Chatbot Response](link)

