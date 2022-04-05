import { Element } from "./Element";
import { Meal } from "./Meal";
import { MealCategory } from "./MealCategory";
import { Restaurant } from "./Restaurant";
import { RestaurantCategory } from "./RestaurantCategory";

/** restaurant & RestaurantCategory */
Restaurant.belongsTo(RestaurantCategory, {
  foreignKey: "fk_Rcategory",
  onDelete: "SET NULL",
  targetKey: "name",
});

/**  Meal & MealCategory */
Meal.belongsTo(MealCategory, {
  foreignKey: "fk_Mcategory",
  onDelete: "SET NULL",
  targetKey: "name",
});
/**  Meal & Restaurant */
Meal.belongsTo(Restaurant, {
  foreignKey: "fk_restaurant",
  onDelete: "SET NULL",
  targetKey: "name",
});

/**  Meal & Element */
Element.belongsToMany(Meal, {
  through: "Elements_Meals",
  foreignKey: "Element",
  targetKey: "name",
});

Meal.belongsToMany(Element, {
  through: "Elements_Meals",
  foreignKey: "Meal",
  targetKey: "name",
});

export { Element, Meal, Restaurant, MealCategory, RestaurantCategory };
