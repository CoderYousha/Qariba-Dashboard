export function buildAddProjectFormData({
    title,
    description,
    coverImage,
    clientName,
    projectUrl,
    categoryId
}) {
    const formData = new FormData();

    formData.append('title', title);
    formData.append('description', description);
    formData.append('client_name', clientName);
    formData.append('projectUrl', projectUrl);
    formData.append('category_id', categoryId);

    if (coverImage)
        formData.append('cover_image', coverImage);

    return  formData;
}