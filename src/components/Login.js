import React,{useState} from 'react'
import { Link, useNavigate } from "react-router-dom";
import { useAPI } from "../context/context";
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const Login = () => {
  const { loginUser, signInWithGitHub, signInWithGoogle } = useAPI();
  const [login, setLogin] = useState({
    email: "",
    password: "",
    showPassword:false
  });

  const handleChange = (prop) => (event) => {
    setLogin({ ...login, [prop]: event.target.value });
  };

  const UserLogin = () => {
    loginUser(login);
  };

  const handleClickShowPassword = () => {
    setLogin({
      ...login,
      showPassword: !login.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <div>
      <div className='loginContainer'>
        <h1 className='login-heading'>Welcome Bardeen</h1>
        <p className='login-p'>Lets Go Into Launch Your Automations</p>
        <div className="login-container">
        <form onSubmit={(e) => e.preventDefault()}>
        <div className='login-inputs'>
        <TextField sx={{ m: 1, width: '90%' }} id="outlined-search" label="Email" type="search" value={login.email} onChange={handleChange('email')} />
        <FormControl sx={{ m: 1, width: '90%' }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
          <OutlinedInput id="outlined-adornment-password" type={login.showPassword ? 'text' : 'password'} value={login.password} onChange={handleChange('password')} endAdornment={<InputAdornment position="end"><IconButton aria-label="toggle password visibility" onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword} edge="end"> {login.showPassword ? <VisibilityOff /> : <Visibility />}</IconButton></InputAdornment>} label="Password" />
        </FormControl>
        </div>
        <div className='login-create-forgot'>
        <Link id="signup" to="/register">Create Account</Link>
        <p>Forgot Password?</p>
        </div>
        <div className='login-signin-btns'>
          <button onClick={UserLogin} className="signIn">Sign In</button>
          <button type="button" class="login-with-google-btn" onClick={ signInWithGoogle } >Sign in with Google</button>
          <button type="button" class="login-with-google-btn" id='login-with-gitHub-btn' onClick={ signInWithGitHub } >SignIn With GitHub</button>
        </div>
        </form>
      </div>
      </div>
    </div>
  )
}

export default Login