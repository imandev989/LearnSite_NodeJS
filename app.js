const express = require("express");
const cors = require("cors");
const path = require("path");
const bodyParser = require("body-parser");
const authRouter = require("./routes/v1/authRoutes");
const userRouter = require("./routes/v1/userRoutes");
const categoriesRouter = require("./routes/v1/categoryRoutes");
const courseRouter = require("./routes/v1/courseRoutes");
const commentRouter = require("./routes/v1/commentRoutes");

const contactsRouter = require("./routes/v1/contactRoutes");
const newsletterRouter = require("./routes/v1/newsletterRoutes");
const searchRouter = require("./routes/v1/searchRoutes");
const notificationRouter = require("./routes/v1/notificationRoutes")
const offRouter = require("./routes/v1/offRoutes")
const articlesRouter = require("./routes/v1/articleRoutes");
const ordersRouter = require("./routes/v1/orderRoutes");
const ticketsRouter = require("./routes/v1/ticketRoutes");

const app = express();
app.use("courses/covers", express.static(path.join(__dirname, "public", "courses", "covers")));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.use("/v1/auth", authRouter)
app.use("/v1/users", userRouter)
app.use("/v1/category", categoriesRouter)
app.use("/v1/courses", courseRouter)
app.use("/v1/comments", commentRouter)
app.use("/v1/contacts", contactsRouter);
app.use("/v1/newsletter", newsletterRouter);
app.use("/v1/search", searchRouter);
app.use("/v1/notifications", notificationRouter);
app.use("/v1/offs", offRouter);
app.use("/v1/articles", articlesRouter);
app.use("/v1/orders", ordersRouter);
app.use("/v1/tickets", ticketsRouter);

module.exports = app;