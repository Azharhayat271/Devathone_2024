import axios from '../../utils/axios/axiosInstance';

// Function to get all slots
export const getAllSlots = async () => {
    let resolved = {
        error: null,
        data: null,
    };

    try {
        const response = await axios({
            url: '/api/appointments/slots',
            method: 'GET',
        });
        resolved.data = response.data;
    } catch (err) {
        if (err && err.response && err.response.data && err.response.data.message) {
            resolved.error = err.response.data.message;
        } else {
            resolved.error = 'Something went wrong';
        }
    }

    return resolved;
};
