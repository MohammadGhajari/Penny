import styles from "./../styles/transaction.module.css";
import DataTable from "../components/DataTable";
import { useSelector } from "react-redux";
export default function Transaction() {
  const { transactions } = useSelector((state) => state.user);

  return (
    <div className={styles["container"]}>
      <DataTable data={transactions} />
    </div>
  );
}
