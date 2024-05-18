const express = require("express");

const app = express();
app.use(express.json());
const bookRoute = require("./route/book");
const userRoute = require("./route/user");
// const profileRoutes = require("./routes/Profile");
// const CourseRoutes = require("./routes/Course");

const database = require("./config/database");

const dotenv = require("dotenv");
dotenv.config();

const PORT = process.env.PORT || 5000;
database.connect();

app.use("/book", bookRoute);

app.use("/user", userRoute);

// app.use("/api/v1/profile", profileRoutes);

// app.use("/api/v1/course", CourseRoutes);

// app.use("/api/v1/contact", require("./routes/ContactUs"));

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to the API",
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
