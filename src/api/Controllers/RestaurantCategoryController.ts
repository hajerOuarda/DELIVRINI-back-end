import { Router, Response, Request } from "express";
import { message } from "../Constants/constants";
import { RestaurantCategory } from "../Models/restaurantCategory";
import {
  createRestaurantCategory,
  deleteRestaurantCategory,
  findAllRestaurantCategory,
  findOneRestaurantCategory,
  updateRestaurantCategory,
} from "../Services/RestaurantCategoryService";

const restaurantCategoryControllerRouter = Router();

restaurantCategoryControllerRouter.get(
  "/all",
  (req: Request, res: Response) => {
    findAllRestaurantCategory()
      .then((restaurantCategory: Array<RestaurantCategory>) => {
        res.send(restaurantCategory);
      })
      .catch((err: Error) => {
        res.json(err.message);
      });
  }
);
restaurantCategoryControllerRouter.get(
  "/:id",
  (req: Request, res: Response) => {
    const categoryId = req.params.id;

    findOneRestaurantCategory(categoryId)
      .then((category) => {
        if (category) {
          return res.status(200).json({ restaurant_found: category });
        } else
          return res
            .status(404)
            .json({ errors: message.restaurantCategory.error.not_found });
      })
      .catch((err: Error) => res.status(500).json(err.message));
  }
);

restaurantCategoryControllerRouter.post("/", (req: Request, res: Response) => {
  createRestaurantCategory(req.body)
    .then((category: any) => {
      res.send({
        message: message.restaurantCategory.success.created,
        restaurant: category,
      });
    })
    .catch((err: Error) => {
      res.status(500).json(err.message);
    });
});
restaurantCategoryControllerRouter.patch(
  "/:id",
  (req: Request, res: Response) => {
    updateRestaurantCategory(req.body, req.params.id)
      .then((nbr) => {
        if (nbr[0] != 0)
          res.status(200).send({
            message: message.restaurantCategory.success.updated,
          });
        else
          res.status(401).send({
            message: message.restaurantCategory.error.not_updated,
          });
      })
      .catch((err: Error) => {
        res.status(500).json(err.message);
      });
  }
);
restaurantCategoryControllerRouter.delete(
  "/:id",
  (req: Request, res: Response) => {
    const categoryId = req.params.id;
    deleteRestaurantCategory(categoryId)
       .then((nbr) => {
      if (nbr)
        res
          .status(200)
          .json({
            message: message.restaurantCategory.success.deleted,
            id: categoryId,
          });
      else
        res.status(404).json({
          message: message.restaurantCategory.error.not_deleted,
        });
    })
    .catch((err: Error) => res.json({ error: err.message }));
 
  }
);

export default restaurantCategoryControllerRouter;
