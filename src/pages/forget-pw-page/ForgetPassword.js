import ForgetPassword from "../../components/forget-password/ForgetPassword";
import styles from "./ForgetPassword.module.css";
const ForgetPasswordPage = () => {
  return (  
    <>
      <div className={styles.containerFluid}>
        <ForgetPassword />
      </div>      
    </>
  );
};
 
export default ForgetPasswordPage;