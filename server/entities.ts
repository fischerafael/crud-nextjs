import { randomUUID } from "crypto";

export type TransactionType = "debit" | "credit";

export class Transaction {
  private id: string = "";
  private amount: number = 0;
  private type: TransactionType = "credit";

  constructor(amount: number, type: TransactionType) {
    this.amount = amount;
    this.type = type;
    this.id = randomUUID();
  }

  getAmount() {
    return this.amount;
  }

  getType() {
    return this.type;
  }

  getId() {
    return this.id;
  }

  setAmount(amount: number) {
    this.amount = amount;
  }

  setType(type: TransactionType) {
    this.type = type;
  }

  setId(id: string) {
    this.id = id;
  }
}
