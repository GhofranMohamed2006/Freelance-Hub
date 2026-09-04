# Lynk Backend — MVC Version

This version uses the architecture requested:

```text
server.js
   ↓
routes
   ↓
controllers
   ↓
services
   ↓
models
   ↓
JSON files
```

## Structure

```text
src/
├── config/
│   └── env.js
├── middleware/
│   ├── auth.js
│   └── error.js
├── models/
│   ├── User.js
│   ├── Category.js
│   ├── Job.js
│   ├── Proposal.js
│   ├── Project.js
│   ├── Contract.js
│   ├── Message.js
│   ├── Notification.js
│   ├── Payment.js
│   ├── Setting.js
│   └── Review.js
├── services/
│   ├── auth.service.js
│   ├── user.service.js
│   ├── category.service.js
│   ├── job.service.js
│   ├── proposal.service.js
│   ├── project.service.js
│   ├── contract.service.js
│   ├── message.service.js
│   ├── notification.service.js
│   ├── payment.service.js
│   └── setting.service.js
├── controllers/
│   ├── auth.controller.js
│   ├── user.controller.js
│   ├── category.controller.js
│   ├── job.controller.js
│   ├── proposal.controller.js
│   ├── project.controller.js
│   ├── contract.controller.js
│   ├── message.controller.js
│   ├── notification.controller.js
│   ├── payment.controller.js
│   ├── setting.controller.js
│   └── upload.controller.js
├── routes/
│   ├── auth.routes.js
│   ├── users.routes.js
│   ├── jobs.routes.js
│   ├── proposals.routes.js
│   ├── projects.routes.js
│   ├── contracts.routes.js
│   ├── messages.routes.js
│   ├── notifications.routes.js
│   ├── payments.routes.js
│   ├── categories.routes.js
│   ├── settings.routes.js
│   └── uploads.routes.js
├── utils/
│   ├── helpers.js
│   └── jsonStore.js
└── server.js
```

## Route mounting

`server.js` intentionally uses explicit route mounting:

```js
app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/users", require("./routes/users.routes"));
app.use("/api/jobs", require("./routes/jobs.routes"));
app.use("/api/proposals", require("./routes/proposals.routes"));
app.use("/api/projects", require("./routes/projects.routes"));
app.use("/api/contracts", require("./routes/contracts.routes"));
app.use("/api/messages", require("./routes/messages.routes"));
app.use("/api/notifications", require("./routes/notifications.routes"));
app.use("/api/payments", require("./routes/payments.routes"));
app.use("/api/categories", require("./routes/categories.routes"));
app.use("/api/settings", require("./routes/settings.routes"));
app.use("/api/uploads", require("./routes/uploads.routes"));
```

The `require()` here only loads the route module. Route files call controller methods; controllers call services; services call models.

## JWT

Login/register returns:

```json
{
  "token": "JWT_TOKEN",
  "user": {}
}
```

Frontend:

```js
localStorage.setItem("lynk_token", data.token);
```

Protected requests:

```http
Authorization: Bearer JWT_TOKEN
```

## Run

```bash
npm install
cp .env.example .env
npm run dev
```

Windows PowerShell:

```powershell
npm install
Copy-Item .env.example .env
npm run dev
```

API:

```text
http://localhost:5000/api
```

## API routes

### Auth
POST `/auth/register`
POST `/auth/login`
GET `/auth/me`
POST `/auth/forgot-password`
PATCH `/auth/password`

### Users
GET `/users`
GET `/users/:id`
POST `/users`
PATCH `/users/:id`
DELETE `/users/:id`
GET `/users/:id/public-profile`

### Categories
GET `/categories`
GET `/categories/:id`
POST `/categories`
PATCH `/categories/:id`
DELETE `/categories/:id`

### Jobs
GET `/jobs`
GET `/jobs/:id`
POST `/jobs`
PATCH `/jobs/:id`
DELETE `/jobs/:id`
POST `/jobs/:id/view`

### Proposals
GET `/proposals`
GET `/proposals/:id`
POST `/proposals`
PATCH `/proposals/:id`
DELETE `/proposals/:id`

### Projects
GET `/projects`
GET `/projects/:id`
POST `/projects`
PATCH `/projects/:id`
DELETE `/projects/:id`
POST `/projects/:id/milestones`
PATCH `/projects/:id/milestones/:milestoneId`
DELETE `/projects/:id/milestones/:milestoneId`

### Contracts
GET `/contracts`
GET `/contracts/:id`
POST `/contracts`
PATCH `/contracts/:id`
DELETE `/contracts/:id`

### Messages
GET `/messages/conversations`
GET `/messages`
GET `/messages/:id`
POST `/messages`
PATCH `/messages/:id`
DELETE `/messages/:id`
POST `/messages/:id/read`

### Notifications
GET `/notifications`
GET `/notifications/:id`
POST `/notifications`
PATCH `/notifications/:id`
DELETE `/notifications/:id`
POST `/notifications/read-all`

### Payments
GET `/payments`
GET `/payments/:id`
POST `/payments`
PATCH `/payments/:id`
DELETE `/payments/:id`
POST `/payments/:id/release`

### Settings
GET `/settings`
PATCH `/settings`
PUT `/settings/notifications`

### Uploads
POST `/uploads` — multipart field `file`, max 50 MB

## Important

JSON files are intentionally used instead of a database. This is appropriate for development/demo use. For production, replace the model persistence implementation with a real database.
