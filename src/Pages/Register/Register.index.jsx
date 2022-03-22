import React from 'react'
import RegisterUser from '../../Components/Register';
import { registerService } from '../../Services/registerService';


const Register = () => {

const handleSubmit = (data) => {
registerService(data)

}
  return (
    <>
    <h2>Registro de usuario</h2>
    <RegisterUser handleSubmit={handleSubmit}/>
    </>
  )
}

export default Register;