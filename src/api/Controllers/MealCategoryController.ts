import { Router, Response, Request } from "express";
import { message } from "../Constants/constants";
import { isAuthenticated } from "../middlewares/auth";
import { checkIsChef } from "../middlewares/rolesJwt";
import { paginate } from "../middlewares/validators";
import { MealCategory } from "../Models/Association";
import {
  createMealCategory,
  deleteMealCategory,
  findAllMealCategory,
  findOneMealCategory,
  updateMealCategory,
} from "../Services/MealCategoryService";

const mealCategoryController = Router();

mealCategoryController.get("/all", (req: Request, res: Response) => {
  const size: any = req.query.size; // number of records per page, pageSize
  const page: any = req.query.page; // page number
  const restaurant: any = req.query.restaurant;
  const options = paginate(page, size);
  findAllMealCategory(options, restaurant)
    .then((mealCategories: Array<MealCategory>) => {
      res.send(mealCategories);
    })
    .catch((err: Error) => {
      res.json(err.message);
    });
});
mealCategoryController.get("/:id", [isAuthenticated, checkIsChef], (req: Request, res: Response) => {
  const mealCategoryId = req.params.id;

  findOneMealCategory(mealCategoryId)
    .then((mealCategory) => {
      if (mealCategory) {
        return res.status(200).json({ mealCategory_found: mealCategory });
      } else
        return res
          .status(404)
          .json({ errors: message.mealCategory.error.not_found });
    })
    .catch((err: Error) => res.status(404).json(err.message));
});

mealCategoryController.post("/", [isAuthenticated, checkIsChef], (req: Request, res: Response) => {
  createMealCategory(req.body)
    .then((mealCategory: any) => {
      res.status(200).send({
        message: message.mealCategory.success.created,
        mealCategory: mealCategory,
      });
    })
    .catch((err: Error) => {
      res.status(404).json(err.message);
    });
});
mealCategoryController.patch("/:id", [isAuthenticated, checkIsChef], (req: Request, res: Response) => {
  updateMealCategory(req.body, req.params.id)
    .then((nbr) => {
      if (nbr[0] != 0)
        findOneMealCategory(req.params.id).then(
          (foundMealCategory) => {
            res.status(200).send({
              message: message.mealCategory.success.updated,
              updatedMealCategory: foundMealCategory
            })
          }).catch((err: Error) => {
            res.status(404).json(message.mealCategory.error.not_found);
          })
      else
        res.status(401).send({
          message: message.mealCategory.error.not_updated,
        });
    })
    .catch((err: Error) => {
      res.json(err.message);
    });
});
mealCategoryController.delete("/:id", [isAuthenticated, checkIsChef], (req: Request, res: Response) => {
  const mealCategoryId = req.params.id;
  deleteMealCategory(mealCategoryId)
    .then((nbr) => {
      if (nbr)
        res.status(200).json({
          message: message.mealCategory.success.deleted,
          id: mealCategoryId,
        });
      else
        res.status(404).json({
          message: message.mealCategory.error.not_deleted,
        });
    })
    .catch((err: Error) => res.json({ error: err.message }));
}
);

export default mealCategoryController;
