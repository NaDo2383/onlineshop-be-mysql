const port = 8000;
const bodyParser = require("body-parser");

const express = require("express");
const cors = require("cors");
const app = express();

const menuRouter = require("./routes/menu.route.js");
const catRouter = require("./routes/category.route.js");
const userRouter = require("./routes/user.route.js");
const productRouter = require("./routes/products.route.js");

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use("/api", menuRouter);
app.use("/api", catRouter);
app.use("/api", userRouter);
app.use("/api", productRouter);

app.get("/api", (req, res) => {
  res.json({ message: "welcome Rest API" });
});

app.listen(port, () => console.log("server is running " + port));
