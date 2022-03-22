import axios from "axios"

const ENDPOINT = 'http://localhost:4000'

export async function registerService ( userData ){
    try{

        // const formData = new FormData()
        // console.log('userData- Service:', userData);

        // formData.append('email', userData.email)
        // formData.append('user', userData.user)
        // formData.append('password', userData.password)
        // formData.append('passwordVerification', userData.passwordVerification)

        const response = await axios({
            url:`${ENDPOINT}/user/register`,
            method: 'POST',
            data: userData,

        })
        return response

    } catch(error){
        console.log(error);
    }
}
