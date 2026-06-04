import { useState } from "react";

export function useUser (){
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [image, setImage] = useState('');

    return {fullName, setFullName, email, setEmail, phone, setPhone, image, setImage};
}