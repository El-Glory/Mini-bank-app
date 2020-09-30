import statusCodes from "../helpers/statusCodes";
import utils from "../helpers/common";
import {
  createAccount,
  changeAccountStatus,
  getAllTransactions,
} from "../middleware/validations";
import Account from "../models/account-model";
import Transaction from "../models/transaction-model";
import User from "../models/user-model";

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

      // const checkAccount = await Account.findOne({ owner: req.user.id });
      // if (checkAccount)
      //   return res.status(400).send({
      //     status: statusCodes.badRequest,
      //     error: "You cannot create more than 1 account",
      //   });

      const account = new Account({
        accountNumber: utils.generateAccountNumber(),
        createdOn,
        owner: req.user,
        accountType,
        //accountStatus,
        accountBalance: 0.0,
      });
      account.save();
      const {
        accountNumber,
        //accountStatus,
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
            // accountStatus: accountStatus,
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
      await Account.findOneAndUpdate(
        { accountNumber },
        { $set: { accountStatus } },
        {
          new: true,
        }
      );
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

  //DELETE ACCOUNT
  static async DeleteAccount(req, res) {
    // const { accountNumber } = req.params;

    try {
      const accountExist = await Account.findOne({
        accountNumber: req.params.accountNumber,
      });
      if (!accountExist)
        return res.status(400).json({
          status: statusCodes.badRequest,
          error: "Account does not exist",
        });

      await Account.findOneAndDelete({
        accountNumber: req.params.accountNumber,
      });
      return res.status(200).json({
        status: statusCodes.success,
        message: "Account successfully deleted",
      });
    } catch (error) {
      return res
        .status(500)
        .json({ status: statusCodes.serverError, error: "Server Error" });
    }
  }

  static async getTransactions(req, res) {
    const { error } = getAllTransactions(req.params);
    if (error)
      return res.status(400).json({
        status: statusCodes.badRequest,
        error: error.details[0].message,
      });

    try {
      const accountExist = await Account.findOne({
        accountNumber: req.params.accountNumber,
      });
      if (!accountExist)
        return res.status(404).json({
          status: statusCodes.badRequest,
          error: "Account does not exist",
        });

      // const { accountNumber } = req.params;

      Transaction.find(
        { accountNumber: req.params.accountNumber },
        (err, transactions) => {
          if (err)
            return res.status(404).json({
              status: statusCodes.badRequest,
              error: "No record found",
            });
          if (transactions)
            return res
              .status(200)
              .send({ status: statusCodes.success, transactions });
        }
      );
    } catch (error) {
      return res
        .status(500)
        .json({ status: statusCodes.serverError, error: "Server Error" });
    }
  }

  static async getASpecificAccount(req, res) {
    try {
      const accountExist = await Account.findOne({
        accountNumber: req.params.accountNumber,
      });
      if (!accountExist)
        return res.status(404).json({
          status: statusCodes.notFound,
          error: "Account does not exist",
        });

      const { accountNumber } = req.params;

      Account.findOne({ accountNumber })
        .populate("owner")
        .exec((err, account) => {
          if (err)
            return res.status(400).json({
              status: statusCodes.badRequest,
              error: "No record found",
            });

          const {
            createdOn,
            accountNumber,
            accountType,
            accountStatus,
            accountBalance,
            owner,
          } = account;
          if (account)
            return res.status(200).send({
              status: statusCodes.success,
              data: [
                {
                  createdOn,
                  accountNumber,
                  ownerEmail: owner.email,
                  type: accountType,
                  status: accountStatus,
                  balance: accountBalance,
                },
              ],
            });
          console.log(account.owner);
        });
    } catch (error) {
      return res
        .status(500)
        .json({ status: statusCodes.serverError, error: "Server Error" });
    }
  }

  static async getAllAccounts(req, res) {
    try {
      const { accountStatus } = req.query;

      if (accountStatus) {
        Account.find({ accountStatus })
          .populate("owner", "email")
          .exec((err, account) => {
            if (err)
              return res.status(400).json({
                status: statusCodes.badRequest,
                error: "No record found",
              });

            if (account)
              //console.log()
              return res.status(200).send({
                status: statusCodes.success,
                account,
              });
          });
      }
      
    } catch (error) {
      return res
        .status(500)
        .json({ status: statusCodes.serverError, error: "Server Error" });
    }

    try {
      Account.find()
        .populate("owner", "email")
        .exec((err, account) => {
          if (err)
            return res.status(400).json({
              status: statusCodes.badRequest,
              error: "No record found",
            });

          if (account)
            //console.log()

            return res.status(200).send({
              status: statusCodes.success,
              account,
            });
        });
    } catch (error) {
      return res
        .status(500)
        .json({ status: statusCodes.serverError, error: "Server Error" });
    }
  }
}

export default AccountController;
