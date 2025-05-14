import express from "express";
const server = express();
import mongoose from "mongoose";
// import cors from "cors";
import dotenv from "dotenv";
import productsRouter from "./routes/Products.js";
import categoriesRouter from "./routes/Categories.js";
import brandsRouter from "./routes/Brands.js";
import usersRouter from "./routes/Users.js";
import authRouter from "./routes/Auth.js";
import cartRouter from "./routes/Cart.js";
import ordersRouter from "./routes/Order.js";
// import path from 'path'

//middlewares
dotenv.config();

// server.use(
//   cors({
//     exposedHeaders: ["X-Total-Count"],
//   })
// );
server.use(express.static(path.resolve("build")));
server.use(express.json()); // to parse req.body
server.use("/products", productsRouter);
server.use("/categories", categoriesRouter);
server.use("/brands", brandsRouter);
server.use("/users", usersRouter);
server.use("/auth", authRouter);
server.use("/cart", cartRouter);
server.use("/orders", ordersRouter);

async function main() {
  await mongoose.connect(process.env.MONGO_URL);
  console.log("database connected");
}
main().catch((err) => console.log(err));

server.listen(process.env.PORT, () => {
  console.log("server started");
});
