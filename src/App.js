import React, { useReducer, useState, useRef } from "react";
import "./style.css";

const initialValues = {
  name: '',
  email: '',
  phone: ''
};

const basicInfoReducer = (state, action) => {
  switch (action.type) {
    case 'name':
      return {
        ...state,
        name: action.value
      }
      case 'email':
      return {
        ...state,
        email: action.value
      }
      case 'phone':
      return {
        ...state,
        phone: action.value
      }
      case 'reset':
      return {
        ...state,
        ...action.value
      }
    default:
      return state
  }
}

const BasicInfo = ({onChange, values}) => {
  return (
    <>
      <h2>Basic Info</h2>
      <input name="name" id="name" type="text" value={values.name} onChange={onChange}/>
      <input name="email" id="email" type="email" value={values.email} onChange={onChange} />
      <input name="phone" id="phone" type="phone" value={values.phone} onChange={onChange} />
    </>
  );
}

export default function App() {
  const [basicInfo, dispatch] = useReducer(basicInfoReducer, initialValues);
  const [submitValues, setSubmitValues] = useState(initialValues);
  const form = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitValues({
      name: basicInfo.name,
      email: basicInfo.email,
      phone: basicInfo.phone
    })

  };

  const handleInputChange = (e) => {
    dispatch({type: `${e.target.name}`, value: e.target.value});
  };

  const handleRestForm = () => {
    dispatch({type: 'reset', value: {name: '', email: '', phone: ''}});
    setSubmitValues(initialValues);
  }


  return (
    <div>
      <form onSubmit={handleSubmit} >
        <BasicInfo onChange={handleInputChange} values={basicInfo} />
        <input type="submit" />
        <input type="button" onClick={handleRestForm} value="Reset form" />
      </form>
      <div>
        <h2>Submit values</h2>
        <p>Name: {submitValues.name}</p>
        <p>Email: {submitValues.email}</p>
        <p>Phone: {submitValues.phone}</p>
      </div>
    </div>
  );
}
