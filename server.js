const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv");

const app = express();

/* Bodyparser Middleware */
app.use(express.json());

/* Load env */
dotenv.config({ path: "./config.env" });

//* Log rout actions
if (process.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}


/* Use Routes */
app.use("/api/course", require("./routes/courses"));
app.use("/api/class", require("./routes/classes"));
app.use("/api/student", require("./routes/students"));

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));

