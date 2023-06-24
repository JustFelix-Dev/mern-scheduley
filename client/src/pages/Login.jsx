import {Formik} from 'formik';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import Dropzone  from "react-dropzone";
import axios from '../services/api';
import { setLogin } from '../features/user/userSlice';



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


const Login = () => {
              
        const [ page, setPage ] = useState('signup');
        const isLogIn = page === 'login';
        const isSignUp = page === 'signup';
        const dispatch = useDispatch();
        const navigate = useNavigate();

        const handleLogin =(values,onSubmitProps)=>{
             axios.post('/auth/login', values)
             .then((res)=>{
                onSubmitProps.resetForm()
                dispatch(setLogin(res.data.user))
                navigate('/home')
             })
        }
        
        const handleSignUp=(values,onSubmitProps)=>{
            let formData = new FormData()
            for(const property of Object.keys(values)){
                formData.append(property, values[property])
            }
            axios.post('/auth/signup',formData)
            .then((res)=>{
                onSubmitProps.resetForm()
                setPage('login')
            })
        
            //  axios.post('/auth/signup',)
        }
        
        const handleForm = (values,onSubmitProps)=>{
          if(isLogIn) handleLogin(values,onSubmitProps)
          if(isSignUp) handleSignUp(values,onSubmitProps)
        }
        

    return ( 
             <Formik
             initialValues={isLogIn ? initialLogInValues : initialSignUpValues}
             validationSchema={ isLogIn ? logInSchema : signUpSchema}
             onSubmit={handleForm} >
               {(
                   {handleSubmit,
                   handleBlur,
                   touched,
                   setFieldValue,
                   resetForm,
                   values,
                   handleChange,
                   errors}

               )=>(
                   <div className="form__wrapper">
                    <h1>Welcome to Scheduley</h1>
                      <form onSubmit={handleSubmit}>
                            
                                <div className="user__inputs">
                                  {
                                    isSignUp && (
                                        <>
                                        <label htmlFor='name'>Name:</label><br/>
                                        <input type='text' name='name'
                                         value={values.name} 
                                         onChange={handleChange}
                                         onBlur={handleBlur} 
                                         error={ touched.name && errors.name ? errors.name : '' } 
                                          /> 
                                          {touched.name && errors.name && (
                                                <div className="error-message">{errors.name}</div>
                                                )}
                                          <br />
          
                                          <Dropzone multiple={false} acceptedFiles=".jpg, .png"
                                                    onDrop={(acceptedFiles)=>{
                                                      setFieldValue('picture', acceptedFiles[0]);
                                                    }}>
                                             {({ getRootProps, getInputProps})=>(
                                                 <div className="picture"{...getRootProps()} style={{border:"1px solid black",width:"40rem",padding:"1rem"}}>
                                                   <input  {...getInputProps()} />
                                                   {!values.picture ? (<span>Add a Picture</span>) : (<span>{values.picture.name}</span>)} 
                                                 </div>
                                             )}
                                          </Dropzone>
                                          </>
                                    )
                                  }
                            
                              <label htmlFor='email'>Email:</label><br/>
                              <input type='text' name='email' 
                              value={values.email} 
                              onChange={handleChange} 
                              onBlur={handleBlur}
                              error={ touched.email && errors.email ? errors.email : '' } 
                              /> 
                              {touched.email && errors.email && (
                                <div className="error-message">{errors.email}</div>
                                )}
                              <br />

                            <label htmlFor='password'>Password:</label><br/>
                              <input type='text' name='password'
                               value={values.password} 
                               onChange={handleChange}
                                onBlur={handleBlur}
                                 error={ touched.password && errors.password? errors.password:'' } 
                                />
                                 {touched.password && errors.password && (
                                <div className="error-message">{errors.password}</div>
                                )}
                              <button type='submit'>{isLogIn ? 'Login' : 'SignUp'}</button>
                              <span onClick={()=>{setPage(isLogIn ? 'signup' : 'login');resetForm()}}>
                                  {
                                    isLogIn ? (<span>Not a User, go to SignUp</span>) :(<span>Already a user, go to Login</span>)
                                  }
                              </span>
                            </div>
                      </form>
                   </div>
                 
                   )
                   }
             </Formik>
     );
}
 
export default Login;