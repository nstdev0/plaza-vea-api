import Express from "express";

export const app = Express();

app.use(Express.json());

app.get("/api/products", (req, res) => {
  res.send("List of products");
});
