import { useState } from "react";

export function useForgotPassword() {
    const [email, setEmail] = useState();
    const [code, setCode] = useState();
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState();

    return {
        email, setEmail, code, setCode, newPassword, setNewPassword, confirmNewPassword, setConfirmNewPassword,
    };
}