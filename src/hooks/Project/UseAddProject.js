import { useState } from "react";

export function useAddProject (){
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [coverImage, setCoverImage] = useState('');
    const [clientName, setClientName] = useState('');
    const [projectUrl, setProjectUrl] = useState('');
    const [subCategoryId, setSubCategoryId] = useState('');

    return {
        title, setTitle, description, setDescription, coverImage, setCoverImage, clientName, setClientName,
        projectUrl, setProjectUrl, subCategoryId, setSubCategoryId,
    };
}