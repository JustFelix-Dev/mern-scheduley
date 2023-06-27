import { Formik } from 'formik';
import React from 'react';
import * as Yup from 'yup';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { TextField } from '@mui/material';
import axios from '../services/api';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const initialEditSchema = Yup.object().shape({
    name: Yup.string().required('This is required!'),
    date: Yup.string().required('This is required!'),
    type: Yup.string().required('This is required!'),
    time: Yup.string().required('This is required!'),
    status: Yup.string().required('This is required!')
})

const initialCreateSchema = Yup.object().shape({
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

const TaskForm = ({ mode = 'edit', task }) => {

    const [ date,setDate ] = useState(null)
    const [ time,setTime ] = useState(null)
    const navigate = useNavigate()
  const types = ['General','Work','Ideas','Meetings','Shopping','Payments']

    const handleFormSubmit=(values,onSubmitProps)=>{
        if(mode === 'edit'){
            axios.put(`/task/${task._id}`, values).then((res)=>{
                navigate('/home')
            })
        }else{
            values.time = values.time.format('HH:mm')
            axios.post('task/create', values).then((res)=>{
                navigate('/home')
            })
        }

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
                      <form onClick={handleSubmit}>
                        <label htmlFor="taskName">Task Name:</label>
                          <input type="text" id='taskName' 
                          name='name' 
                          value={values.name}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={ touched.name && errors.name ? errors.name : '' } 
                           />
                           {touched.name && errors.name && (
                            <div className="error-message">{errors.name}</div>
                            )}
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Date"
                  value={mode ==="edit" ? dayjs(values.date || null) : values.date}
                  minDate={mode === "edit" ? null : dayjs()}
                  onChange={(newValue) => {
                    values.date = newValue.format("YYYY-MM-DD");
                    setDate(values.date);
                  }}
                  onBlur={handleBlur}
                  name="date"
                  renderInput={(params) => (
                    <TextField {...params} helperText="Select Date" />
                  )}
                  error={ touched.date && errors.date ? errors.date : '' } 
                />
                {touched.date && errors.date && (
                    <div className="error-message">{errors.date}</div>
                )}
              </LocalizationProvider>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <TimePicker
                  label="Time"
                  value={mode ==="edit" ? dayjs(`${values.date.split("T")[0]}T${values.time}` || null) : values.time}
                  onChange={(newValue) => {
                    values.time = newValue;
                    setTime(values.time);
                  }}
                  name="time"
                  onBlur={handleBlur}
                  error={ touched.time && errors.time ? errors.time : '' } 
                  renderInput={(params) => (
                    <TextField {...params} helperText="Set Time" />
                  )}
                />
                {touched.time && errors.time && (
                    <div className="error-message">{errors.time}</div>
                )}
              </LocalizationProvider>
              <label htmlFor="type">Select Type :</label>
              <select name="type" id="type" 
               value={values.type}
               onChange={handleChange}
               onBlur={handleBlur}
               error={ touched.type && errors.type ? errors.type : '' } 
                >
                  {
                    types.map((type,idx)=>(
                         <option value={type} key={`${idx}-${type}`}>{type}</option>
                    ))
                  }
                </select>
                {
                    mode === 'edit' && (
                       <>
                       <label htmlFor='status'>Status</label>
                        <select name="status" id="status"
                         value={values.status}
                         onChange={handleChange}
                         onBlur={handleBlur}
                         >
                            <option value="pending">Pending</option>
                            <option value="completed">Completed</option>
                        </select>
                       </> 
                    )
                }
                <button type='submit'>
                    {
                        mode === 'edit' ? 'Edit Task' : 'Create Task'
                    }
                </button>
                       </form>
                </div>
             )}
           </Formik>
  )
}

export default TaskForm
