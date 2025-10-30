import React from "react";
import styles from "../styles/TextArea.module.css";

interface TextAreaProps {
  form: string;
  setForm: React.Dispatch<React.SetStateAction<string>>;
  errors: Record<string, string>;
  disabled: boolean;
}
export default function TextArea({ form, setForm, errors }: TextAreaProps) {
  return (
    <div className={styles.textAreaRow}>
      <label htmlFor="form">本文</label>
      <textarea
        name="form"
        id="form"
        value={form}
        rows={5}
        className={styles.textArea}
        onChange={(e) => setForm(e.target.value)}
      ></textarea>
    </div>
  );
}
