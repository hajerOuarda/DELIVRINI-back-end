/** CRUD  */

import { DestroyOptions } from "sequelize";
import { UpdateOptions } from "sequelize";
import { Restaurant } from "../Models/Association";

function findAllRestaurants(options: any): Promise<Restaurant[]> {
  return Restaurant.findAll<Restaurant>({
    limit: parseInt(options.limit),
    offset: options.offset,
  });
}

function findOneRestaurant(restoId: string): Promise<Restaurant | null> {
  return Restaurant.findByPk<Restaurant>(restoId);
}

function createRestaurant(restaurant: any) {
  // const { name, address, phone, zipCode, street, email, category } = restaurant;
  const params = restaurant;
  return Restaurant.create<Restaurant>({
    ...restaurant,
    fk_Rcategory: params.category
  })
}

function updateRestaurant(restaurant: Restaurant, id?: string) {
  const restoId = id;
  const params = restaurant;

  const options: UpdateOptions = {
    where: { id: restoId },
    limit: 1,
  };

  return Restaurant.update(params, options);
}

function deleteRestaurant(restoId: string) {
  const options: DestroyOptions = {
    where: { id: restoId },
    limit: 1,
  };

  return Restaurant.destroy(options);
}

export {
  findAllRestaurants,
  findOneRestaurant,
  createRestaurant,
  updateRestaurant,
  deleteRestaurant,
};
