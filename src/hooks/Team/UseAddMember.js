import { useState } from "react";

export function useAddMember() {
    const [fullName, setFullName] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');
    const [position, setPosition] = useState('');

    return {
        fullName, setFullName, description, setDescription, image, setImage, position, setPosition
    };
}