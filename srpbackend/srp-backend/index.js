const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const projectRoutes = require("./routes/projectRoutes");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/srpdb", {
 
}).then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

app.use("/api/projects", projectRoutes);

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
 