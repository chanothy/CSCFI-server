const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const { authRouter } = require("./routes/authRouter.js");

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

dotenv.config();

app.use("/api/auth", authRouter);

const PORT = process.env.PORT;
const server = app.listen(PORT, () => {
  console.log(`<Server is running on port ${PORT}>`);
  console.log("-- SERVER START --")
});

