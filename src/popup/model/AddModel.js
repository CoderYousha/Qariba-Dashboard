import { Box, Button, Checkbox, CircularProgress, Divider, FormControlLabel, TextField, Typography, useTheme } from "@mui/material";
import { FormattedMessage } from "react-intl";
import { useConstants } from "../../hooks/UseConstants";
import { useWaits } from "../../hooks/UseWait";
import CloseIcon from '@mui/icons-material/Close';
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import Fetch from "../../services/Fetch";
import { buildAddCategoryFormData } from "../../helper/Category/AddCategoryFormData";
import { AsyncPaginate } from "react-select-async-paginate";
import { useState } from "react";
import { useAddBanner } from "../../hooks/Banner/UseAddBanner";
import { buildAddBannerFormData } from "../../helper/Banner/AddBannerFormData";
import { useAddMember } from "../../hooks/Team/UseAddMember";
import { buildAddMemberFormData } from "../../helper/Team/AddMemberFormData";
import { useAddModel } from "../../hooks/Model/UseAddModel";
import { buildAddModelFormData } from "../../helper/Model/AddModelFormData";

function AddModel({ onClickCancel, setSnackBar, setModels }) {
    const theme = useTheme();
    const { host, language } = useConstants();
    const { sendWait, setSendWait } = useWaits();
    const { fullName, setFullName, image, setImage } = useAddModel();

    const addModel = async () => {
        setSendWait(true);
        const formData = buildAddModelFormData({
            fullName: fullName,
            image: image,
        });

        let result = await Fetch(`${host}/api/models`, 'POST', formData);

        if (result.status === 201) {
            setSnackBar('success', result.data.message);
            setModels((prevModels) => [result.data.data.model, ...prevModels]);
            onClickCancel();
        } else if (result.status === 422) {
            setSnackBar('error', result.data.errors[0]);
        } else if (result.status === 400) {
            setSnackBar('error', result.data.error);
        }

        setSendWait(false);
    }

    const resetValue = () => {
        setFullName('');
        setImage('');
    }

    return (
        <Box sx={{ backgroundColor: theme.palette.background.paper }} className="shadow-lg w-3/5 h-fit rounded-3xl px-4 py-5 overflow-y-scroll none-view-scroll max-sm:w-4/5 max-sm:translate-x-0 max-sm:left-0 relative max-sm:overflow-y-scroll" dir={language === 'en' ? 'ltr' : "rtl"}>
            <Typography variant="h5" className="!font-semibold max-sm:!text-xl">
                <FormattedMessage id='add_model' />
            </Typography>
            <CloseIcon onClick={() => { resetValue(); onClickCancel(); }} className="text-gray-700 cursor-pointer absolute top-5 left-5" fontSize="large" sx={{ left: language === 'en' && '90%' }}></CloseIcon>
            <Divider className="!my-5" />
            <Box>
                <Box className='flex justify-between gap-x-3 mt-16 max-sm:flex-col'>
                    <TextField variant="outlined" label={<FormattedMessage id="full_name" />} className="w-full max-sm:w-full" value={fullName} onChange={(e) => setFullName(e.target.value)} />
                </Box>
                <Box className="relative w-full h-32 bg-gray-200 rounded-xl mt-10 flex flex-col items-center justify-center cursor-pointer">
                    <CloudUploadOutlinedIcon fontSize="large" className="" />
                    <Typography variant="body1" className="text-gray-700"><FormattedMessage id="add_image" /></Typography>
                    <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} className="w-full h-full opacity-0 absolute cursor-pointer" />
                </Box>
                <Box className='mx-auto w-1/3 mt-10 max-sm:w-full'>
                    <Button onClick={addModel} variant='outlined' className='!rounded-full w-full !border-green-500 !bg-green-500 !text-white hover:!bg-white hover:!text-green-500'>
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

export default AddModel;