import mongoose, { Schema, Document } from "mongoose";

interface UserOrderType extends Document {
  userName: string;
  name: string;
  quantity: number;
  price: number;
  createdAt: Date;
}

const UserOrderSchema: Schema = new Schema({
  userName: {
    type: "string",
    required: true,
    index: true,
  },
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

const UserOrder = mongoose.model<UserOrderType>("UserOrder", UserOrderSchema);

export default UserOrder;
