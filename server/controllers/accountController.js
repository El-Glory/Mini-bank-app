import statusCodes from "../helpers/statusCodes";
import utils from "../helpers/common";
import { createAccount, changeAccountStatus } from "../middleware/validations";
import Account from "../models/account-model";
//import User from "../models/user-model";

class AccountController {
  static async createAccount(req, res) {
    const { error } = createAccount(req.body);
    if (error)
      return res.status(400).json({
        status: statusCodes.badRequest,
        error: error.details[0].message,
      });

    try {
      const { accountType } = req.body;
      console.log(accountType);

      const checkAccount = await Account.findOne({ id: req.user.id });
      if (checkAccount)
        return res.status(400).send({
          status: statusCodes.badRequest,
          error: "You cannot create more than 1 account",
        });

      const account = new Account({
        accountNumber: utils.generateAccountNumber(),
        createdOn,
        owner: req.user._id,
        accountType,
        accountStatus,
        accountBalance: 0.0,
      });
      account.save();
      const {
        accountNumber,
        accountStatus,
        accountBalance,
        createdOn,
        owner,
      } = account;
      return res.status(201).send({
        status: statusCodes.created,
        data: [
          {
            accountNumber: accountNumber,
            owner,
            type: accountType,
            accountStatus: accountStatus,
            balance: accountBalance,
            created: createdOn,
          },
        ],
      });
    } catch (error) {
      return res
        .status(500)
        .json({ status: statusCodes.serverError, error: "Server Error" });
    }
  }

  // CHANGE ACCOUNT STATUS
  static async AccountStatus(req, res) {
    const { error } = changeAccountStatus(req.body);
    if (error)
      return res.status(400).json({
        status: statusCodes.badRequest,
        error: error.details[0].message,
      });
    try {
      const { accountStatus } = req.body;
      const { accountNumber } = req.params;

      const checkAccount = await Account.findOne({
        accountNumber: req.params.accountNumber,
      });
      if (!checkAccount)
        return res.status(400).send({
          status: statusCodes.badRequest,
          error: "Account does not Exist!!",
        });
        //set the accountStatus to the one that best suits me
      await Account.findOneAndUpdate({accountNumber},{$set:{accountStatus}} ,{
        new: true,
      });
      return res.status(200).send({
        status: statusCodes.success,
        data: [
          {
            accountNumber,
            accountStatus,
          },
        ],
      });
    } catch (error) {
      return res
        .status(500)
        .json({ status: statusCodes.serverError, error: "Server Error" });
    }
  }
}

export default AccountController;
