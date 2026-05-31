import { useContext, useEffect, useState } from "react";
import { useConstants } from "../../hooks/UseConstants";
import AuthContext from "../../context/AuthContext";
import { Box, Button, CircularProgress, Typography, useTheme } from "@mui/material";
import { useWaits } from "../../hooks/UseWait";
import { FormattedMessage } from "react-intl";
import { usePopups } from "../../hooks/UsePopups";
import AddIcon from '@mui/icons-material/Add';
import { useParams } from "react-router-dom";
import Fetch from "../../services/Fetch";
import { buildAddProjectImageFormData } from "../../helper/Project/AddProjectImageFormData";
import useSnackBar from "../../hooks/SnackBar/UseSnackBar";
import SnackbarAlert from "../../components/SnackBar";
import MediaCard from "../../components/MediaCard";
import AddProjectImage from "../../popup/project/AddProjectImage";
import AddProjectVideo from "../../popup/project/AddProjectVideo";
import ReactPlayer from 'react-player';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';

function ProjectVideos() {
    const { language, host } = useConstants();
    const { wait } = useContext(AuthContext);
    const { getWait, setGetWait } = useWaits();
    const { setPopup } = usePopups();
    const theme = useTheme();
    const [project, setProject] = useState('');
    const param = useParams();
    const { openSnackBar, type, message, setSnackBar, setOpenSnackBar } = useSnackBar();

    const getProject = async () => {
        let result = await Fetch(`${host}/api/projects/${param.id}`, 'GET');

        if (result.status === 200) {
            setProject(result.data.data.project);
        }

        setGetWait(false);
    }

    const deleteVideo = async (id) => {
        let result = await Fetch(`${host}/api/project-videos/${id}`, 'DELETE');

        if (result.status === 200) {
            setProject((prevProject) => {
                return {
                    ...prevProject,
                    videos: prevProject.videos.filter((video) => video.id !== id)
                }
            });
            setSnackBar('success', result.data.message);
        }
    }

    useEffect(() => {
        getProject();
    }, []);

    return (
        <>
            {
                wait ?
                    <Box className="w-full h-screen relative flex justify-center items-center" sx={{ float: language === 'en' && 'right' }}>
                        <CircularProgress className="!text-yellow-500" size={70} />
                    </Box>
                    :
                    <Box sx={{ backgroundColor: theme.palette.background.default }}>
                        <Box className="w-4/5 rounded-xl relative" dir={language === 'en' ? 'ltr' : "rtl"} sx={{ float: language === 'en' && 'right' }}>
                            {
                                getWait ?
                                    <Box className="w-full h-screen relative flex justify-center items-center">
                                        <CircularProgress className="!text-yellow-500" size={70} />
                                    </Box>
                                    :
                                    <Box sx={{ backgroundColor: theme.palette.background.default }} className="rounded-xl px-2">
                                        {/* Top Section */}
                                        <Box sx={{ backgroundColor: theme.palette.background.default }} className="flex justify-between items-center px-2">
                                            <Typography variant="h5" className="py-2 px-3 max-sm:!text-lg"><FormattedMessage id='videos' /></Typography>
                                            <Button variant="contained" onClick={() => setPopup('add', 'flex')} className="!bg-yellow-500">
                                                <AddIcon />
                                                <FormattedMessage id='add_video' />
                                            </Button>
                                        </Box>
                                        <Box className='grid grid-cols-3 mt-10 gap-x-1 max-sm:grid-cols-1'>
                                            {
                                                project.videos?.map((video, index) =>
                                                    <Box key={index} className='relative w-fit h-48'>
                                                        <ReactPlayer src={`${host}/${video.video}`} controls={true}
                                                            width="100%"
                                                            height="100%" />
                                                        <DeleteOutlinedIcon color="error" onClick={() => deleteVideo(video.id)} className="absolute top-1 left-2 cursor-pointer" />
                                                    </Box>
                                                )
                                            }
                                        </Box>
                                    </Box>
                            }
                        </Box>
                    </Box>
            }

            {/* Add New Project Video Popup */}
            <Box id="add" sx={{ right: language === 'en' && '0' }} className="w-4/5 h-screen fixed top-0 bg-gray-200 bg-opacity-5 hidden justify-center items-center">
                <AddProjectVideo setProject={setProject} onClickCancel={() => setPopup('add', 'none')} setSnackBar={setSnackBar} />
            </Box>

            {/* Snackbar Alert */}
            <SnackbarAlert open={openSnackBar} message={message} severity={type} onClose={() => setOpenSnackBar(false)} />
        </>
    );
}

export default ProjectVideos;