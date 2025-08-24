import React, { useState } from 'react';

const Auth = ({ onLogin, onRegister }) => {
  const [isLogin, setIsLogin] = useState(true);
  
  return (
    <div className="auth-modal">
      <div className="auth-header">
        <h2>{isLogin ? 'Accedi' : 'Registrati'}</h2>
        <button onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? 'Non hai un account?' : 'Hai già un account?'}
        </button>
      </div>
      
      {isLogin ? (
        <LoginForm onLogin={onLogin} />
      ) : (
        <RegisterForm onRegister={onRegister} />
      )}
    </div>
  );
};

export default Auth;