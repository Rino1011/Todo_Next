import React, { ChangeEvent, FormEvent, useState } from "react";
import styles from "../styles/Home.module.css";
import axios from "axios";
import { useRouter } from "next/router";

const CreatePost = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");  // content stateを追加
    const router = useRouter();

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        console.log(title, content);

        try {
            await axios.post("http://localhost:3000/api/v1/posts", {
                title: title,
                content: content
            });
            
            router.push("/");
        } catch (err) {
            alert("投稿に失敗しました");
        }
    }

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>ブログ新規登録</h1> 
            <form className={styles.form} onSubmit={handleSubmit}>
                <label className={styles.label}>タイトル</label>
                <input 
                    type="text" 
                    className={styles.input} 
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
                />
                <label className={styles.label}>本文</label>
                <textarea 
                    className={styles.textarea}
                    onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setContent(e.target.value)}  // setContentを使うよう修正
                />
                <button type="submit" className={styles.button}>投稿</button>
            </form>
        </div>
    );
};

export default CreatePost;
