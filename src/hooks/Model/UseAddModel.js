import { useState } from "react";

export function useAddModel (){
    const [fullName, setFullName] = useState();
    const [image, setImage] = useState();

    return {
        fullName, setFullName, image, setImage
    };
}