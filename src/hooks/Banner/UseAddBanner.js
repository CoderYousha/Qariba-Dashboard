import { useState } from "react";

export function useAddBanner() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');

    return {
        title, setTitle, description, setDescription, image, setImage
    };
}