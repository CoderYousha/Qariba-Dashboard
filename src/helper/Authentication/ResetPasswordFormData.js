export function buildResetPasswordFormData({
     newPassword,
     newPasswordConfirmation,
}) {
     const formData = new FormData();
     formData.append('new_password', newPassword);
     formData.append('new_password_confirmation', newPasswordConfirmation);
     return formData;
}