import { TransactionDAO } from "./dao";
import { Transaction, TransactionType } from "./entities";

export class TransactionUseCases {
  private transactionDAO: TransactionDAO = new TransactionDAO();

  async createTransaction(amount: number, type: TransactionType) {
    const transaction = new Transaction(amount, type);
    await this.transactionDAO.create(transaction);
  }

  async readAllTransactions() {
    const transactions = await this.transactionDAO.list();
    return transactions;
  }

  async readTransaction(id: string) {
    const transaction = await this.transactionDAO.findById(id);
    if (!transaction) throw new Error("Not Found");
    return transaction;
  }

  async updateTransaction(
    id: string,
    values: { amount?: number; type?: TransactionType }
  ) {
    const transactionToUpdate = await this.transactionDAO.findById(id);
    if (!transactionToUpdate)
      throw new Error("This Transaction does not exist");

    transactionToUpdate.setAmount(
      values.amount || transactionToUpdate.getAmount()
    );
    transactionToUpdate.setType(values.type || transactionToUpdate.getType());

    await this.transactionDAO.update(transactionToUpdate);
  }

  async deleteTransaction(id: string) {
    await this.transactionDAO.delete(id);
  }
}
