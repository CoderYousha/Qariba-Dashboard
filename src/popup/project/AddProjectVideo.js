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
import { buildAddProjectImageFormData } from "../../helper/Project/AddProjectImageFormData";
import { useAddProjectImage } from "../../hooks/Project/UseAddProjectImage";
import { useParams } from "react-router-dom";

function AddProjectVideo({ onClickCancel, setSnackBar, setProject }) {
    const theme = useTheme();
    const { host, language } = useConstants();
    const { sendWait, setSendWait, getWait, setGetWait } = useWaits();
    const { search, setSearch } = useSearch();
    const [video, setVideo] = useState('');
    const param = useParams();

    const addVideo = async () => {
        setSendWait(true);

        const formData = new FormData();

        formData.append('video', video);

        let result = await Fetch(`${host}/api/project-videos/${param.id}`, 'POST', formData);

        if (result.status === 201) {
            setSnackBar('success', result.data.message);
            setProject((prevProject) => {
                return {
                    ...prevProject,
                    videos: [
                        ...prevProject.videos,
                        result.data.data
                    ]
                }
            });

            resetValue();
            onClickCancel();
        }

        setSendWait(false);
    }

    const resetValue = () => {
        setVideo('');
    }

    return (
        <Box sx={{ backgroundColor: theme.palette.background.paper }} className="shadow-lg w-3/5 h-fit rounded-3xl px-4 py-5 overflow-y-scroll none-view-scroll max-sm:w-4/5 max-sm:translate-x-0 max-sm:left-0 relative max-sm:overflow-y-scroll" dir={language === 'en' ? 'ltr' : "rtl"}>
            <Typography variant="h5" className="!font-semibold max-sm:!text-xl">
                <FormattedMessage id='add_video' />
            </Typography>
            <CloseIcon onClick={() => { resetValue(); onClickCancel(); }} className="text-gray-700 cursor-pointer absolute top-5 left-5" fontSize="large" sx={{ left: language === 'en' && '90%' }}></CloseIcon>
            <Divider className="!my-5" />
            <Box>
                <Box className="relative w-full h-32 bg-gray-200 rounded-xl mt-10 flex flex-col items-center justify-center cursor-pointer">
                    <CloudUploadOutlinedIcon fontSize="large" className="" />
                    <Typography variant="body1" className="text-gray-700"><FormattedMessage id="add_video" /></Typography>
                    <input type="file" accept="video/*" onChange={(e) => setVideo(e.target.files[0])} className="w-full h-full opacity-0 absolute cursor-pointer" />
                </Box>
                <Box className='mx-auto w-1/3 mt-10 max-sm:w-full'>
                    <Button onClick={addVideo} variant='outlined' className='!rounded-full w-full !border-green-500 !bg-green-500 !text-white hover:!bg-white hover:!text-green-500'>
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

export default AddProjectVideo;