export function buildAddModelFormData ({
    fullName,
    image
}){
    const formData = new FormData();

    formData.append('full_name', fullName);

    if(image)
        formData.append('image', image);

    return formData;
}