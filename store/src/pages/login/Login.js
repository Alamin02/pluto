import Login from "../../components/login/Login";
import styles from "./Login.module.css";

const LoginPage = () => {
  return (
    <>
      <div className={styles.containerFluid}>
        <Login />
      </div>
    </>
  );
};

export default LoginPage;
