import axios from 'axios';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/authContext';
import './login.scss';

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: undefined,
    password: undefined,
  });
  const navigate = useNavigate();
  const {isLoading, error, dispatch} = useContext(AuthContext);

  const handleChange = (e) => {
    setCredentials(prev => ({...prev, [e.target.id]: e.target.value}));
  }

  const handleClick = async (e) => {
    e.preventDefault();
    dispatch({type: 'LOGIN_START'});
    try {
      const response = await axios.post('/auth/login', credentials);
      if(response.data.isAdmin) {
        dispatch({type: 'LOGIN_SUCCESS', payload: response.data.details});
        navigate('/');
      } else {
        dispatch({type: 'LOGIN_FAILURE', payload: {message: 'You are not allowed!'}})
      }
    } catch (error) {
      dispatch({type: 'LOGIN_FAILURE', payload: error.response.data})
    }
  }
  return (
    <div className="login">
      <div className="lContainer">
        <input type="text" placeholder="username" id="username" onChange={handleChange} className="lInput" />
        <input type="password" placeholder="password" id="password" onChange={handleChange} className="lInput" />
        <button className="lButton" disabled={isLoading} onClick={handleClick}>Login</button>
        {error && <span>{error.message}</span>}
      </div>
    </div>
  )
}

export default Login