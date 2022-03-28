import React from 'react'
import NavbarTwo from '../../Components/NavbarTwo/NavbarTwo';
import RegisterUser from '../../Components/Register';
import { registerService } from '../../Services/registerService';


const Register = () => {

const handleSubmit = (data) => {
registerService(data)

}
  return (
    <>
      <NavbarTwo/>
      <RegisterUser handleSubmit={handleSubmit}/>
    </>
  )
}

export default Register;