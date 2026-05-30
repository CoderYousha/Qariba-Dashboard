export function buildAddContactFormData ({
    facebook,
    tiktok,
    instagram,
    youtube
}){
    const formData = new FormData();

    formData.append('facebook', facebook);
    formData.append('tiktok', tiktok);
    formData.append('instagram', instagram);
    formData.append('youtube', youtube);

    return formData;
}