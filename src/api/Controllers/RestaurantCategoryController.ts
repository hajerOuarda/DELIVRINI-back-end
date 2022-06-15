import { Router, Response, Request } from "express";
import { message } from "../Constants/constants";
import { isAuthenticated } from "../middlewares/auth";
import { checkIsAdmin } from "../middlewares/rolesJwt";
import { paginate } from "../middlewares/validators";
import { RestaurantCategory } from "../Models/Association";
import {
  createRestaurantCategory,
  deleteRestaurantCategory,
  findAllRestaurantCategory,
  findOneRestaurantCategory,
  updateRestaurantCategory,
} from "../Services/RestaurantCategoryService";

const restaurantCategoryController = Router();

restaurantCategoryController.get(
  "/all",
  (req: Request, res: Response) => {
    const size: any = req.query.size; // number of records per page, pageSize
    const page: any = req.query.page; // page number
    const options = paginate(page, size);
    findAllRestaurantCategory(options)
      .then((restaurantCategory: Array<RestaurantCategory>) => {
        res.send(restaurantCategory);
      })
      .catch((err: Error) => {
        res.json(err.message);
      });
  }
);
restaurantCategoryController.get(
  "/:id",
  [isAuthenticated, checkIsAdmin],
  (req: Request, res: Response) => {
    const categoryId = req.params.id;
    findOneRestaurantCategory(categoryId)
      .then((category) => {
        if (category) {
          return res.status(200).json({ restaurantCategory_found: category });
        } else
          return res
            .status(404)
            .json({ errors: message.restaurantCategory.error.not_found });
      })
      .catch((err: Error) => res.status(500).json(err.message));
  }
);

restaurantCategoryController.post("/",
  [isAuthenticated, checkIsAdmin],(req: Request, res: Response) => {
  createRestaurantCategory(req.body)
    .then((category: any) => {
      res.send({
        message: message.restaurantCategory.success.created,
        restaurantCategory: category,
      });
    })
    .catch((err: Error) => {
      res.status(500).json(err.message);
    });
});
restaurantCategoryController.patch(
  "/:id",
  [isAuthenticated, checkIsAdmin],
  (req: Request, res: Response) => {
    updateRestaurantCategory(req.body, req.params.id)
      .then((nbr) => {
        if (nbr[0])
          findOneRestaurantCategory(req.params.id).then(
            (foundRes) => {
              res.status(200).send({
                message: message.restaurantCategory.success.updated,
                updatedCategoryRestaurant: foundRes
              });
            }
          ).catch()
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
restaurantCategoryController.delete(
  "/:id",
  [isAuthenticated, checkIsAdmin],
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

export default restaurantCategoryController;
