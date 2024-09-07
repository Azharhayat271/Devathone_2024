export const validate = (formData) => {
    const errors = {};
    if (!formData.name) errors.name = 'Name is required';
    if (!formData.username) errors.username = 'Username is required';
    if (!formData.gender) errors.gender = 'Gender is required';
    if (!formData.email) errors.email = 'Email is required';
    if (!formData.password) errors.password = 'Password is required';
    if (formData.password !== formData.confirmPassword) errors.confirmPassword = 'Passwords do not match';
    if (!formData.phoneNo) errors.phoneNo = 'Phone Number is required';
    return errors;
};
