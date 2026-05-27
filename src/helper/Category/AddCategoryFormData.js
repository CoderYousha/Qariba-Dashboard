export function buildAddCategoryFormData({
    category,
    service,
}) {
    const formData = new FormData();

    formData.append('category', category);
    formData.append('service', service);

    return formData;
}