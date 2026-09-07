const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const path = require("path");

const { port, clientOrigin } = require("./config/env");
const { notFound, errorHandler } = require("./middleware/error");

const app = express();

app.use(cors({ origin: clientOrigin === "*" ? true : clientOrigin }));
app.use(express.json({ limit: "2mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

app.get("/api/health", (req, res) =>
  res.json({
    ok: true,
    service: "lynk-backend",
    time: new Date().toISOString(),
  }),
);

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
app.use("/api/client", require("./routes/client.routes"));
app.use("/api/freelancer", require("./routes/freelancer.routes"));

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Lynk API: http://localhost:${port}`));
