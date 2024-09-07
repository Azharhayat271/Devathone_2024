// apiUtils.js
import axios from '../../utils/axios/axiosInstance';

export const LoginAPI = async ({ name, username, gender, email, password, phoneNo }) => {
    let resolved = {
        error: null,
        data: null,
    };

    try {
        let res = await axios({
            url: '/api/users/register',
            method: 'POST',
            data: {
                name,
                username,
                gender,
                email,
                password,
                phoneNo
            },
        });
        resolved.data = res.data;
    } catch (err) {
        if (err && err.response && err.response.data && err.response.data.message) {
            resolved.error = err.response.data.message;
        } else {
            resolved.error = 'Something went wrong';
        }
    }

    return resolved;
};
