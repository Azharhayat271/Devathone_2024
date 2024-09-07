// deleteAppointmentById.js
import axios from '../../utils/axios/axiosInstance';

export const deleteAppointmentById = async (appointmentId) => {
    let resolved = {
        error: null,
        data: null,
    };

    try {
        let res = await axios({
            url: `/api/appointments/${appointmentId}`,
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
