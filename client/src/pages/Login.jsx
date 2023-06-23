import {Formik} from 'formik';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom'

const Login = () => {

    const initialSignUpValues = {
        name:"",
        email:"",
        password:"",
        picture: "",
    }

    const initialLogInValues = {
        email: "",
        password: ""
    }

    const signUpSchema = Yup.object().shape({
        name: Yup.string().required('This is required'),
        email: Yup.string().email('Not a Valid Email!').required('This is required'),
        password: Yup.string().required('This is required')
    })

    const logInSchema = Yup.object().shape({
        email:Yup.string().email("Invalid Email").required("This is required"),
        password: Yup.string().required('This is required')
    })

    const LogIn =()=>{
        const [ page, setPage ] = useState('login')
        const isLogin = page === 'login'
        const isSignup = page === 'signup'
        const dispatch = useDispatch()
        const navigate = useNavigate()
    }
    return ( 
           <>

           </>
     );
}
 
export default Login;