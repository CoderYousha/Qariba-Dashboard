export function buildUpdateProfileFormData ({
    fullName,
    phone,
    image
}){
    const formData = new FormData();

    formData.append('full_name', fullName);
    formData.append('phone', phone);

    if(image)
        formData.append('image', image);

    return formData;
}