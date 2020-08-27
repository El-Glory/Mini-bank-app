import statusCodes from "../helpers/statusCodes";
import Account from "../models/account-model";
import Transaction from "../models/transaction-model";

class TransactionController {
  static async creditAccount(req, res) {
    try {
      const accountExist = await Account.findOne({
        accountNumber: req.params.accountNumber,
      });
      if (!accountExist)
        return res.status(400).json({
          status: statusCodes.badRequest,
          error: "Account does not exist",
        });

      const { amount } = req.body;
      const { accountNumber } = req.params;

      Account.findOne(req.account, (err, account) => {
        const previousAccount = account.accountBalance;
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

        const {
          cashier,
          createdOn,
          newBalance,
          type,
          oldBalance,
          id,
        } = transaction;
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
}

module.exports = TransactionController;
