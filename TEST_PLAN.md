# 🧪 Test Plan – Shopping List App Automation

## 1. Objective
The goal of this test plan is to verify the functionality, reliability, and robustness of the Shopping List application, which consists of a React frontend and a Node.js backend API. Automated tests are implemented using Playwright with a Page Object Model (POM) structure to validate both UI and API flows.

---

## 2. Scope
### 🟢 In Scope:
- UI Testing: Login, add/edit/delete items, UI validation
- API Testing: All endpoints `/login`, `/items`, `/items/:id`
- CI Execution: GitHub Actions pipeline
- Cross-browser testing via Playwright (Chromium by default)

---

## 3. Test Types
### ✅ Functional UI Automation
Using Playwright + POM to simulate user flows:
- Login with valid and invalid credentials
- Add a new shopping item
- Edit existing item name
- Delete an item
- Assert the presence/absence of expected UI elements

### ✅ API Testing
Using Playwright API capabilities (`request.newContext()`):
- `POST /login` - success, incorrect password, and incorrect username
- `GET /items` - validate response and item list
- `POST /items` - add a new item, duplicate prevention, invalid characters, empty values
- `PUT /items/:id` - update item, duplicate name prevention
- `DELETE /items/:id` - delete item, handle missing item

---

## 4. Tools & Frameworks
| Purpose        | Tool             |
|----------------|------------------|
| UI Automation  | Playwright       |
| API Testing    | Playwright       |
| Test Structure | Page Object Model|
| CI/CD          | GitHub Actions   |

---

## 5. Environment & Setup
- Frontend: React app running on `http://localhost:3000`
- Backend: Express API running on `http://localhost:5000`
- Playwright tests assume both servers are running locally or mocked in CI

### Local Setup
```bash
npm install
npx playwright install
npx playwright test
```

### CI Setup
GitHub Actions is used to run tests on every push/pull request to `main`. Artifacts like HTML reports are uploaded automatically.

---

## 6. Assumptions
- Data is reset between runs or uniquely named to avoid duplication errors
- Localhost ports 3000 and 5000 are available during test execution
- Project dependencies are correctly installed (Playwright, React, Express)

---

## 7. Reporting
- Test output is available via Playwright HTML report
- On CI, test artifacts are uploaded under the GitHub Actions "Artifacts" section
- Failures provide stack trace + screenshot/snapshot if enabled

### ✅ Tests Successfully Executed
- `API Tests > Login success`
- `API Tests > Login fail incorrect password`
- `API Tests > Login fail incorrect username`
- `API Tests > validate Add item`
- `API Tests > validate Read items`
- `API Tests > validate Update item`
- `API Tests > validate Delete item`
- `API Tests > validate Add incorrect item with special characters error message`
- `API Tests > validate Add an empty value error message`
- `Login Tests > validate show error for wrong password`
- `Login Tests > validate show error for wrong username`
- `Login Tests > validate login with valid credentials`
- `Shopping Item Tests > validate add, edit, and delete an item`

---

## 8. Contributors
- Desmond Mahlatse – QA Automation Engineer

---

✅ This test plan ensures comprehensive automated validation of the shopping list app across both UI and API layers.