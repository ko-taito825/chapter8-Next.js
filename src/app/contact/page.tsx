"use client";
import { useState } from "react";
import InputForm from "./components/InputForm";
import SubmitButton from "./components/SubmitButton";
import ClearButton from "./components/ClearButton";
import TextArea from "./components/TextArea";
import styles from "./page.module.css";
export default function page() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [form, setForm] = useState<string>("");
  const [errors, setErrors] = useState<Errors>({});
  const [isLoading, setIsLoading] = useState(false);
  type Errors = {
    name?: string;
    email?: string;
    form?: string;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("名前", name);
    console.log("メールアドレス", email);
    console.log("本文", form);

    if (!validate()) {
      console.log("バリデーションエラー", errors);
      return;
    }
    const payload = { name, email, message: form };

    try {
      const res = await fetch(
        "https://1hmfpsvto6.execute-api.ap-northeast-1.amazonaws.com/dev/contacts",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );
      if (res.ok) {
        console.log("送信完了");
        alert("送信しました");
        setName("");
        setEmail("");
        setForm("");
        setErrors({});
      } else {
        console.log("通信エラー", res.status);
        alert("通信に失敗しました");
      }
    } catch (errors) {
      console.error("通信エラー", errors);
      alert("通信エラーが発生しました。");
    } finally {
      setIsLoading(false);
    }
  };
  const validate = () => {
    const newErrors: Errors = {};
    if (!name.trim()) {
      newErrors.name = "名前を入力してください";
    } else if (name.trim().length > 30) {
      newErrors.name = "名前は30文字以内で入力してください";
    }
    if (!email.trim()) {
      newErrors.email = "メールアドレスを入力してください";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "メールアドレスの形式が正しくありません";
    }
    if (!form.trim()) {
      newErrors.form = "お問い合わせ内容を入力してください";
    } else if (form.trim().length > 500) {
      newErrors.form = "お問い合わせ内容は500文字以内で入力してください";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleClear = () => {
    setName("");
    setEmail("");
    setForm("");
    setErrors({});
  };
  return (
    <form className={styles.wrapper} onSubmit={handleSubmit} noValidate>
      <div className={styles.contactTitle}>
        <h1>問い合わせフォーム</h1>
      </div>

      <InputForm
        name={name}
        email={email}
        setName={setName}
        setEmail={setEmail}
        errors={errors}
        disabled={isLoading}
      />
      <TextArea
        form={form}
        setForm={setForm}
        errors={errors}
        disabled={isLoading}
      />
      <div className={styles.flexButton}>
        <SubmitButton disabled={isLoading} />
        <ClearButton onClick={handleClear} disabled={isLoading} />
      </div>
    </form>
  );
}
