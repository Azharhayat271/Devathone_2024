// apiUtils.js
import axios from "../../utils/axios/axiosInstance";

export const RegisterAPI = async ({
  name,
  username,
  gender,
  email,
  password,
  phoneNo,
  speciality,
  mmedicalLicense,
}) => {
  let resolved = {
    error: null,
    data: null,
  };

  try {
    let res = await axios({
      url: "/api/users/registerdoctor",
      method: "POST",
      data: {
        name,
        username,
        gender,
        email,
        password,
        phoneNo,
        speciality,
        mmedicalLicense,
      },
    });
    resolved.data = res.data;
  } catch (err) {
    if (err && err.response && err.response.data && err.response.data.message) {
      resolved.error = err.response.data.message;
    } else {
      resolved.error = "Something went wrong";
    }
  }

  return resolved;
};
