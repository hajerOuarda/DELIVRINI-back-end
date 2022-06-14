import { Request, Response, Router } from "express";
import { message } from "../Constants/constants";
import { paginate } from "../middlewares/validators";
import { Meal } from "../Models/Association";
import { createMeal, deleteMeal, findAllMeal, findOneMeal, updateMeal } from "../Services/MealService";

const mealController = Router();
mealController.get("/all", (req: Request, res: Response) => {
  const size: any = req.query.size; // number of records per page, pageSize
  const page: any = req.query.page; // page number
  const options = paginate(page, size);
  findAllMeal(options)
    .then((meal: Array<Meal>) => {
      res.send(meal);
    })
    .catch((err: Error) => {
      res.json(err.message);
    });
});

mealController.get("/:id", (req: Request, res: Response) => {
  const mealId = req.params.id;

  findOneMeal(mealId)
    .then((meal) => {
      if (meal) {
        return res.status(200).json({ meal_found: meal });
      } else
        return res
          .status(404)
          .json({ errors: message.meal.error.not_found });
    })
    .catch((err: Error) => res.status(500).json(err.message));
});

mealController.post("/", (req: Request, res: Response) => {
  createMeal(req.body)
    .then((meal) => {
      res.send({
        message: message.meal.success.created,
        meal: meal,
      });
    })
    .catch((err: Error) => {
      res.json({
        message: message.meal.error.not_created,
        error: err.message,
      });
    });
});
mealController.patch("/:id", (req: Request, res: Response) => {
  updateMeal(req.body, req.params.id)
    .then((nbr) => {
      if (nbr[0])
        findOneMeal(req.params.id).then(
          (foundMeal) => {
            res.status(200).send({
              message: message.meal.success.updated,
              updatedMeal: foundMeal
            });
          }).catch()
      else
        res.status(401).send({
          message: message.meal.error.not_updated,
        });
    })
    .catch((err: Error) => {
      res.status(500).json(err.message);
    });
});
mealController.delete("/:id", (req: Request, res: Response) => {
  const mealId = req.params.id;
  deleteMeal(mealId)
    .then((nbr) => {
      if (nbr)
        res
          .status(200)
          .json({ message: message.meal.success.deleted, id: mealId });
      else
        res.status(404).json({
          message: message.meal.error.not_deleted,
        });
    })
    .catch((err: Error) => res.json({ error: err.message }));
});


export default mealController;
