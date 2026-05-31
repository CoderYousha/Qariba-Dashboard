export function buildAddProjectImageFormData ({
    image,
    sortOrder
}) {
    const formData = new FormData();

    formData.append('image', image);
    formData.append('sort_order', sortOrder);

    return formData;
}