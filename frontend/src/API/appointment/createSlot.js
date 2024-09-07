import axios from '../../utils/axios/axiosInstance';

// Function to create a new slot
export const createSlot = async (slotData) => {
    let resolved = {
        error: null,
        data: null,
    };

    try {
        const response = await axios({
            url: '/api/appointments/slots',
            method: 'POST',
            data: slotData,
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
