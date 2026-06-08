export function buildAddContactFormData ({
    facebook,
    tiktok,
    instagram,
    youtube,
    email,
    whatsapp,
}){
    const formData = new FormData();

    formData.append('facebook', facebook);
    formData.append('tiktok', tiktok);
    formData.append('instagram', instagram);
    formData.append('youtube', youtube);
    formData.append('email', email);
    formData.append('whatsapp', whatsapp);

    return formData;
}