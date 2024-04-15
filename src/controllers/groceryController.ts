import { NextFunction, Request, Response } from "express";
import { GroceryType } from "../types/groceryType";
import UserOrder from "../models/userOrderModal";
import GroceryItem from "../models/groceryModal";

//   - Add new grocery items to the system
const storeGrocery = async (req: Request, res: Response) => {
  try {
    const { name, quantity, price }: GroceryType = req.body;

    const newItem = new GroceryItem({ name, quantity, price });
    await newItem.save();

    res.status(201).json(newItem);
  } catch (err) {
    console.error("Error adding grocery item:", err);
    res.status(500).json({ error: "Error adding grocery item" });
  }
};

//   - View existing grocery items
const fetchGrocery = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = await GroceryItem.find().sort({ name: 1 });

    if (data.length === 0) {
      res.status(404).json({
        message: "Do data present in database",
        status: 404,
      });
    } else {
      res.status(200).json({
        message: "success",
        status: 200,
        data,
      });
      next();
    }
  } catch (err) {
    console.log(err.message);
  }
};

//Remove grocery items from the system

const removeGrocery = async (req: Request, res: Response) => {
  try {
    const id: number = req.params.id as unknown as number;
    let result = await GroceryItem.deleteOne({ _id: id });

    if (!result) {
      return res.status(404).json({
        message: "No such record found.",
        status: 404,
      });
    } else {
      return res.status(200).json({
        message: "record deleted successfully",
        status: 200,
      });
    }
  } catch (err) {
    console.log(err.message);
  }
};

//   - Update details (e.g., name, price) of existing grocery items

const updateGrocery = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const updatedData = req.body;
    const result = await GroceryItem.findByIdAndUpdate(
      { _id: id },
      { $set: updatedData }
    );
    if (!result) {
      return res.status(404).json({
        message: "No such record found.",
        status: 404,
      });
    } else {
      return res.status(200).json({
        message: "record updated successfully",
        status: 200,
      });
    }
  } catch (err) {
    console.log(err.message);
  }
};

//- View the list of available grocery items

const viewGrocery = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = await GroceryItem.find({ quantity: { $gt: 0 } }).sort({
      name: 1,
    });

    if (data.length === 0) {
      res.status(404).json({
        message: "Do data present in database",
        status: 404,
      });
    } else {
      res.status(200).json({
        message: "success",
        status: 200,
        data,
      });
      next();
    }
  } catch (err) {
    console.log(err.message);
  }
};

// - Ability to book multiple grocery items in a single order

const orderGrocery = async (req: Request, res: Response) => {
  try {
    const ids = req.params.ids;
    const userName: string = req.params.userName;
    const splitId = ids.split(",");

    const result = await GroceryItem.find({
      $and: [{ _id: { $in: [...splitId] } }, { quantity: { $gt: 0 } }],
    });
    console.log(result);

    if (!result) {
      res.status(404).json({
        message: "No such record found.",
        status: 404,
      });
    } else {
      const updatedData = result.map(({ name, quantity, price }) => {
        return { userName: userName, name, quantity, price };
      });

      const data = await UserOrder.insertMany(updatedData);
      await GroceryItem.updateMany(
        { _id: { $in: [...new Set(splitId)] } },
        { $inc: { quantity: -1 } }
      );
      res.status(201).json({
        data: data,
      });
    }
  } catch (err) {
    console.log(err.message);
  }
};

export {
  storeGrocery,
  orderGrocery,
  fetchGrocery,
  removeGrocery,
  updateGrocery,
  viewGrocery,
};
