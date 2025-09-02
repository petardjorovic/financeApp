import { useParams } from "react-router-dom";

function EditTransaction() {
  const { transactionId } = useParams();

  return <div>{transactionId}</div>;
}

export default EditTransaction;
