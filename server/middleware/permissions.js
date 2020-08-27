import statusCodes from "../helpers/statusCodes";
import User from "../models/user-model";

/**
 * check if user is a staff
 * @param {object} request express request object
 * @param {object} response express response object
 * @param {object} next express next object
 *
 * @returns {json} json
 */

export const staffRole = (req, res, next) => {
  User.findById(req.user, (err,user)=>{
    if (user.type === "staff" && user.isAdmin === false) {
      next();
    } else {
      return res.status(403).json({
        status: statusCodes.forbidden,
        error: "Forbidden: Access is denied",
      });
    }
  })
 
};

/**
 * check if user is an admin
 * @param {object} request express request object
 * @param {object} response express response object
 * @param {object} next express next object
 *
 * @returns {json} json
 */

export const adminRole = (req, res, next) => {
  const { type } = req.body;
  let isAdmin = true;
  console.log(type);
  if (type === "admin" && isAdmin === true) {
    next();
  } else {
    return res.status(403).json({
      status: statusCodes.forbidden,
      error: "Forbidden: Access is denied",
    });
  }
};

/**
 * check if user is an admin or a staff
 * @param {object} request express request object
 * @param {object} response express response object
 * @param {object} next express next object
 *
 * @returns {json} json
 */
// required where admin or staff need access
export const adminStaffRole = (req, res, next) => {
  User.findById(req.user, function (err, user) {
    console.log(req.user);
    console.log(user.isAdmin);
    if (
      (user.type === "staff" && user.isAdmin === false) ||
      (user.type === "admin" && user.isAdmin === true)
    ) {
      next();
    } else {
      return res.status(403).json({
        status: statusCodes.forbidden,
        error: "Forbidden: Access is denied",
      });
    }
  });
};
