import { DestroyOptions, UpdateOptions } from "sequelize";
import { Meal } from "../Models/Association";

async function findAllMeal(options:any): Promise<Meal[]> {
  return await Meal.findAll<Meal>({
    limit: parseInt(options.limit),
    offset: options.offset,
  });
}

async function findOneMeal(mealId: string): Promise<Meal | null> {
  return await Meal.findByPk<Meal>(mealId);
}

async function createMeal(meal: any) {
  const params = meal;
  return await Meal.create<Meal>(params);
}

async function updateMeal(meal: Meal, id?: string) {
  const mealId = id;
  const params = meal;

  const options: UpdateOptions = {
    where: { id: mealId },
    limit: 1,
  };

  return await Meal.update(params, options);
}

async function deleteMeal(meal: string) {
  const options: DestroyOptions = {
    where: { id: meal },
    limit: 1,
  };

  return await Meal.destroy(options);
}

export { findAllMeal, findOneMeal, createMeal, updateMeal, deleteMeal };
