import { Transaction } from "./entities";

export class TransactionRepositoryInMemory {
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

  async delete(id: string) {
    const updatedTransactions = this.transactionsInMemory.filter(
      (tr) => tr.getId() !== id
    );

    this.transactionsInMemory = updatedTransactions;
  }

  async update(transaction: Transaction) {
    const updatedTransactions = this.transactionsInMemory.map((tr) => {
      if (tr.getId() === transaction.getId()) {
        transaction;
      }
      return tr;
    });

    this.transactionsInMemory = updatedTransactions;
  }
}
