import { Router } from "express";
import {
  storeGrocery,
  fetchGrocery,
  removeGrocery,
  updateGrocery,
  orderGrocery,
  viewGrocery,
} from "../controllers/groceryController";
const route = Router();

route.post("/grocery/store-grocery", storeGrocery);

route.get("/grocery/fetch-grocery", fetchGrocery);

route.delete("/grocery/delete-grocery/:id", removeGrocery);

route.put("/grocery/update-grocery/:id", updateGrocery);

route.get("/grocery/view-grocery", viewGrocery);

route.post("/grocery/order-grocery/:ids/:userName", orderGrocery);

export { route };
