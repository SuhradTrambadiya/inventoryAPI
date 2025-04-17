import mongoose from "mongoose";

const InventorySchema = new mongoose.Schema(
  {
    productName: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    totalAmount: { type: Number, required: true },
    expiryDate: { type: Date, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Reference to User
  },
  { timestamps: true } // Adds createdAt and updatedAt fields
);

export default mongoose.model("Inventory", InventorySchema);
