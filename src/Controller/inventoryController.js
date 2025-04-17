import Inventory from "../Database/Schema/Inventory.Schema.js";

// Create an inventory item
export const createInventory = async (req, res) => {
  const { productName, price, quantity, totalAmount, expiryDate } = req.body;

  try {
    // Create new inventory item
    const newInventory = new Inventory({
      productName,
      price,
      quantity,
      totalAmount,
      expiryDate,
      userId: req.user.userId, // User ID from the decoded token
    });

    // Save inventory to database
    const savedInventory = await newInventory.save();

    res.status(201).json({
      message: "Inventory item created successfully",
      inventory: savedInventory,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server error" });
  }
};

// Get all inventory items for the logged-in user
export const getInventory = async (req, res) => {
  try {
    // Find inventory items by userId (only the logged-in user's inventory)
    const inventoryItems = await Inventory.find({ userId: req.user.userId });

    if (!inventoryItems.length) {
      return res.status(404).json({ message: "No inventory items found" });
    }

    res.json({ inventory: inventoryItems });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server error" });
  }
};

// Get a single inventory item by ID
export const getInventoryById = async (req, res) => {
  const { id } = req.params;

  try {
    const inventory = await Inventory.findById(id).populate(
      "userId",
      "fullName email"
    ); // Populating user details

    if (!inventory) {
      return res.status(404).json({ message: "Inventory item not found" });
    }

    res.json(inventory);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get inventory items by product name

export const searchInventoryByProductName = async (req, res) => {
  const { productName } = req.query;

  try {
    if (!productName) {
      return res.status(400).json({ message: "Product name is required" });
    }

    const inventoryItems = await Inventory.find({
      productName: { $regex: productName, $options: "i" }, // Case-insensitive and partial match
    }).populate("userId", "fullName email");

    if (inventoryItems.length === 0) {
      return res
        .status(404)
        .json({ message: "No matching inventory items found" });
    }

    res.json(inventoryItems);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// update an inventory item
export const updateInventory = async (req, res) => {
  const { id } = req.params;
  const { productName, price, quantity, totalAmount, expiryDate } = req.body;

  try {
    const inventory = await Inventory.findById(id);

    if (!inventory) {
      return res.status(404).json({ message: "Inventory item not found" });
    }

    // Update inventory fields
    inventory.productName = productName || inventory.productName;
    inventory.price = price || inventory.price;
    inventory.quantity = quantity || inventory.quantity;
    inventory.totalAmount = totalAmount || inventory.totalAmount;
    inventory.expiryDate = expiryDate || inventory.expiryDate;

    // Save the updated inventory
    const updatedInventory = await inventory.save();

    res.json({
      message: "Inventory updated successfully",
      inventory: updatedInventory,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete an inventory item
export const deleteInventory = async (req, res) => {
  const { id } = req.params;

  try {
    const inventory = await Inventory.findById(id);

    if (!inventory) {
      return res.status(404).json({ message: "Inventory item not found" });
    }

    await inventory.remove(); // Remove the inventory item

    res.json({ message: "Inventory item deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
