import { DestroyOptions } from "sequelize";
import { UpdateOptions } from "sequelize";
import { RestaurantCategory } from "../Models/Association";

async function findAllRestaurantCategory(options:any): Promise<RestaurantCategory[]> {
  return await RestaurantCategory.findAll<RestaurantCategory>({
    limit: parseInt(options.limit),
    offset: options.offset,
  });
}

async function findOneRestaurantCategory(
  restoCategoryId: string
): Promise<RestaurantCategory | null> {
  return await RestaurantCategory.findByPk<RestaurantCategory>(restoCategoryId);
}

async function createRestaurantCategory(restaurantCategory: any) {
  const params = restaurantCategory;
  return await RestaurantCategory.create<RestaurantCategory>(params);
}

async function updateRestaurantCategory(
  restaurantCategory: RestaurantCategory,
  id?: string
) {
  const restoId = id;
  const params = restaurantCategory;

  const options: UpdateOptions = {
    where: { id: restoId },
    limit: 1,
  };

  return await  RestaurantCategory.update(params, options);
}

async function deleteRestaurantCategory(restoCategoryId: string) {
  const options: DestroyOptions = {
    where: { id: restoCategoryId },
    limit: 1,
  };

  return await RestaurantCategory.destroy(options);
}

export {
  findAllRestaurantCategory,
  findOneRestaurantCategory,
  createRestaurantCategory,
  updateRestaurantCategory,
  deleteRestaurantCategory,
};
