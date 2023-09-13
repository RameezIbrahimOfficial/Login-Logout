const express = require("express");
const app = express();
const session = require("express-session");
const { v4: uuidv4 } = require("uuid");
const router = require("./routes/router");

const PORT = 9000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");

app.use("/static", express.static("./public"));
app.use(
  session({
    secret: uuidv4(),
    resave: false,
    saveUninitialise: false,
  })
);
app.use("/", router);

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
