import React from "react";
import { useFormik } from 'formik';
import { useNavigate } from "react-router-dom";

function RegisterUser({handleSubmit}) {
    const validate = (values) => {
        const errors = {};

        if (!values.email) {
            errors.email = "Required";
        } else if (values.email.length < 4) {
            errors.email = "Must be 5 characters or more";
        }

        if (!values.password) {
            errors.password = "Required";
        } else if (values.password.length < 8) {
            errors.password = "Must be 8 characters or more";
        } else if (values.password === "12345678") {
            errors.password = "Must not be 12345678 !!!";
        }

        if (!values.passwordVerification) {
            errors.passwordVerification = "Required";
        } else if (values.passwordVerification !== values.password) {
            errors.passwordVerification = "Second password doesn't match";
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
                <div className="register__form-email">
                    <label htmlFor="email">Email</label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.email}
                    />
                    {formik.touched.email && formik.errors.email ? (
                        <div>{formik.errors.email}</div>
                    ) : null}
                </div>

                <div className="register__form-user">
                    <label htmlFor="user">Usuario</label>
                    <input
                        id="user"
                        name="user"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.user}
                    />
                </div>


                <div className="register__form-password">
                    <label htmlFor="password">Contraseña</label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.password}
                    />
                    {formik.touched.password && formik.errors.password ? (
                        <div>{formik.errors.password}</div>
                    ) : null}
                </div>

                <div className="register__form-passwordRepit">
                    <label htmlFor="passwordVerification">Repetir contraseña</label>
                    <input
                        id="passwordVerification"
                        name="passwordVerification"
                        type="password"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.passwordVerification}
                    />
                    {formik.touched.passwordVerification && formik.errors.passwordVerification ? (
                        <div>{formik.errors.passwordVerification}</div>
                    ) : null}
                </div>

                <button className="register__form-btn" type="submit">Registro</button>

            </form>
        </div>
    );
}

export default RegisterUser;
