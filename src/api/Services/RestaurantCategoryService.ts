import { DestroyOptions } from "sequelize";
import { UpdateOptions } from "sequelize";
import { RestaurantCategory } from "../Models/restaurantCategory";

function findAllRestaurantCategory(): Promise<RestaurantCategory[]> {
  return RestaurantCategory.findAll<RestaurantCategory>();
}

function findOneRestaurantCategory(
  userId: string
): Promise<RestaurantCategory | null> {
  return RestaurantCategory.findByPk<RestaurantCategory>(userId);
}

async function createRestaurantCategory(restaurant: any) {
  const params = restaurant;
  return RestaurantCategory.create<RestaurantCategory>(params);
}

async function updateRestaurantCategory(
  restaurant: RestaurantCategory,
  id?: string
) {
  const restoId = id;
  const params = restaurant;

  const options: UpdateOptions = {
    where: { id: restoId },
    limit: 1,
  };

  return RestaurantCategory.update(params, options);
}

async function deleteRestaurantCategory(userId: string) {
  const options: DestroyOptions = {
    where: { id: userId },
    limit: 1,
  };

  return RestaurantCategory.destroy(options);
}

export {
  findAllRestaurantCategory,
  findOneRestaurantCategory,
  createRestaurantCategory,
  updateRestaurantCategory,
  deleteRestaurantCategory,
};
