import { TransactionRepositoryInMemory } from "@/server/repository";
import { TransactionUseCases } from "@/server/use-cases";
import type { NextApiRequest, NextApiResponse } from "next";

const repository = new TransactionRepositoryInMemory();
const transactionUseCase = new TransactionUseCases(repository);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method, body, query } = req;
  const { id } = query;
  try {
    if (method === "POST") {
      await transactionUseCase.createTransaction(body.amount, body.type);
      return res.status(201).json({ message: "Ok" });
    }

    if (method === "PUT") {
      await transactionUseCase.updateTransaction(id as string, body);
      return res.status(200).json({ message: "Ok" });
    }

    if (method === "DELETE") {
      await transactionUseCase.deleteTransaction(id as string);
      return res.status(200).json({ message: "Ok" });
    }

    if (!!id) {
      const transactions = await transactionUseCase.readTransaction(
        id as string
      );
      return res.status(200).json({ data: transactions });
    }

    const transactions = await transactionUseCase.readAllTransactions();
    return res.status(200).json({ data: transactions });
  } catch (e: any) {
    return res.status(500).json({ message: e.message });
  }
}
