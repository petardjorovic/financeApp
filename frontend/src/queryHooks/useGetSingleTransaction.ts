import { useParams } from "react-router-dom";
import { useTransactions } from "./useTransactions";
import { useQuery } from "@tanstack/react-query";
import { getSingleTransaction, type Transaction } from "@/lib/api";

const TRANSACTION = "transaction";

export const useGetSingleTransaction = () => {
  const { transactionId } = useParams<{ transactionId: string }>();
  const { data } = useTransactions();
  const cacheTransaction = data?.transactions?.find(
    (tx) => tx._id === transactionId
  );

  const { data: transaction, ...rest } = useQuery<Transaction>({
    queryKey: [TRANSACTION, transactionId],
    queryFn: () => getSingleTransaction(transactionId!),
    enabled: !cacheTransaction && !!transactionId,
    initialData: cacheTransaction,
  });

  return { transaction, ...rest };
};
