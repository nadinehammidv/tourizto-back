const express = require("express");
const mongoose = require("mongoose");
var cors = require("cors");
const app = express();
require("dotenv").config();
const path = require("path");

//ENVIROMMENT VARIABLES
const DB = process.env.DB;

// CONNECT TO DATABASE
mongoose
  .connect(
    `mongodb+srv://NADINE:${DB}@cluster0.vnp3sor.mongodb.net/guide-app?retryWrites=true&w=majority`
  )
  .then(() => console.log("CONNECTED TO DATABASE"))
  .catch((err) => console.log(err));
// MIDDELWEARES
app.use(express.json());
app.use(
  cors({
    origin: ["https://kampina.netlify.app/", "http://localhost:3000/"],
  })
);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
//ROUTES
app.use("/guide/api/user", require("./routes/user"));
app.use("/guide/api/admin", require("./routes/admin"));

app.listen(5000, (err) => {
  if (err) throw err;
  console.log("SEVER IS UP AND RUNNING");
});
