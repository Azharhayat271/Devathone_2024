// apiUtils.js
import axios from '../../utils/axios/axiosInstance';

// Function to delete a user by ID
export const deleteUserAPI = async (userId) => {
    let resolved = {
        error: null,
        data: null,
    };

    try {
        let res = await axios({
            url: `/api/users/delete-user/${userId}`,
            method: 'DELETE',
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
