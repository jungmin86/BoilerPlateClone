import React, {useEffect} from 'react';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Auth from '../../../hoc/auth.js';

function LandingPage() {
  const navigate = useNavigate();

  useEffect(() => {
    Axios.get('/api/hello')
      .then(response => {
        if(response.data)
        console.log(response.data);
      })
  }, [])

  const onClickHandler = () => {
    Axios.get('/api/users/logout')
      .then(response => {
        // console.log(response.data)
        if(response.data.logoutSuccess) {
          navigate('/login');
        } else {
          alert('로그아웃 실패 ');
        }
      })
  }  
  return (
    <div style={{
      display: 'flex', justifyContent: 'center', alignItems: 'center',
      width: '100%', height: '100vh'
    }}>
      <h2>시작 페이지</h2>

      <button onClick={onClickHandler}>
        로그아웃
      </button>
      </div>
  )
}

export default Auth(LandingPage, null);