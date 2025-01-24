import styles from "./../styles/transaction.module.css";
import DataTable from "../components/DataTable";
import AddTransaction from "../components/AddTransaction";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
export default function Transaction() {
  const { transactions, userName } = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userName) navigate("/");
  }, []);
  return (
    <div className={styles["container"]}>
      <div className={styles["header"]}>
        <AddTransaction />
      </div>
      <DataTable data={transactions} />
    </div>
  );
}
