import { useState } from "react";

export function useUpdateProfile() {
    const [fullNamee, setFullName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [image, setImage] = useState('');

    return {
        fullNamee, setFullName, phone, setPhone, email, setEmail, image, setImage,
    };
}