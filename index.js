const express = require("express");
const connection = require("./Config/db");
const cors = require("cors");

const authrouter = require("./Routes/user.routes");
const auth = require("./Middleware/auth");

const app = express();

app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to home page");
});


app.use("/user", authrouter)

app.use(auth)




app.listen(3030, async () => {
  try {
    await connection;
    console.log("connected Successfully");
  } catch (err) {
    console.log("Error in connection");
  }
  console.log("Running on port 3030");
});
