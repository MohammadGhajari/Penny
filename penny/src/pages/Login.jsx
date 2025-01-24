import LoginForm from "../components/LoginForm";
import { toastError, toastSuccess } from "../utils/notify";
import styles from "./../styles/login.module.css";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  setUserName,
  setPassword,
  setTransactions,
} from "../state management/userSlice";
import { getFromLocalStorage } from "../utils/helper";

export default function Login() {
  const [userNameField, setUserNameField] = useState("");
  const [passwordField, setPasswordField] = useState("");
  const [userNameError, setUserNameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();

    setUserNameError(false);
    setPasswordError(false);

    //check if there is no user with this username
    const allExistingUsers = getFromLocalStorage("allUsers");

    if (!allExistingUsers)
      return toastError("There is no user with this username");

    const foundedUser = allExistingUsers.filter(
      (user) => user.userName === userNameField
    );
    if (foundedUser.length === 0)
      return toastError("There is no user with this username");
    if (foundedUser[0].password !== passwordField)
      return toastError("Password is incorrect");

    console.log(foundedUser);

    toastSuccess("Logged in successfully");

    dispatch(setUserName(foundedUser[0].userName));
    dispatch(setPassword(foundedUser[0].password));
    dispatch(setTransactions(foundedUser[0].transactions));

    navigate("/transaction");
  }

  return (
    <div className={styles["container"]}>
      <LoginForm
        setUserName={setUserNameField}
        setPassword={setPasswordField}
        setUserNameError={setUserNameError}
        passwordError={passwordError}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
