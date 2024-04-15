import mongoose, { Document, Schema } from "mongoose";

// Define interface for grocery item document
interface IGroceryItem extends Document {
  name: string;
  quantity: number;
  price: number;
  createdAt: Date;
}

// Define schema for grocery item
const groceryItemSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
    index: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create model from schema
const GroceryItem = mongoose.model<IGroceryItem>(
  "GroceryItem",
  groceryItemSchema
);

export default GroceryItem;
