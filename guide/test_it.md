# How to Test It Out

Testing the **PulseHealthAI** ensures that all functionalities are working as expected. You can run automated tests or interact with the PulseHealthAI in different modes to verify its operations.

## Running Automated Tests

The project includes a test script located at `test/index.ts`. To execute the tests:

1. **Ensure Dependencies are Installed**
   - If you haven't installed the dependencies yet, refer to the [Setup Locally](./setup_locally.md) guide.

2. **Run the Test Script**
   ```bash
   pnpm run test
   ```
   This will run the `test/index.ts` script using `ts-node`. Ensure that your environment variables are correctly set in the `.env` file before running the tests.

## Interactive Modes

### Available Modes
1. **Health Monitoring Mode**
   - Allows you to interact with the PulseHealthAI in a conversational manner related to health insights.

2. **Autonomous Health Check Mode**
   - Enables the PulseHealthAI to autonomously perform health data analysis and checks at regular intervals.

### Starting PulseHealthAI

1. **Launch PulseHealthAI**
   ```bash
   pnpm start
   ```

2. **Select Your Mode**
   - For Health Monitoring Mode: Enter `1` or `health-monitor`
   - For Autonomous Health Check Mode: Enter `2` or `auto-check`

### Using Each Mode

#### Health Monitoring Mode
- Start chatting by entering prompts after the `Prompt:` indicator
- Type `exit` to end the session

#### Autonomous Health Check Mode
- The agent performs health data analysis every 10 seconds
- Health insights and outputs are displayed in the console

## Code Examples

### Health Data Processing
```typescript
import { PulseHealthAI } from "pulse-health-ai";

const agent = new PulseHealthAI("your_private_key");

const result = await agent.processHealthData({
  heartRate: 72,
  bloodPressure: "120/80",
  steps: 10000,
});

console.log("Health Data Processed:", result);
```

### Health Report Generation
```typescript
import { PulseHealthAI } from "pulse-health-ai";

const agent = new PulseHealthAI("your_private_key");

const report = await agent.generateHealthReport({
  userId: "user123",
  dateRange: "last_week",
});

console.log("Generated Health Report:", report);
```

## Best Practices

### Environment Setup
- Verify `.env` file contains correct and secure values
- Ensure all required environment variables are set

### Testing
- Maintain comprehensive test coverage
- Monitor console logs during testing
- Clean up test data after each test run

## Troubleshooting

### Test Failures

#### Missing Environment Variables
- **Issue:** Tests fail due to missing environment variables
- **Solution:** Check `.env` file for all required variables

#### Network Problems
- **Issue:** Network-related errors
- **Solution:** Verify internet connection and health data API endpoint accessibility

### PulseHealthAI Issues

#### Startup Problems
- **Issue:** PulseHealthAI doesn't prompt for mode selection
- **Solution:** Verify successful build and dependency installation
