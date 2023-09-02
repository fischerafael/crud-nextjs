import { Transaction, TransactionType } from "./entities";
import { TransactionRepositoryInMemory } from "./repository";

export class TransactionUseCases {
  constructor(readonly repository: TransactionRepositoryInMemory) {}

  async createTransaction(amount: number, type: TransactionType) {
    const transaction = new Transaction(amount, type);
    await this.repository.create(transaction);
  }

  async readAllTransactions() {
    const transactions = await this.repository.list();
    return transactions;
  }

  async readTransaction(id: string) {
    const transaction = await this.repository.findById(id);
    if (!transaction) throw new Error("Not Found");
    return transaction;
  }

  async updateTransaction(
    id: string,
    values: { amount?: number; type?: TransactionType }
  ) {
    const transaction = await this.repository.findById(id);
    if (!transaction) throw new Error("Not Found");
    transaction.setAmount(values.amount || transaction.getAmount());
    transaction.setType(values.type || transaction.getType());
    await this.repository.update(transaction);
  }

  async deleteTransaction(id: string) {
    const transaction = await this.repository.findById(id);
    if (!transaction) throw new Error("Not Found");
    await this.repository.delete(id);
  }
}
