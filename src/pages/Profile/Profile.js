import { useContext, useEffect, useState } from "react";
import { useConstants } from "../../hooks/UseConstants";
import AuthContext from "../../context/AuthContext";
import { Box, Button, CircularProgress, TextField, Typography, useTheme } from "@mui/material";
import { useWaits } from "../../hooks/UseWait";
import { FormattedMessage } from "react-intl";
import { usePopups } from "../../hooks/UsePopups";
import AddIcon from '@mui/icons-material/Add';
import { useParams } from "react-router-dom";
import Fetch from "../../services/Fetch";
import { useAddProjectImage } from "../../hooks/Project/UseAddProjectImage";
import { buildAddProjectImageFormData } from "../../helper/Project/AddProjectImageFormData";
import useSnackBar from "../../hooks/SnackBar/UseSnackBar";
import SnackbarAlert from "../../components/SnackBar";
import MediaCard from "../../components/MediaCard";
import AddClient from "../../popup/client/AddClient";
import { useUpdateProfile } from "../../hooks/Profile/UseUpdateProfile";
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import { buildUpdateProfileFormData } from "../../helper/Profile/UpdateProfileFormData";
import UpdatePassword from "../../popup/profile/UpdatePassword";

function Profile() {
    const { language, host } = useConstants();
    const { wait, profile, setProfile } = useContext(AuthContext);
    const { sendWait, setSendWait } = useWaits();
    const { setPopup } = usePopups();
    const theme = useTheme();
    const { fullNamee, setFullName, email, setEmail, phone, setPhone, image, setImage } = useUpdateProfile();
    const { openSnackBar, type, message, setSnackBar, setOpenSnackBar } = useSnackBar();

    const resetValue = () => {
        setFullName(profile.full_name);
        setEmail(profile.email);
        setPhone(profile.phone);
        setImage(profile.image);
    }

    const updateProfile = async () => {
        setSendWait(true);

        const formData = buildUpdateProfileFormData({
            fullName: fullNamee,
            phone: phone,
            image: image
        });

        let result = await Fetch(`${host}/api/profile`, 'POST', formData);

        if (result.status === 200) {
            setSnackBar('success', result.data.message);
            setProfile(result.data.data.data);
        } else if (result.status === 422) {
            setSnackBar('error', result.data.errors[0]);
        }

        setSendWait(false);
    }

    useEffect(() => {
        if (profile)
            resetValue();
    }, [profile]);

    return (
        <>
            {
                wait ?
                    <Box className="w-full h-screen relative flex justify-center items-center" sx={{ float: language === 'en' && 'right' }}>
                        <CircularProgress className="!text-yellow-500" size={70} />
                    </Box>
                    :
                    <Box sx={{ backgroundColor: theme.palette.background.default }}>
                        <Box className="w-4/5 pt-10 rounded-xl relative" dir={language === 'en' ? 'ltr' : "rtl"} sx={{ float: language === 'en' && 'right' }}>
                            <Box className='w-3/4 mx-auto px-10 py-10 rounded-lg' sx={{ backgroundColor: theme.palette.background.paper }}>
                                <TextField variant="outlined" label={<FormattedMessage id="full_name" />} value={fullNamee} onChange={(e) => setFullName(e.target.value)} className="w-full" />
                                <TextField variant="outlined" label={<FormattedMessage id="phone" />} value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full !mt-10" />
                                <TextField variant="outlined" label={<FormattedMessage id="email" />} value={email} aria-readonly className="w-full !mt-10" />
                                <Box className="relative w-full h-32 bg-gray-200 rounded-xl mt-10 flex flex-col items-center justify-center cursor-pointer">
                                    <CloudUploadOutlinedIcon fontSize="large" className="" />
                                    <Typography variant="body1" className="text-gray-700"><FormattedMessage id="add_image" /></Typography>
                                    <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} className="w-full h-full opacity-0 absolute cursor-pointer" />
                                </Box>
                                <Box className='mt-10 text-center'>
                                    <Button onClick={updateProfile} variant="contained" color="success" className="w-1/3">
                                        {
                                            sendWait ?
                                                <CircularProgress size={20} className="" color="white" />
                                                :
                                                <FormattedMessage id="save" />
                                        }
                                    </Button>
                                    <Box className='mt-7 text-center'>
                                        <Typography onClick={() => setPopup('update_password', 'flex')} variant="body1" className="cursor-pointer w-fit !mx-auto"><FormattedMessage id="update_password" /></Typography>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
            }

            {/* Update Password Popup */}
            <Box id="update_password" sx={{ right: language === 'en' && '0' }} className="w-4/5 h-screen fixed top-0 bg-gray-200 bg-opacity-5 hidden justify-center items-center">
                <UpdatePassword setSnackBar={setSnackBar} onClickCancel={() => setPopup('update_password', 'none')} />
            </Box>

            {/* Snackbar Alert */}
            <SnackbarAlert open={openSnackBar} message={message} severity={type} onClose={() => setOpenSnackBar(false)} />
        </>
    );
}

export default Profile;