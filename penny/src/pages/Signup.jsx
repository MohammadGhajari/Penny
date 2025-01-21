import { useState } from "react";
import LoginForm from "../components/LoginForm";
import styles from "./../styles/signup.module.css";
import { getFromLocalStorage, saveInLocalStorage } from "../utils/helper";
import { toastError, toastSuccess } from "../utils/notify";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [userNameError, setUserNameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [passwordConfirmError, setPasswordConfirmError] = useState(false);

  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();

    setUserNameError(false);
    setPasswordError(false);
    setPasswordConfirmError(false);

    if (password.length < 8) {
      setPasswordError(true);
      return toastError("Password length must be at least 8 characters.");
    }
    if (password !== passwordConfirm) {
      setPasswordError(true);
      setPasswordConfirmError(true);
      return toastError("Password and password confirm must be the same.");
    }

    //check if there is no user with this username
    const allExistingUsers = getFromLocalStorage("allUsers");
    console.log(allExistingUsers);
    if (allExistingUsers) {
      const foundedUser = allExistingUsers.filter(
        (user) => user.userName === userName
      );
      console.log(foundedUser);
      if (foundedUser.length > 0) return toastError("Username already exists.");
    }

    const newUser = {
      userName: userName,
      password: password,
      transactions: [],
    };
    if (allExistingUsers)
      saveInLocalStorage("allUsers", [...allExistingUsers, newUser]);
    else saveInLocalStorage("allUsers", [newUser]);

    toastSuccess("Registration successful. You can now log in.");

    navigate("/");
  }
  return (
    <div className={styles["container"]}>
      <LoginForm
        type="signup"
        setUserName={setUserName}
        setPassword={setPassword}
        setPasswordConfirm={setPasswordConfirm}
        setUserNameError={setUserNameError}
        passwordError={passwordError}
        passwordConfirmError={passwordConfirmError}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
