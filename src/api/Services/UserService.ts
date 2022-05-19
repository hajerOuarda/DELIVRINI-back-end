import { NextFunction, Request, Response, Router } from "express";
import { DestroyOptions, Error } from "sequelize";
import { UpdateOptions } from "sequelize";
import { User } from "../Models/User";
import jwt, { SignOptions, VerifyOptions } from "jsonwebtoken";
import { PRIVATE_KEY } from "../config/jwt/auth.config";
import bcrypt from "bcrypt";
import nodemailer from "nodemailer";
import crypto from "crypto";
import path from "path";
import fs from "fs";
import Handlebars from "handlebars";
import { Token } from "../Models/Token";

//** */
const signOptions: SignOptions = {
  algorithm: "RS256",
  expiresIn: "2h",
};

const verifyOptions: VerifyOptions = {
  algorithms: ["RS256"],
};

/** Register user   */

const signup = async (req: Request, res: Response) => {
  const { name, lastname, phone, email, password, address, zipCode, street, role }: any = req.body;
  if (!email || !password) {
    res.status(404).json({ message: "enter email and password " });
  } else {
    const _emailExisted = await User.count({ where: { email: email } });

    if (_emailExisted != 0) {
      res.status(409).json({
        message: "User already existed",
        code: 409
      });
    } else {
      try {
        const hash = await bcrypt.hash(password, 10);
        const user = new User({
          email: email,
          password: hash,
          name: name,
          lastname: lastname,
          phone: phone,
          address: address,
          zipCode: zipCode,
          street: street,
          fk_role: role,
        });
        try {
          await user.save();
          res.status(201).json({
            message: "User Registered successfully!",
          });
        } catch (error) {
          res.status(404).json(error);
        }
      } catch (error) {
        res.status(404).json(error);
      }
    }
  }
};
/** login user   */

const login = async (req: Request, res: Response) => {
  const { email, password }: any = req.body;

  const user = await User.findOne({ where: { email: email } });

  if (!user) {
    res.status(404).json({
      error: "User not found!",
    });
  } else {
    try {
      const valid = await bcrypt.compare(password, user.password);
      if (!valid) {
        res.status(401).json({
          error: {
            type: "invalid_credentials",
            message: "Invalid Password",
          },
        });
      } else {
        const token = jwt.sign({ userId: user?.id }, PRIVATE_KEY, signOptions);
        res.status(200).json({
          message: "** login succesful !",
          user: user,
          accessToken: token,
        });
      }
    } catch (error: any) {
      res.status(401).json({
        error: error.mesage,
        mesage: "error in password",
      });
    }
  }
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
  } catch (error: any) {
    return error;
  }
};

const requestPasswordReset = async (req: Request, res: Response) => {
  const email = req.body.email;
  const user = await User.findOne({ where: { email: email } });
  if (!user) {
    res.status(404).json({
      error: { message: "No user with that email : " },
    });
  } else {
    const token = await Token.findOne({ where: { userId: user!.id } });
    if (token) {
      token?.destroy();
    }
    const resetToken = crypto.randomBytes(32).toString("hex");
    const hash = await bcrypt.hash(resetToken, 10);
    await Token.create({
      userId: user!.id,
      token: hash,
    });
    const link = `http://localhost:9002/apiDelivrini/user/auth/resetPassword?token=${resetToken}&id=${user!.id
      }`;
    const emailContent = {
      name: user?.name,
      mylink: link,
    };
    const url = await sendEmail(
      user!.email,
      "Password Reset Request",
      emailContent,
      "src/api/config/templates/request-reset-password-email.html"
    );
    if (url) {
      res.status(200).json({
        check_link: url,
      });
    } else {
      res.status(500).json({
        message: "error sending the email",
      });
    }
  }
};

const resetPassword = async (req: Request, res: Response) => {
  const userId = req.query.id as any;
  const token = req.query.token as any;
  const password = req.body.password!;
  try {
    const passwordResetToken = await Token.findOne({
      where: { userId: userId },
    });
    const valid = await bcrypt.compare(token, passwordResetToken!.token);
    if (!valid) {
      res.status(401).json({
        message: {
          message: "Invalid Token or expired password reset token",
        },
      });
    } else {
      const hash = await bcrypt.hash(password, 10);
      await User.update({ password: hash }, { where: { id: userId } });

      const user = await User.findByPk(userId);
      const url = await sendEmail(
        user?.email,
        "Password Reset Seccessfully",
        { name: user?.name },
        "src/api/config/templates/reset-password-email.html"
      );
      passwordResetToken!.destroy();
      res.status(200).json({
        message: "Password Reset Seccessfully check your mail",
        url: url,
      });
    }
  } catch (error) {
    res.json(error);
  }
};

/** CRUD  */

async function findAllUsers(options: any): Promise<User[]> {
  return await User.findAll<User>({
    limit: parseInt(options.limit),
    offset: (options.offset),
  });
}

async function findOneUser(userId: string): Promise<User | null> {
  return await User.findByPk<User>(userId);
}

async function createUser(user: any) {
  const params = user;
  return await User.create<User>(params);
}

async function updateUser(user: User, id: string) {
  const userId = id;
  const params = user;

  const options: UpdateOptions = {
    where: { id: userId },
    limit: 1,
  };

  return await User.update(params, options);
}

async function deleteUser(userId: string) {
  const options: DestroyOptions = {
    where: { id: userId },
    limit: 1,
  };

  return await User.destroy(options);
}

export {
  findAllUsers,
  findOneUser,
  createUser,
  updateUser,
  deleteUser,
  requestPasswordReset,
  resetPassword,
  login,
  signup,
  verifyOptions,
};
