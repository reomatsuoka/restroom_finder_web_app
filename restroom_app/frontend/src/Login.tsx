import React, { useState, useEffect } from 'react';
import { GoogleLogin } from '@leecheuk/react-google-login';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './Login.module.css';

const Login: React.FC = () => {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsLoggedIn(!!token);
    }, []);

    const handleLoginSuccess = async (googleData: any) => {
        const result = await axios.post('http://localhost:8000/dj-rest-auth/google/', {
            access_token: googleData.tokenObj.id_token // Googleから受け取ったIDトークン
        });
    
        if (result.status === 200) {
            localStorage.setItem('token', result.data.key);
            setIsLoggedIn(true);
            navigate('/map'); // Googleログイン成功時に/mapにリダイレクト
        } else {
            console.error("Google login error", result);
        }
    };

    const handleLoginFailure = (response: any) => {
        console.error(response);
    };

    const handleCustomLogin = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/login/', {
                email: email,
                password: password
            });
            if (response.status === 200) {
                localStorage.setItem('token', response.data.token); // レスポンスからトークンを取得
                navigate('/map'); // ログイン成功時に/mapにリダイレクト
            } else {
                console.error("Login error", response);
            }
        } catch (error) {
            console.error(error);
        }
    };

    if (isLoggedIn) {
        return <div>Successfully logged in!</div>;
    }

    return (
        <div className={styles.loginContainer}>
          {/* メールアドレスとパスワードによるログインフォーム */}
          <form onSubmit={handleCustomLogin} className={styles.form}>
            <div className={styles.inputField}>
              <label>Email:</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className={styles.inputField}>
              <label>Password:</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <button type="submit" className={styles.button}>Login</button>
          </form>
          {/* Google OAuth ログインボタン */}
          <div className={styles.form}>
            <GoogleLogin
              clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID || ''}
              buttonText="Login with Google"
              onSuccess={handleLoginSuccess}
              onFailure={handleLoginFailure}
              cookiePolicy={'single_host_origin'}
            />
          </div>
        </div>
    );
}

export default Login;