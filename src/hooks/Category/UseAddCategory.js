import { useState } from "react";

export function useAddCategory(){
    const [catgory, setCatgory] = useState('');
    const [service, setService] = useState('');

    return {
        catgory, setCatgory, service, setService,
    };
}