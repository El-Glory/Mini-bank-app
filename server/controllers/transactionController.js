import statusCodes from "../helpers/statusCodes";
import Account from "../models/account-model";
import Transaction from "../models/transaction-model";
import { debitAccount, getAllTransactions } from "../middleware/validations";

class TransactionController {
  static async creditAccount(req, res) {
    try {
      const accountExist = await Account.findOne({
        accountNumber: req.params.accountNumber,
      });
      if (!accountExist)
        return res.status(404).json({
          status: statusCodes.badRequest,
          error: "Account does not exist",
        });

      const { amount } = req.body;
      const { accountNumber } = req.params;
      //const { accountBalance} = account;

      Account.findOne(req.account, (err, account) => {
        const { accountBalance } = account;

        const previousAccount = accountBalance;
        const transaction = new Transaction({
          createdOn,
          type: "credit",
          accountNumber,
          cashier: req.user,
          amount,
          oldBalance: previousAccount,
          newBalance: amount + previousAccount,
        });

        transaction.save();
        //console.log(accountBalance)

        const {
          cashier,
          createdOn,
          newBalance,
          type,
          oldBalance,
          id,
        } = transaction;
        //console.log(req.params.accountNumber)
        var query = { accountNumber: req.params.accountNumber };
        console.log(query);
        Account.findOneAndUpdate(
          query,
          { $set: { accountBalance: newBalance } },
          { new: true },
          (err, accountBalance) => {
            if (err) throw err;
            console.log(accountBalance);
          }
        );

        return res.status(201).send({
          status: statusCodes.created,
          data: [
            {
              transactionId: id,
              accountNumber,
              cashier,
              createdOn,
              oldBalance,
              transactionType: type,
              accountBalance: newBalance,
            },
          ],
        });
      });
    } catch (error) {
      return res
        .status(500)
        .json({ status: statusCodes.serverError, error: "Server Error" });
    }
  }
  // DEBIT ACCOUNT
  static async debitAccount(req, res) {
    //VALIDATIONS
    const { error } = debitAccount(req.body);
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

      const { amount } = req.body;
      const { accountNumber } = req.params;

      Account.findOne(req.account, (err, account) => {
        const { accountBalance } = account;
        const previousAccount = accountBalance;
        const transaction = new Transaction({
          createdOn,
          type: "debit",
          accountNumber,
          cashier: req.user,
          amount,
          oldBalance: previousAccount,
          newBalance: previousAccount - amount,
        });

        if (previousAccount <= 1000)
          return res.status(400).json({
            status: statusCodes.badRequest,
            error: "Sorry, Insufficient Balance",
          });
        if (amount > previousAccount)
          return res.status(400).json({
            status: statusCodes.badRequest,
            error: "Insufficient Balance",
          });
        if (account.accountStatus !== "active")
          return res.status(400).json({
            status: statusCodes.badRequest,
            error: "Sorry, your account is not active",
          });

        transaction.save();

        const {
          cashier,
          createdOn,
          newBalance,
          oldBalance,
          type,
          id,
        } = transaction;
        //Update the Account table
        var query = { accountNumber: req.params.accountNumber };
        Account.findOneAndUpdate(
          query,
          { $set: { accountBalance: newBalance } },
          { new: true },
          (err, accountBalance) => {
            if (err) throw err;
            console.log(account.accountBalance);
          }
        );

        return res.status(201).send({
          status: statusCodes.created,
          data: [
            {
              transactionId: id,
              accountNumber,
              cashier,
              createdOn,
              oldBalance,
              transactionType: type,
              accountBalance: newBalance,
            },
          ],
        });
      });
    } catch (error) {
      return res
        .status(500)
        .json({ status: statusCodes.serverError, error: "Server Error" });
    }
  }
  // GET A SPECIFIC TRANSACTION
  static async getATransaction(req, res) {
    Transaction.findById(req.params.id, (err, transaction) => {
      if (err)
        return res.status(404).json({
          status: statusCodes.notFound,
          error: "No transaction record found",
        });
      // const transaction = Transaction;
      const {
        createdOn,
        type,
        accountNumber,
        amount,
        oldBalance,
        newBalance,
        id,
      } = transaction;
      if (transaction)
        return res.status(200).send({
          status: statusCodes.success,
          transaction: [
            {
              transactionId: id,
              createdOn,
              type,
              accountNumber,
              amount,
              oldBalance,
              newBalance,
              type,
            },
          ],
        });
    });
  }
}

module.exports = TransactionController;
