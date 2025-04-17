import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./src/Database/dbConnection.js";
import UserRoutes from "./src/Router/User.Routes.js";
import InventoryRoutes from "./src/Router/Inventory.Routes.js";

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Inventory API is running...");
});

app.use("/api/users", UserRoutes);
app.use("/api/inventory", InventoryRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
