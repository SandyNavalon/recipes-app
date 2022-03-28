import React from "react";
import { useFormik } from 'formik';
import { useNavigate } from "react-router-dom";

import './register.scss'

function RegisterUser({handleSubmit}) {
    const validate = (values) => {
        const errors = {};

        if (!values.email) {
            errors.email = "Requerido";
        } else if (values.email.length < 4) {
            errors.email = "Debe tener más de 5 caracteres";
        }

        if (!values.password) {
            errors.password = "Requerido";
        } else if (values.password.length < 8) {
            errors.password = "Debes escribir un número, una letra mayúscula, una minúscula y un símbolo, más de 8 caracteres";
        } else if (values.password === "12345678") {
            errors.password = "Eso no vale";
        }

        if (!values.passwordVerification) {
            errors.passwordVerification = "Requerido";
        } else if (values.passwordVerification !== values.password) {
            errors.passwordVerification = "Las contraseñas no coinciden";
        }

        return errors;
    };

    let navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            email: "",
            user: "",
            password: "",
            passwordVerification: "",
        },
        validate,
        //el boton onsubmit nos recoge los valores y los manda a servidor
        // pero hoy solo los sacamos en un alert.
        onSubmit: (values) => {
            handleSubmit({...values /*, image:"https://cambodiaict.net/wp-content/uploads/2019/12/computer-icons-user-profile-google-account-photos-icon-account-150x150.jpg"*/});
            navigate('/login')
            // alert(JSON.stringify(values, null, 2));
        },
    }

    );

    return (
        <div className="register">
            <form className="register__form" onSubmit={formik.handleSubmit}>
                <div className="register__form-items">
                    {/* <label htmlFor="email">Email</label> */}
                    <input
                        className="register__form-items-input"
                        id="email"
                        name="email"
                        type="email"
                        placeholder="email"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.email}
                    />
                    {formik.touched.email && formik.errors.email ? (
                        <div>
                            <p>{formik.errors.email}</p>
                        </div>
                    ) : null}
                </div>

                <div className="register__form-items">
                    {/* <label htmlFor="user">Usuario</label> */}
                    <input
                        className="register__form-items-input"
                        id="user"
                        name="user"
                        type='user'
                        placeholder="nombre de usuario"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.user}
                    />
                </div>


                <div className="register__form-items">
                    {/* <label htmlFor="password">Contraseña</label> */}
                    <input
                        className="register__form-items-input"
                        id="password"
                        name="password"
                        type="password"
                        placeholder="contraseña"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.password}
                    />
                    {formik.touched.password && formik.errors.password ? (
                        <div>
                            <p>{formik.errors.password}</p>
                        </div>
                    ) : null}
                </div>

                <div className="register__form-items">
                    {/* <label htmlFor="passwordVerification">Repetir contraseña</label> */}
                    <input
                        className="register__form-items-input"
                        id="passwordVerification"
                        name="passwordVerification"
                        type="password"
                        placeholder="repetir contraseña"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.passwordVerification}
                    />
                    {formik.touched.passwordVerification && formik.errors.passwordVerification ? (
                        <div>
                            <p>{formik.errors.passwordVerification}</p>
                        </div>
                    ) : null}
                </div>

                <button className="register__form-items-btn" type="submit">Registro</button>

            </form>
        </div>
    );
}

export default RegisterUser;
