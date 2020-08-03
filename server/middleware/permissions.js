import statusCodes from "../helpers/statusCodes";

/**
 * check if user is a staff
 * @param {object} request express request object
 * @param {object} response express response object
 * @param {object} next express next object
 *
 * @returns {json} json
 */

export const staffRole = (req, res, next) => {
  const { isAdmin, type } = req.decode;
  if (!isAdmin && type === "staff") {
    next();
  } else {
    return res.status(403).json({
      status: statusCodes.forbidden,
      error: "Forbidden: Access is denied",
    });
  }
};

/**
 * check if user is an admin
 * @param {object} request express request object
 * @param {object} response express response object
 * @param {object} next express next object
 *
 * @returns {json} json
 */

export default adminRole = (req, res, next) => {
  const { isAdmin, type } = req.decode;
  if (isAdmin && type === "staff") {
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
export default adminStaffRole = (req, res, next) => {
  const { isAdmin, type } = req.decode;
  if ((!isAdmin && type === "staff") || (isAdmin && type === "staff")) {
    next();
  } else {
    return res.status(403).json({
      status: statusCodes.forbidden,
      error: "Forbidden: Access is denied",
    });
  }
};
