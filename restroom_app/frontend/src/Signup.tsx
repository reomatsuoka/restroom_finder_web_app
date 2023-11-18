import React, { useState } from 'react';
import axios, { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from './Signup.module.css';

const Signup: React.FC = () => {
  const navigate = useNavigate(); // useNavigate フックの使用
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setErrorMessage('');
    try {
      const response = await axios.post('http://localhost:8000/signup/', {
        email: email,
        password: password
      });
      if (response.status === 201) {
        navigate('/map'); // リダイレクトを実行
      }
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError.response && axiosError.response.status === 400) {
        setErrorMessage('既にこのユーザー情報は存在します');
      } else {
        setErrorMessage('登録中にエラーが発生しました');
      }
    }
  };

  return (
    <div className={styles.formContainer}> {/* コンテナにスタイルを適用 */}
        <form onSubmit={handleSubmit} className={styles.form}>
        <div>
            <label>Email:</label>
            <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            />
        </div>
        <div>
            <label>Password:</label>
            <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            />
        </div>
        {errorMessage && <div>{errorMessage}</div>}
        <button type="submit">Sign Up</button>
        </form>
    </div>
  );
};

export default Signup;