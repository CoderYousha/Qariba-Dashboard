import { Box, Button, Checkbox, CircularProgress, Divider, FormControlLabel, TextField, Typography, useTheme } from "@mui/material";
import { FormattedMessage } from "react-intl";
import { useConstants } from "../../hooks/UseConstants";
import { useWaits } from "../../hooks/UseWait";
import CloseIcon from '@mui/icons-material/Close';
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import Fetch from "../../services/Fetch";
import { buildAddCategoryFormData } from "../../helper/Category/AddCategoryFormData";
import { AsyncPaginate } from "react-select-async-paginate";
import { useEffect, useState } from "react";
import { useAddProject } from "../../hooks/Project/UseAddProject";
import { buildAddProjectFormData } from "../../helper/Project/AddProjectFormData";
import { useSearch } from "../../hooks/Search/UseSearch";

function AddProject({ onClickCancel, setSnackBar, setProjects }) {
    const theme = useTheme();
    const { host, language } = useConstants();
    const { sendWait, setSendWait, getWait, setGetWait } = useWaits();
    const { title, setTitle, description, setDescription, coverImage, setCoverImage, clientName, setClientName, projectUrl, setProjectUrl, categoryId, setCategoryId } = useAddProject();
    const [categories, setCategories] = useState([]);
    const {search, setSearch} = useSearch();

    const getCategories = async () => {
        let result = await Fetch(`${host}/api/categories?search=${search}`, 'GET', null);
        if (result.status === 200) {
            setCategories(result.data.data);
        }

        setGetWait(false);
    }

    const addProject = async () => {
        setSendWait(true);
        const formData = buildAddProjectFormData({
            title: title,
            description: description,
            coverImage: coverImage,
            projectUrl: projectUrl,
            clientName: clientName,
            categoryId: categoryId,
        });

        let result = await Fetch(`${host}/api/projects`, 'post', formData);

        if (result.status === 201) {
            setSnackBar('success', <FormattedMessage id="added_success" />);
            setProjects((prevProjects) => [result.data.data.project, ...prevProjects]);
            onClickCancel();
        } else if (result.status === 422) {
            setSnackBar('error', result.data.errors[0]);
        } else if (result.status === 400) {
            setSnackBar('error', result.data.error);
        }

        setSendWait(false);
    }

    const resetValue = () => {
        setTitle('');
        setDescription('');
        setCoverImage('');
        setClientName('');
        setProjectUrl('');
        setCategoryId('');
    }

    useEffect(() => {
        getCategories();
    }, []);

    return (
        <Box sx={{ backgroundColor: theme.palette.background.paper }} className="shadow-lg w-3/5 h-screen rounded-3xl px-4 py-5 overflow-y-scroll none-view-scroll max-sm:w-4/5 max-sm:translate-x-0 max-sm:left-0 relative max-sm:overflow-y-scroll" dir={language === 'en' ? 'ltr' : "rtl"}>
            <Typography variant="h5" className="!font-semibold max-sm:!text-xl">
                <FormattedMessage id='add_project' />
            </Typography>
            <CloseIcon onClick={() => { resetValue(); onClickCancel(); }} className="text-gray-700 cursor-pointer absolute top-5 left-5" fontSize="large" sx={{ left: language === 'en' && '90%' }}></CloseIcon>
            <Divider className="!my-5" />
            <Box>
                <Box className='flex flex-col justify-between mt-16 max-sm:flex-col'>
                    <TextField variant="outlined" label={<FormattedMessage id="title" />} className="w-full max-sm:w-full" value={title} onChange={(e) => setTitle(e.target.value)} />
                    <TextField multiline rows={3} variant="outlined" label={<FormattedMessage id="description" />} className="w-full !mt-5 max-sm:w-full max-sm:!mt-3" value={description} onChange={(e) => setDescription(e.target.value)} />
                </Box>
                <Box className='flex flex-col justify-between mt-5 max-sm:flex-col'>
                    <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)} className="w-full py-2 outline-none rounded-md border border-gray-300 max-sm:w-full">
                        <option value='' disabled selected><FormattedMessage id="category" /></option>
                        {
                            categories.map ((category, index) =>
                                <option value={category.id} key={index}>{category.category}</option>
                            )
                        }
                    </select>
                    <TextField variant="outlined" label={<FormattedMessage id="client_name" />} className="w-full !mt-5 max-sm:w-full max-sm:!mt-3" value={clientName} onChange={(e) => setClientName(e.target.value)} />
                </Box>
                <Box className='flex flex-col justify-between mt-16 max-sm:flex-col'>
                    <TextField variant="outlined" label={<FormattedMessage id="project_url" />} className="w-full !mt-5 max-sm:w-full max-sm:!mt-3" value={projectUrl} onChange={(e) => setProjectUrl(e.target.value)} />
                </Box>
                <Box className="relative w-full h-32 bg-gray-200 rounded-xl mt-10 flex flex-col items-center justify-center cursor-pointer">
                    <CloudUploadOutlinedIcon fontSize="large" className="" />
                    <Typography variant="body1" className="text-gray-700"><FormattedMessage id="add_cover_image" /></Typography>
                    <input type="file" accept="image/*" onChange={(e) => setCoverImage(e.target.files[0])} className="w-full h-full opacity-0 absolute cursor-pointer" />
                </Box>
                <Box className='mx-auto w-1/3 mt-10 max-sm:w-full'>
                    <Button onClick={addProject} variant='outlined' className='!rounded-full w-full !border-green-500 !bg-green-500 !text-white hover:!bg-white hover:!text-green-500'>
                        {
                            sendWait ?
                                <CircularProgress size={20} className="" color="white" />
                                :
                                <FormattedMessage id="add" />
                        }
                    </Button>
                </Box>
            </Box>
        </Box>
    );
}

export default AddProject;