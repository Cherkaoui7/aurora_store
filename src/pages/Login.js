import React, { useState } from 'react';
import styles from './Login.module.css'; // We will create this CSS file next

const Login = () => {
  const [currentState, setCurrentState] = useState('Sign Up');

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    alert(`${currentState} feature coming soon! We're working on it.`);
  }

  return (
    <div className={styles.loginContainer}>
      <form onSubmit={onSubmitHandler} className={styles.loginForm}>
        <div className={styles.titleContainer}>
          <h1 className={styles.title}>{currentState}</h1>
          <div className={styles.underline}></div>
        </div>

        {/* Name Input - Only shows if state is Sign Up */}
        {currentState === 'Sign Up' && (
          <input type="text" className={styles.inputField} placeholder="Name" required />
        )}

        <input type="email" className={styles.inputField} placeholder="Email" required />
        <input type="password" className={styles.inputField} placeholder="Password" required />

        <div className={styles.forgotPassword}>
          <p>Forgot your password?</p>
          {currentState === 'Login'
            ? <p onClick={() => setCurrentState('Sign Up')} className={styles.toggleText}>Create account</p>
            : <p onClick={() => setCurrentState('Login')} className={styles.toggleText}>Login Here</p>
          }
        </div>

        <button className={styles.submitButton}>
          {currentState === 'Sign Up' ? 'Create Account' : 'Sign In'}
        </button>
      </form>
    </div>
  );
};

export default Login;