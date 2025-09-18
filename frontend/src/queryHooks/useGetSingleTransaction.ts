import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getSingleTransaction, type Transaction } from "@/lib/api";

const TRANSACTION = "transaction";

export const useGetSingleTransaction = () => {
  const { transactionId } = useParams<{ transactionId: string }>();

  const { data: transaction, ...rest } = useQuery<Transaction>({
    queryKey: [TRANSACTION, transactionId],
    queryFn: () => getSingleTransaction(transactionId!),
    enabled: !!transactionId,
  });

  return { transaction, ...rest };
};
