import React from 'react'
import RegisterUser from '../../Components/Register';
import { registerService } from '../../Services/registerService';


const Register = () => {

const handleSubmit = (data) => {
registerService(data)

}
  return (
    <>
    <RegisterUser handleSubmit={handleSubmit}/>
    </>
  )
}

export default Register;