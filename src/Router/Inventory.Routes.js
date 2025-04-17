/**
 * Inventory Routes
 * 
 * This module defines the routes for managing inventory. All routes are protected
 * and require authentication via the `verifyToken` middleware.
 * 
 * Routes:
 * - POST /: Create a new inventory item.
 * - GET /: Retrieve all inventory items.
 * - PUT /:id: Update an inventory item by its ID.
 * - GET /:id: Retrieve an inventory item by its ID.
 * - DELETE /:id: Delete an inventory item by its ID.
 * - GET /search: Search inventory items by product name.
 * 
 * Middleware:
 * - `verifyToken`: Ensures that the user is authenticated before accessing the routes.
 * 
 * Controllers:
 * - `createInventory`: Handles the creation of a new inventory item.
 * - `getInventory`: Retrieves all inventory items.
 * - `updateInventory`: Updates an existing inventory item by its ID.
 * - `getInventoryById`: Retrieves a specific inventory item by its ID.
 * - `deleteInventory`: Deletes an inventory item by its ID.
 * - `searchInventoryByProductName`: Searches inventory items by product name.
 */
import express from "express";
import {
  createInventory,
  deleteInventory,
  getInventory,
  getInventoryById,
  searchInventoryByProductName,
  updateInventory,
} from "../Controller/inventoryController.js";
import verifyToken from "../Middleware/verifyToken.js";

const InventoryRoutes = express.Router();

// Create Inventory - Protected Route (only accessible by authenticated users)
InventoryRoutes.post("/", verifyToken, createInventory);

// Get all Inventory - Protected Route (only accessible by authenticated users)
InventoryRoutes.get("/", verifyToken, getInventory);

// Update Inventory - Protected Route (only accessible by authenticated users)
InventoryRoutes.put("/:id", verifyToken, updateInventory);

// Get Inventory by ID - Protected Route (only accessible by authenticated users)
InventoryRoutes.get("/:id", verifyToken, getInventoryById);

// Delete Inventory - Protected Route (only accessible by authenticated users)
InventoryRoutes.delete("/:id", verifyToken, deleteInventory);

InventoryRoutes.get("/search", verifyToken, searchInventoryByProductName);

export default InventoryRoutes;
