
// import { Role } from "../Models/Entities/role";
// import { User } from "../Models/Entities/user";


 

// const isAdmin = async (req: any, res: any, next: any) => {
//   try {
//     const user = await User.findByPk(req.userId) as User;
     
//     const roles []=  User.getAttributes().role.values ;


//     for (let i = 0; i < roles.length; i++) {
//       if (roles[i].name === "admin") {
//         return next();
//       }
//     }

//     return res.status(403).send({
//       message: "Require Admin Role!",
//     });
//   } catch (error) {
//     return res.status(500).send({
//       message: "Unable to validate User role!",
//     });
//   }
// };

// isClient = async (req: any, res: any, next: any) => {
//   try {
//     const user = await User.findByPk(req.userId);
//     const roles = await user.getRoles();

//     for (let i = 0; i < roles.length; i++) {
//       if (roles[i].name === "moderator") {
//         return next();
//       }
//     }

//     return res.status(403).send({
//       message: "Require Moderator Role!",
//     });
//   } catch (error) {
//     return res.status(500).send({
//       message: "Unable to validate Moderator role!",
//     });
//   }
// };

// isModeratorOrAdmin = async (req, res, next) => {
//   try {
//     const user = await User.findByPk(req.userId);
//     const roles = await User.getAttributes().nomRole.values;

//     for (let i = 0; i < roles.length; i++) {
//       if (roles[i].name === "moderator") {
//         return next();
//       }

//       if (roles[i].name === "admin") {
//         return next();
//       }
//     }

//     return res.status(403).send({
//       message: "Require Moderator or Admin Role!",
//     });
//   } catch (error) {
//     return res.status(500).send({
//       message: "Unable to validate Moderator or Admin role!",
//     });
//   }
// };

// const authJwt = {
//   verifyToken,
//   isAdmin,
//   isModerator,
//   isModeratorOrAdmin,
// };
// module.exports = authJwt;
