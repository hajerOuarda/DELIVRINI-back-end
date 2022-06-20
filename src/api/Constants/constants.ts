import dotenv from "dotenv";

dotenv.config();

export const PORT = process.env.PORT || 4000;

export const message = {
  user: {
    success: {
      found: "user found ",
      updated: "** user succesfully updated ** ",
      created: "** user succesfully created **",
      deleted: "** user succesfully deleted , with id :",
    },
    error: {
      not_found: "User not found :( ",
      not_updated: "** no user found to  update **",
      not_created: " user is not created",
      not_deleted: "User doesn't exist to be deleted",
    },
  },
  restaurant: {
    success: {
      found: "restaurant found ",
      updated: "** restaurant succesfully updated ** ",
      created: "** restaurant succesfully created **",
      deleted: "** restaurant succesfully deleted , with id :",
    },
    error: {
      not_found: "restaurant not found :( ",
      not_updated: "** no restaurant found to  update **",
      not_created: " restaurant cannot be created",
      not_deleted: "restaurant doesn't exist to be deleted",
    },
  },
  restaurantCategory: {
    success: {
      found: "restaurantCategory found ",
      updated: "** restaurantCategory succesfully updated ** ",
      created: "** restaurantCategory succesfully created **",
      deleted: "** restaurantCategory succesfully deleted , with id :",
    },
    error: {
      not_found: "restaurantCategory not found :( ",
      not_updated: "** no restaurantCategory found to  update **",
      not_created: " restaurantCategory is not created",
      not_deleted: "restaurantCategory doesn't exist to be deleted",
    },
  },
  role: {
    admin: {
      access_not_granted: "you're not Admin , this Require Admin Role!",
    },
    client: {
      access_not_granted: "you're not Client , this Require Client Role!",
    },
    chef: {
      access_not_granted: "you're not a Chef , this Requires Chef Role!",
    },
    deliveryMan: {
      access_not_granted:
        "you're not a Delivery Man , this Require Delivery Man Role!",
    },
  },
  mealCategory: {
    success: {
      found: "mealCategory found ",
      updated: "** mealCategory succesfully updated ** ",
      created: "** mealCategory succesfully created **",
      deleted: "** mealCategory succesfully deleted , with id :",
    },
    error: {
      not_found: "mealCategory not found :( ",
      not_updated: "** no mealCategory found to  update **",
      not_created: " mealCategory is not created",
      not_deleted: "mealCategory doesn't exist to be deleted",
    },
  },
  meal: {
    success: {
      found: "meal found ",
      updated: "** meal succesfully updated ** ",
      created: "** meal succesfully created **",
      deleted: "** meal succesfully deleted , with id :",
    },
    error: {
      not_found: "meal not found :( ",
      not_updated: "** no meal found to  update **",
      not_created: " meal is not created",
      not_deleted: "meal doesn't exist to be deleted",
    },
  },
  element: {
    success: {
      found: "element found ",
      updated: "** element succesfully updated ** ",
      created: "** element succesfully created **",
      deleted: "** element succesfully deleted , with id :",
    },
    error: {
      not_found: "element not found :( ",
      not_updated: "** no element found to  update **",
      not_created: " element is not created",
      not_deleted: "element doesn't exist to be deleted",
    },
  },
  ingredients: {
    success: {
      found: "ingredients found ",
      updated: "** ingredients succesfully updated ** ",
      created: "** ingredients succesfully created **",
      deleted: "** ingredients succesfully deleted , with id :",
    },
    error: {
      not_found: "ingredients not found :( ",
      not_updated: "** no ingredients found to  update **",
      not_created: " ingredients is not created",
      not_deleted: "ingredients doesn't exist to be deleted",
    },
  },
  extras: {
    success: {
      found: "extras found ",
      updated: "** extras succesfully updated ** ",
      created: "** extras succesfully created **",
      deleted: "** extras succesfully deleted , with id :",
    },
    error: {
      not_found: "extras not found :( ",
      not_updated: "** no extras found to  update **",
      not_created: " extras is not created",
      not_deleted: "extras doesn't exist to be deleted",
    },
  },
};
