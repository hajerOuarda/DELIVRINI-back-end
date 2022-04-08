import { DestroyOptions } from "sequelize";
import { UpdateOptions } from "sequelize";
import { MealCategory } from "../Models/Association";

function findAllMealCategory(options:any): Promise<MealCategory[]> {
  return MealCategory.findAll<MealCategory>({
    limit: parseInt(options.limit),
    offset: options.offset,
  });
}

function findOneMealCategory(
  mealCategoryId: string
): Promise<MealCategory | null> {
  return MealCategory.findByPk<MealCategory>(mealCategoryId);
}

function createMealCategory(mealCategory: any) {
  const params = mealCategory;
  return MealCategory.create<MealCategory>(params);
}

function updateMealCategory(mealCategory: MealCategory, id?: string) {
  const mealCategoryId = id;
  const params = mealCategory;

  const options: UpdateOptions = {
    where: { id: mealCategoryId },
    limit: 1,
  };

  return MealCategory.update(params, options);
}

function deleteMealCategory(mealCategory: string) {
  const options: DestroyOptions = {
    where: { id: mealCategory },
    limit: 1,
  };

  return MealCategory.destroy(options);
}

export {
  findAllMealCategory,
  findOneMealCategory,
  createMealCategory,
  updateMealCategory,
  deleteMealCategory,
};
