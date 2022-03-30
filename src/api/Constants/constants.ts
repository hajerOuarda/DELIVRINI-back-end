import dotenv from "dotenv";

dotenv.config();

export const PORT = process.env.PORT || 4000;
<<<<<<< Updated upstream
=======

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
      access_not_granted: "you're not a Delivery Man , this Require Delivery Man Role!",
    },
  },
};
>>>>>>> Stashed changes
