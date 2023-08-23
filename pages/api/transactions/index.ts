import { TransactionUseCases } from "@/server/use-cases";
import type { NextApiRequest, NextApiResponse } from "next";

const transactionUseCase = new TransactionUseCases();

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method, body, query } = req;
  const { id } = query;
  try {
    if (method === "POST") {
      transactionUseCase.createTransaction(body.amount, body.type);
      return res.status(201).json({ message: "Ok" });
    }

    if (method === "PUT") {
      transactionUseCase.updateTransaction(id as string, body);
      return res.status(200).json({ message: "Ok" });
    }

    if (method === "DELETE") {
      transactionUseCase.deleteTransaction(id as string);
      return res.status(200).json({ message: "Ok" });
    }

    if (!!id) {
      const transactions = transactionUseCase.readTransaction(id as string);
      return res.status(200).json({ data: transactions });
    }

    const transactions = transactionUseCase.readAllTransactions();
    return res.status(200).json({ data: transactions });
  } catch (e: any) {
    return res.status(500).json({ message: e.message });
  }
}
