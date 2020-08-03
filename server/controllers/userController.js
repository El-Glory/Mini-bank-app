import statusCodes from '../helpers/statusCodes';


class UserController {
     /**
   * create new user
   * @param {object} request express request object
   * @param {object} response express response object
   *
   * @returns {json} json
   */

   static signup(req, res) {
       try {
          const {
              firstName, lastName, email, password, type
          }  = req.body;

          let userType = 'client';
          let adminType = false;

          if (type) {
              userType = type
              if (userType === 'admin') {
                  adminType = true;
                  userType = 'staff'
              }
          }

          const data = {
            email,
            firstName,
            lastName,
            password,
            registered,
            type: userType,
            isAdmin: adminType,
          };
       } catch () {
           
       }
   }
}