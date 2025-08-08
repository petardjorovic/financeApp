import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.status(200).json({
    message: "healty",
  });
});

app.listen(3000, () => {
  console.log("listening on port 3000");
});
