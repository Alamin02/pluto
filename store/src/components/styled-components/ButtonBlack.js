import styles from "./ButtonBlack.module.css";

export default function BlackButton({ buttonText, onClick }) {
  return (
    <button className={styles.blackButton} onClick={onClick}>
      {buttonText}
    </button>
  );
}
