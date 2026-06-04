export function buildAddProjectFormData({
    title,
    description,
    coverImage,
    clientName,
    projectUrl,
    subCategoryId
}) {
    const formData = new FormData();

    formData.append('title', title);
    formData.append('description', description);
    formData.append('client_name', clientName);
    formData.append('project_url', projectUrl);
    formData.append('sub_category_id', subCategoryId);

    if (coverImage)
        formData.append('cover_image', coverImage);

    return  formData;
}