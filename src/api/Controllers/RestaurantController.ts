import { Request, Response, Router } from "express";
import { message } from "../Constants/constants";
import { isAuthenticated } from "../middlewares/auth";
import { checkIsAdmin } from "../middlewares/rolesJwt";
import { paginate, requireBodyFields } from "../middlewares/validators";
import { Restaurant } from "../Models/Association";
import {
  createRestaurant,
  deleteRestaurant,
  findAllRestaurants,
  findOneRestaurant,
  updateRestaurant,
} from "../Services/RestaurantService";

const restaurantController = Router();

restaurantController.get("/all", (req: Request, res: Response) => {
  const size: any = req.query.size; // number of records per page, pageSize
  const page: any = req.query.page; // page number
  const options = paginate(page, size);
  findAllRestaurants(options)
    .then((restaurants: Array<Restaurant>) => {
      res.status(200).send(restaurants);
    })
    .catch((err: Error) => {
      res.status(404).json(err.message);
    });
});
restaurantController.get("/:id", [isAuthenticated, checkIsAdmin], (req: Request, res: Response) => {
  const restoId = req.params.id;

  findOneRestaurant(restoId)
    .then((resto) => {
      if (resto) {
        return res.status(200).json({ restaurant_found: resto });
      } else
        return res
          .status(404)
          .json({ errors: message.restaurant.error.not_found });
    })
    .catch((err: Error) => res.status(404).json(err.message));
});

restaurantController.post("/", [isAuthenticated, checkIsAdmin,requireBodyFields(["email", "phone", "name"])], (req: Request, res: Response) => {
  const restaurantField = req.body;
  createRestaurant(restaurantField)
    .then((resto) => {
      res.status(200).send({
        message: message.restaurant.success.created,
        restaurant: resto,
      });
    })
    .catch((err: Error) => {
      res.status(404).json({
        message: message.restaurant.error.not_created,
        error: err.message,
      });
    });

});
restaurantController.patch("/:id", [isAuthenticated, checkIsAdmin,requireBodyFields(["email", "phone", "name"])], (req: Request, res: Response) => {
  updateRestaurant(req.body, req.params.id)
    .then((nbr) => {
      if (nbr[0])
        findOneRestaurant(req.params.id).then((foundRes) => {
          res.status(200).send({
            message: message.restaurant.success.updated,
            updatedRestaurant: foundRes
          });
        }).catch()

      else
        res.status(404).send({
          message: message.restaurant.error.not_updated,
        });
    })
    .catch((err: Error) => {
      res.status(404).json(err.message);
    });
});
restaurantController.delete("/:id", [isAuthenticated, checkIsAdmin], (req: Request, res: Response) => {
  const restoId = req.params.id;
  deleteRestaurant(restoId)
    .then((nbr) => {
      if (nbr)
        res
          .status(200)
          .json({ message: message.restaurant.success.deleted, id: restoId });
      else
        res.status(404).json({
          message: message.restaurant.error.not_deleted,
        });
    })
    .catch((err: Error) => res.json({ error: err.message }));
});

export default restaurantController;
