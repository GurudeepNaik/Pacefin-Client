import React,{useState} from 'react'
import { Link } from "react-router-dom";
import { useAPI } from "../context/context";
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const Register = () => {
  const { register } = useAPI();
  const [login, setLogin] = useState({
    username:"",
    email: "",
    password: "",
    confirmPassword:"",
    showPassword:false,
    showConfirmPassword:false
  });

  const handleChange = (prop) => (event) => {
    setLogin({ ...login, [prop]: event.target.value });
  };

  const UserLogin = () => {
    if(login.password===login.confirmPassword){
      register(login);
    }else{
    alert("Passwords Dont Match");
    }
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
    <h1 className='login-heading logout-heading'>Welcome</h1>
        <p className='login-p'>Please Create An Account to Check Out Blogs</p>
      <div className="login-container">
      <form onSubmit={(e) => e.preventDefault()}>
      <div className='login-inputs'>
      <TextField sx={{ m: 1, width: '90%' }} id="outlined-search" label="User Name" type="search" value={login.username} onChange={handleChange('username')} />
      <TextField sx={{ m: 1, width: '90%' }} id="outlined-search" label="Email" type="search" value={login.email} onChange={handleChange('email')} />
      <FormControl sx={{ m: 1, width: '90%' }} variant="outlined">
        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
        <OutlinedInput id="outlined-adornment-password" type={login.showPassword ? 'text' : 'password'} value={login.password} onChange={handleChange('password')} endAdornment={<InputAdornment position="end"><IconButton aria-label="toggle password visibility" onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword} edge="end"> {login.showPassword ? <VisibilityOff /> : <Visibility />}</IconButton></InputAdornment>} label="Password" />
      </FormControl>
      <FormControl sx={{ m: 1, width: '90%' }} variant="outlined">
        <InputLabel htmlFor="outlined-adornment-password">Confirm Password</InputLabel>
        <OutlinedInput id="outlined-adornment-password" type={login.showConfirmPassword ? 'text' : 'password'} value={login.confirmPassword} onChange={handleChange('confirmPassword')} endAdornment={<InputAdornment position="end"><IconButton aria-label="toggle password visibility" onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword} edge="end"> {login.showConfirmPassword ? <VisibilityOff /> : <Visibility />}</IconButton></InputAdornment>} label="Confirm Password" />
      </FormControl>
      </div>
      <div className='login-create-forgot'>
      <Link id="signup" className='register' to="/">Already Registered? - SignIn</Link>
      </div>
      <div className='login-signin-btns'>
        <button onClick={UserLogin} className="signIn">Register</button>
      </div>
      </form>
    </div>
    </div>
  </div>
  )
}

export default Register