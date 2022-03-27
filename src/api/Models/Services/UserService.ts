import { NextFunction, Request, Response, Router } from "express";
import { DestroyOptions, Error } from "sequelize";
import { UpdateOptions } from "sequelize";
import { User } from "../Entities/user";
import jwt, { SignOptions, VerifyOptions } from "jsonwebtoken";
import { PRIVATE_KEY } from "../../config/jwt/auth.config";
import bcrypt from "bcrypt";
import nodemailer from "nodemailer";
import { Token } from "../Entities/token";
import crypto from "crypto";
import path from "path";
import fs from "fs";
import Handlebars from "handlebars";
 
//** */
const signOptions: SignOptions = {
  algorithm: "RS256",
  expiresIn: "2h",
};

const verifyOptions: VerifyOptions = {
  algorithms: ["RS256"],
};

/** Register user   */

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
            console.log("saving user error");

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
/** login user   */

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

/** send email */

const sendEmail = async (
  email: any,
  subject: string,
  payload: any,
  template: any
): Promise<string | undefined> => {
  const myEmail = process.env.MAILER_EMAIL_ID;

  const smtpTransport = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth: {
      user: myEmail,
      pass: process.env.MAILER_PASSWORD,
    },
  });

  const source = fs.readFileSync(path.resolve(template), "utf8");
  const compiledTemplate = Handlebars.compile(source);

  const mail = {
    from: myEmail,
    to: email,
    subject: subject,
    template: "../../config/templates/reset-password-email.html",
    html: compiledTemplate(payload),
  };
  try {
    const info = await smtpTransport.sendMail(mail);
    const url = nodemailer.getTestMessageUrl(info) as string;

    return url;
  } catch (error) {
    console.log(error);
  }
};

const requestPasswordReset = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const email = req.body.email;
  console.log(email);

  User.findOne({ where: { email: email } })
    .then((user) => {
      Token.findOne({ where: { userId: user!.id } })
        .then(async (token) => {
          token?.destroy();
          const resetToken = crypto.randomBytes(32).toString("hex");
          const hash = await bcrypt.hash(resetToken, 10);
          await Token.create({
            userId: user!.id,
            token: hash,
          });
          const link = `http://localhost:9002/apiDelivrini/user/auth/resetPassword?token=${resetToken}&id=${
            user!.id
          }`;

          const emailContent = {
            name: user?.name,
            mylink: link,
          };
          // send mail that return url which will be in the sent msg
          sendEmail(
            user!.email,
            "Password Reset Request",
            emailContent,
            "src/api/config/templates/request-reset-password-email.html"
          )
            .then((url) => {
              return res.status(200).json({
                check_link: url,
              });
            })
            .catch((error) => {
              return res
                .status(500)
                .json({
                  message: "error sending the email",
                  erroe: error.message,
                });
            });
        })
        .catch((error) => {
          return res.status(500).json(error.message);
        });
    })
    .catch((error) => {
      return res.status(500).json({
        error: { message: "No user with that email : ".concat(error.mesage) },
      });
    });
};

const resetPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = req.query.id as any;
  const token = req.query.token as any,
    password = req.body.password!;
  console.log("userId:", userId);

  Token.findOne({ where: { userId: userId } })
    .then((passwordResetToken) => {
      bcrypt
        .compare(token, passwordResetToken!.token)
        .then(async () => {
          const hash = await bcrypt.hash(password, 10);
          // if(!password)
          User.update({ password: hash }, { where: { id: userId } })
            .then()
            .catch();
          const user = await User.findByPk(userId);
          const url = await sendEmail(
            user?.email,
            "Password Reset Seccessfully",
            { name: user?.name },
            "src/api/config/templates/reset-password-email.html"
          );
          passwordResetToken!.destroy();
          return res.status(200).json({
            message: "Password Reset Seccessfully check your mail",
            url: url,
          });
        })
        .catch((error) => {
          res.status(401).json({
            message: "password is empty enter new one",
            error: error.message,
          });
        });
    })
    .catch((error: Error) => {
      res.status(401).json({
        message: {
          message: "Invalid Token or expired password reset token",
          error: error.message,
        },
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
  User.create<User>(params);
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
  sendEmail,
  requestPasswordReset,
  resetPassword,
};

// .then((info) => {
//       const url = nodemailer.getTestMessageUrl(info) as string;
//       // console.log("URL --- : ", url);

//       return url;
//     })
//     .catch(() => {
//       throw new Error(" error sanding mail");
//     });
