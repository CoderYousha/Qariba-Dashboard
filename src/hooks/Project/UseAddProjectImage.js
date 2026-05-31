import { useState } from "react";

export function useAddProjectImage () {
    const [image, setImage] = useState('');
    const [sortOrder, setSortOrder] = useState('');

    return {
        image, setImage, sortOrder, setSortOrder,
    };
}