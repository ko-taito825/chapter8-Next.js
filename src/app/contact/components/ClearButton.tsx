import React from "react";
import styles from "../styles/ClearButton.module.css";
interface ClearButtonProps {
  disabled: boolean;
  onClick: (e: React.MouseEvent<HTMLInputElement>) => void;
}
export default function ClearButton({ disabled, onClick }: ClearButtonProps) {
  return (
    <div>
      <input
        type="submit"
        value="クリア"
        className={styles.ClearButton}
        disabled={disabled}
        onClick={onClick}
      />
    </div>
  );
}
