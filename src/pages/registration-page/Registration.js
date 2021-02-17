import Registration from "../../components/registration/Registration";
import styles from "./Registration.module.css"
const RegistrationPage = () => {
  return (
    <>
      <div className={styles.containerFluid}>
        <Registration />
      </div>      
    </>
  );
};

export default RegistrationPage;
