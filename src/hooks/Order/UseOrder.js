import { useState } from "react";

export function useOrder (){
    const [id, setId] = useState('');
    const [description, setDescription] = useState('');
    const [service, setService] = useState('');
    const [category, setCategory] = useState('');
    const [subCategory, setSubCategory] = useState('');

    return {id, setId, description, setDescription, service, setService, category, setCategory, subCategory,
        setSubCategory,
    };
}