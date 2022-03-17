import { User } from "../Entities/user";

import { Request, response, Response } from "express";
import { UpdateOptions } from "sequelize";
import { DestroyOptions } from "sequelize";

export class UserRepository {
  async findAll() {
    let users: Array<User>;
    users = await User.findAll<User>();
    return users;
  }

  async create(user: any) {
    const params = user;

    return User.create<User>(params);
  }

  async findOne(userId: string) {
    return User.findByPk<User>(userId);
  }

  async update(user: User, id: string) {
    const userId = id;
    const params = user;
    console.log(userId);

    const options: UpdateOptions = {
      where: { id: userId },
      limit: 1,
    };

    User.update(params, options);
  }

  async delete(userId: string) {
    const options: DestroyOptions = {
      where: { id: userId },
      limit: 1,
    };

    return User.destroy(options);
  }
}
