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

const TaskForm = ({ mode='edit',task }) => {
  return (
         <>
            
         </>
  )
}

export default TaskForm
