import React from "react";
import styles from "../styles/InputForm.module.css";
interface InputFieldProps {
  name: string;
  email: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  errors: Record<string, string>;
  disabled: boolean;
}

export default function InputForm({
  name,
  email,
  setName,
  setEmail,
  errors,
}: InputFieldProps) {
  return (
    <>
      <div className={styles.inputRow}>
        <label htmlFor="name">お名前</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className={styles.inputRow}>
        <label htmlFor="email">メールアドレス</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
    </>
  );
}
