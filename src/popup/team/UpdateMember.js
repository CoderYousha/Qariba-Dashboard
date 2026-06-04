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
import { useAddBanner } from "../../hooks/Banner/UseAddBanner";
import { buildAddBannerFormData } from "../../helper/Banner/AddBannerFormData";
import { useAddMember } from "../../hooks/Team/UseAddMember";
import { buildAddMemberFormData } from "../../helper/Team/AddMemberFormData";

function UpdateMember({ onClickCancel, setSnackBar, getMembers, member }) {
    const theme = useTheme();
    const { host, language } = useConstants();
    const { sendWait, setSendWait } = useWaits();
    const { fullName, setFullName, description, setDescription, image, setImage, position, setPosition } = useAddMember();

    const updateBanner = async () => {
        setSendWait(true);
        const formData = buildAddMemberFormData({
            fullName: fullName,
            description: description,
            image: image,
            position: position,
        });

        let result = await Fetch(`${host}/api/team/${member.id}`, 'POST', formData);

        if (result.status === 200) {
            setSnackBar('success', result.data.message);
            await getMembers();
            onClickCancel();
        } else if (result.status === 422) {
            setSnackBar('error', result.data.errors[0]);
        } else if (result.status === 400) {
            setSnackBar('error', result.data.error);
        }

        setSendWait(false);
    }

    const resetValue = () => {
        setFullName(member.full_name);
        setDescription(member.description);
        setPosition(member.position);
        setImage('');
    }

    useEffect(() => {
        if (member)
            resetValue();
    }, [member]);

    return (
        <Box sx={{ backgroundColor: theme.palette.background.paper }} className="shadow-lg w-3/5 h-fit rounded-3xl px-4 py-5 overflow-y-scroll none-view-scroll max-sm:w-4/5 max-sm:translate-x-0 max-sm:left-0 relative max-sm:overflow-y-scroll" dir={language === 'en' ? 'ltr' : "rtl"}>
            <Typography variant="h5" className="!font-semibold max-sm:!text-xl">
                <FormattedMessage id='update_banner' />
            </Typography>
            <CloseIcon onClick={() => { resetValue(); onClickCancel(); }} className="text-gray-700 cursor-pointer absolute top-5 left-5" fontSize="large" sx={{ left: language === 'en' && '90%' }}></CloseIcon>
            <Divider className="!my-5" />
            <Box>
                <Box className='flex flex-col justify-between mt-16 max-sm:flex-col'>
                    <TextField variant="outlined" label={<FormattedMessage id="full_name" />} className="w-full max-sm:w-full" value={fullName} onChange={(e) => setFullName(e.target.value)} />
                    <TextField variant="outlined" label={<FormattedMessage id="position" />} className="w-full !mt-5 max-sm:w-full max-sm:!mt-3" value={position} onChange={(e) => setPosition(e.target.value)} />
                </Box>
                <Box className='flex flex-col justify-between mt-16 max-sm:flex-col'>
                    <TextField multiline rows={3} variant="outlined" label={<FormattedMessage id="description" />} className="w-full !mt-5 max-sm:w-full max-sm:!mt-3" value={description} onChange={(e) => setDescription(e.target.value)} />
                </Box>
                <Box className="relative w-full h-32 bg-gray-200 rounded-xl mt-10 flex flex-col items-center justify-center cursor-pointer">
                    <CloudUploadOutlinedIcon fontSize="large" className="" />
                    <Typography variant="body1" className="text-gray-700"><FormattedMessage id="add_image" /></Typography>
                    <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} className="w-full h-full opacity-0 absolute cursor-pointer" />
                </Box>
                <Box className='mx-auto w-1/3 mt-10 max-sm:w-full'>
                    <Button onClick={updateBanner} variant='outlined' className='!rounded-full w-full !border-green-500 !bg-green-500 !text-white hover:!bg-white hover:!text-green-500'>
                        {
                            sendWait ?
                                <CircularProgress size={20} className="" color="white" />
                                :
                                <FormattedMessage id="update" />
                        }
                    </Button>
                </Box>
            </Box>
        </Box>
    );
}

export default UpdateMember;