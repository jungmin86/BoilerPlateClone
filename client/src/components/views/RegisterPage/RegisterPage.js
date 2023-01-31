import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { registerUser } from '../../../_actions/user_action.js';
import { useNavigate } from 'react-router-dom';
import Auth from '../../../hoc/auth.js';

function RegisterPage() {

  const disaptch = useDispatch();
  const navigate = useNavigate();

  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [Name, setName] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");
  
  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value);
  }
  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value);
  }
  const onNameHandler = (event) => {
    setName(event.currentTarget.value);
  }
  const onConfirmPasswordHandler = (event) =>  {
    setConfirmPassword(event.currentTarget.value);
  }

  const onSubmit = (event) => {
    event.preventDefault(); //중요 -> 로그인을 할 때마다 페이지 새로고침 방지
    // console.log(Email);
    // console.log(Password);

    if(Password !== ConfirmPassword) {
      return alert("비밀번호를 다시 확인해주세요.");
    }
    let body = {
      email:Email,
      name: Name,
      password: Password
    }

    disaptch(registerUser(body))
      .then(response => {
        if(response.payload.success) {
          navigate('/login');
        } else {
          alert('회원가입 에러');
        }
      })

    
  }

  return (
    <div style={{
      display: 'flex', justifyContent: 'center', alignItems: 'center',
      width: '100%', height: '100vh'
    }}>
      <form style={{ display: 'flex', flexDirection: 'column'}}
        onSubmit={onSubmit}>
        <label>Email</label>
        <input type='email' value={Email} onChange={onEmailHandler} />

        <label>Name</label>
        <input type='text' value={Name} onChange={onNameHandler} />

        <label>Password</label>
        <input type='password' value={Password} onChange={onPasswordHandler} />

        <label>ConfirmPassword</label>
        <input type='password' value={ConfirmPassword} onChange={onConfirmPasswordHandler} />

        <br />
        <button type='submit'>
          Sign Up
        </button>

        
      </form>
    </div>
  )
}

export default Auth(RegisterPage, false);