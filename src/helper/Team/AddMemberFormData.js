export function buildAddMemberFormData({
    fullName,
    image,
    description,
    position
}) {
    const formData = new FormData();

    formData.append('full_name', fullName);
    formData.append('description', description);
    formData.append('position', position);

    if (image)
        formData.append('image', image);

    return formData;
}