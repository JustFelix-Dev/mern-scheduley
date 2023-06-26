import { Formik } from 'formik';
import React from 'react';
import * as Yup from 'yup';
import dayjs from 'dayjs';
import axios from '../services/api';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const initialEditSchema = Yup.Object().shape({
    name: Yup.string().required('This is required!'),
    date: Yup.string().required('This is required!'),
    type: Yup.string().required('This is required!'),
    time: Yup.string().required('This is required!'),
    status: Yup.string().required('This is required!')
})

const initialCreateSchema = Yup.Object().shape({
    name: Yup.string().required('This is required!'),
    date: Yup.string().required('This is required!'),
    type: Yup.string().required('This is required!'),
    time: Yup.string().required('This is required!')
})


let initialValues = {
    name: '',
    type: '',
    date: dayjs().format('YYYY-MM-DD'),
    time: dayjs()
}
const TaskForm = ({ mode='edit',task }) => {

    const [ date,setDate ] = useState(null)
    const [ time,setTime ] = useState(null)

    const handleFormSubmit=(values,onSubmitProps)=>{

    }

  return (
           <Formik onSubmit={handleFormSubmit} 
           initialValues={ mode == 'create' ? initialValues : task}
           validationSchema={ mode == 'create' ? initialCreateSchema : initialEditSchema}>

             {({
                handleBlur,
                handleSubmit,
                handleChange,
                resetForm,
                values,
                errors,
                touched
             })=>(
                <div className="title">
                    <h2>{mode === 'create' ? 'Create a Task' : 'Edit a Task'}</h2>
                </div>
             )}
           </Formik>
  )
}

export default TaskForm
