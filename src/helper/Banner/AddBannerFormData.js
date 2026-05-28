export function buildAddBannerFormData({
    title,
    description,
    image,
}) {
    const formData = new FormData();

    formData.append('title', title);
    formData.append('description', description);

    if (image) 
        formData.append('image', image);

    return formData;
}