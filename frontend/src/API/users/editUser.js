import axios from '../../utils/axios/axiosInstance';

// Function to update user by ID
export const editUserAPI = async (userId, userData) => {
    let resolved = {
        error: null,
        data: null,
    };

    try {
        let res = await axios({
            url: `/api/users/update-user/${userId}`,
            method: 'PUT',
            data: userData, // Send the updated user data
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
