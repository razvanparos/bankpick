import React,{useState} from "react";
import FormRow from "../components/FormRow.tsx";
import ButtonComponent from "../components/ButtonComponent.tsx";
import { useNavigate } from "react-router-dom";
import NotificationActions from "../context/actions/notificationActions.ts";
import { loginUser } from "../services/authService.ts";


function Login() {
  const navigate = useNavigate();
  const initialLoginState={
    loginEmail:'',
    loginPassword:'',
    rememberMe: false,
    loading:false
  }
  const [loginState,setLoginState]=useState(initialLoginState)
  
  const changeLoginState = (fieldname,value)=>{
    setLoginState((prevState)=>({
      ...prevState,
      [fieldname]:value
    }))
  } 

  const handleLogin = async(e) => {
    e.preventDefault();
    changeLoginState('login',true)
    try{
      await loginUser(loginState)
      navigate('/')
    }catch(err){
      NotificationActions.showNotification(err,'danger')
    }
    changeLoginState('login',false)
  };

  return (
    <main className="flex flex-col items-center h-[100vh] p-4 mt-12">
      <form
        onSubmit={handleLogin}
        className="max-w-[400px] w-full flex flex-col gap-y-6 lg:mt-[105px]"
      >
        <h2 className="text-3xl">Sign In</h2>
        <FormRow type="email" labelText="Email address" onChangeFunction={(e)=>{changeLoginState('loginEmail',e.target.value)}}/>
        <FormRow type="password" labelText="Password" onChangeFunction={(e)=>{changeLoginState('loginPassword',e.target.value)}}/>
        <div className='flex items-center gap-x-2 text-sm'>
          <FormRow type="checkbox" onChangeFunction={()=>{changeLoginState('rememberMe',!loginState.rememberMe)}}/>
          <p>Remember me</p>
        </div>
        <ButtonComponent text={"Sign In"} type="primary" />
      </form>
       <p className="flex items-center justify-center text-sm w-full text-center text-gray">
          I'm a new user. &nbsp;
          <ButtonComponent text={'Sign up'} type={'text'} onClickFunction={()=>{navigate('/register')}}/>
        </p>
    </main>
  );
}

export default Login;
