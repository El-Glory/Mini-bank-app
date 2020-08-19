import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

const helpers = {
    /**
   * @description - encrypt password
   * @param {object} password
   * @returns {object} hashPassword
   */

  hashPassword(password) {
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);
    return hashedPassword;
  },

  generateAccountNumber(){
    const newAccountNumber = Math.floor(Math.random()* 9000000) + 2550000000;
    return newAccountNumber
  }
}



export default helpers;