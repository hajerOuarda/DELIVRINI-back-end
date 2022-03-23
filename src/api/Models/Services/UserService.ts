import e, { NextFunction, Request, Response, Router } from "express";
import { DestroyOptions } from "sequelize";
import { UpdateOptions } from "sequelize";
import { User } from "../Entities/user";
import jwt, { SignOptions, VerifyOptions } from "jsonwebtoken";
import { PRIVATE_KEY } from "../../config/jwt/auth.config";
import bcrypt from "bcrypt";

const signOptions: SignOptions = {
  algorithm: "RS256",
  expiresIn: "2h",
};

const verifyOptions: VerifyOptions = {
  algorithms: ["RS256"],
};

const signup = (req: Request, res: Response, next: NextFunction) => {
  const { name, lastname, phone, email, password, role_name }: any = req.body;
  User.count({ where: { email: email } }).then((_emailExisted) => {
    if (_emailExisted != 0) {
      res.status(500).json({
        message: "User already existed",
      });
      next({ message: "User already existed" });
      return;
    }

    bcrypt
      .hash(password, 10)
      .then((hash) => {
        const user = new User({
          email: email,
          password: hash,
          name: name,
          lastname: lastname,
          phone: phone,
          fk_role: role_name,
        });
        user
          .save()
          .then(() => {
            res.status(201).json({
              message: "User Registered successfully!",
            });
            next();
          })
          .catch((error) => {
            res.status(500).json({
              error: error.message,
            });
          });
      })
      .catch((err: Error) => {
        res.status(401).json(err.message);
      });
  });
};
const login = (req: Request, res: Response, next: NextFunction) => {
  const { email, password }: any = req.body;
  User.findOne({ where: { email: email } })
    .then((user) => {
      if (!user) {
        res.status(401).json({
          error: "User not found!",
        });
        next("User not found!");
        return;
      }

      bcrypt
        .compare(password, user.password)
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({
              error: {
                type: "invalid_credentials",
                message: "Invalid Password",
              },
            });
          }
          const token = jwt.sign({ userId: user.id }, PRIVATE_KEY, signOptions);
          return res.status(200).json({
            message: "** login succesful !",
            userId: user.id,
            accessToken: token,
          });
        })
        .catch((error) => {
          res.status(500).json({
            error: {
              mesage: "error in password",
            },
          });
        });
    })
    .catch((error) => {
      res.status(500).json({
        error: error.message,
      });
    });
};

/** CRUD  */

function findAll(): Promise<User[]> {
  return User.findAll<User>();
}

function findOneUser(userId: string): Promise<User | null> {
  return User.findByPk<User>(userId);
}

async function createUser(user: any) {
  const params = user;
  User.create<User>(params)
     
}

async function updateUser(user: User, id: string) {
  const userId = id;
  const params = user;
  console.log(userId);

  const options: UpdateOptions = {
    where: { id: userId },
    limit: 1,
  };

  User.update(params, options);
}

async function deleteUser(userId: string) {
  const options: DestroyOptions = {
    where: { id: userId },
    limit: 1,
  };

  return User.destroy(options);
}

export {
  findAll,
  findOneUser,
  createUser,
  updateUser,
  deleteUser,
  login,
  signup,
  verifyOptions,
};
