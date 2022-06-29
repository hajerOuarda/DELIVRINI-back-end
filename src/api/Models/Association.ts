import { Element } from "./Element";
import { Extras } from "./Extras";
import { Ingredients } from "./Ingredients";
import { Meal } from "./Meal";
import { MealCategory } from "./MealCategory";
import { Restaurant } from "./Restaurant";
import { RestaurantCategory } from "./RestaurantCategory";

/** restaurant & RestaurantCategory */
Restaurant.belongsTo(RestaurantCategory, {
  foreignKey: "fk_Rcategory",
  onDelete: "CASCADE",
  targetKey: "name",
});
MealCategory.belongsTo(Restaurant, {
  foreignKey: "fk_restaurant",
  onDelete: "CASCADE",
  targetKey: "name",
});
/**  Elemnt & MealCategory */
Element.belongsTo(MealCategory, {
  foreignKey: "fk_Mealcategory",
  onDelete: "CASCADE",
  targetKey: "name",
});
/**  Element & Restaurant */
Element.belongsTo(Restaurant, {
  foreignKey: "fk_restaurant",
  onDelete: "CASCADE",
  targetKey: "name",
});


Extras.belongsTo(Element, {
  foreignKey: "fk_element",
  onDelete: "CASCADE",
  targetKey: "name",
});
// element and ingredient
// Element.hasMany(Ingredients, {
//   foreignKey: "fk_element",
//   onDelete: "CASCADE",
// });
Ingredients.belongsTo(Element, {
  foreignKey: "fk_element",
  onDelete: "CASCADE",
  targetKey: "name",
});

Extras.belongsTo(Element, {
  foreignKey: "fk_element",
  onDelete: "CASCADE",
  targetKey: "name",
});

export { Element, Meal, Restaurant, MealCategory, RestaurantCategory, Ingredients, Extras };
