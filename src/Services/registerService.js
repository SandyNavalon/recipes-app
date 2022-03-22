import axios from "axios"

const ENDPOINT = 'http://localhost:4000'

export async function registerService ( userData ){
    try{

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
