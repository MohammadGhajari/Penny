import styles from "./../styles/transaction.module.css";
import DataTable from "../components/DataTable";
import AddTransaction from "../components/AddTransaction";
import { useSelector } from "react-redux";
export default function Transaction() {
  const { transactions } = useSelector((state) => state.user);

  return (
    <div className={styles["container"]}>
      <div className={styles["header"]}>
        <AddTransaction />
      </div>
      <DataTable data={transactions} />
    </div>
  );
}
