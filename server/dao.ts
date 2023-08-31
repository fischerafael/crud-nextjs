import { Transaction } from "./entities";

export class TransactionDAO {
  private transactionsInMemory: Transaction[] = [];

  async create(transaction: Transaction) {
    this.transactionsInMemory.push(transaction);
  }

  async list() {
    return this.transactionsInMemory;
  }

  async findById(id: string) {
    return this.transactionsInMemory.find((tr) => tr.getId() === id);
  }

  async update(transaction: Transaction) {
    const updated = this.transactionsInMemory.map((existingTransaction) => {
      if (existingTransaction.getId() === transaction.getId()) {
        return transaction;
      }

      return existingTransaction;
    });
    this.transactionsInMemory = updated;
  }

  async delete(id: string) {
    const updated = this.transactionsInMemory.filter((tr) => tr.getId() !== id);
    this.transactionsInMemory = updated;
  }
}
