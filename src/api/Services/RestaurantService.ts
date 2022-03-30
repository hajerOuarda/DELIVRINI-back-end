/** CRUD  */

import { DestroyOptions } from "sequelize";
import { UpdateOptions } from "sequelize";
import { Restaurant } from "../Models/restaurant";

function findAllRestaurants(): Promise<Restaurant[]> {
  return Restaurant.findAll<Restaurant>();
}

function findOneRestaurant(userId: string): Promise<Restaurant | null> {
  return Restaurant.findByPk<Restaurant>(userId);
}

  function createRestaurant(restaurant: any) {
  const params = restaurant;
  return Restaurant.create<Restaurant>(params);
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

  function deleteRestaurant(userId: string) {
  const options: DestroyOptions = {
    where: { id: userId },
    limit: 1,
  };

  return Restaurant.destroy(options);
}

export {findAllRestaurants,findOneRestaurant,createRestaurant,updateRestaurant,deleteRestaurant}