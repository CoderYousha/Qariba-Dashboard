import { Avatar, Box, Divider, FormControlLabel, TextField, Typography, useTheme } from "@mui/material";
import { FormattedMessage } from "react-intl";
import { useConstants } from "../../hooks/UseConstants";
import PhoneInput from "react-phone-input-2";
import { useWaits } from "../../hooks/UseWait";
import CloseIcon from '@mui/icons-material/Close';
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import Fetch from "../../services/Fetch";
import { useAddCategory } from "../../hooks/Category/UseAddCategory";
import { buildAddCategoryFormData } from "../../helper/Category/AddCategoryFormData";
import { useUser } from "../../hooks/User/UseUser";
import { useEffect } from "react";

function UserDetails({ onClickCancel, user }) {
    const theme = useTheme();
    const { host, language } = useConstants();
    const { sendWait, setSendWait } = useWaits();
    const {fullName, setFullName, email, setEmail, phone, setPhone, image, setImage} = useUser();

    const resetValue = () => {
        setFullName(user.full_name);
        setEmail(user.email);
        setPhone(user.phone);
        setImage(user.image);
    }

    useEffect(() => {
        if(user)
            resetValue();
    }, [user]);

    return (
        <Box sx={{ backgroundColor: theme.palette.background.paper }} className="shadow-lg w-3/5 h-fit rounded-3xl px-4 py-5 overflow-y-scroll none-view-scroll max-sm:w-4/5 max-sm:translate-x-0 max-sm:left-0 relative max-sm:overflow-y-scroll" dir={language === 'en' ? 'ltr' : "rtl"}>
            <Typography variant="h5" className="!font-semibold max-sm:!text-xl">
                <FormattedMessage id='user_details' />
            </Typography>
            <CloseIcon onClick={() => { resetValue(); onClickCancel(); }} className="text-gray-700 cursor-pointer absolute top-5 left-5" fontSize="large" sx={{ left: language === 'en' && '90%' }}></CloseIcon>
            <Divider className="!my-5" />
            <Box>
                <Box className='mx-auto rounded-full w-24 h-24 overflow-hidden'>
                    {
                        image ?
                            <Avatar className="rounded-full w-full h-full" alt="Cindy Baker" src={`${host}/${user.image}`} />
                            :
                            <Box className='w-full h-full rounded-full bg-gray-400 text-white text-3xl flex justify-center items-center'>
                                {fullName.charAt(0)}
                            </Box>
                    }
                </Box>
                <Box className='flex flex-col justify-between mt-16 max-sm:flex-col'>
                    <TextField variant="outlined" label={<FormattedMessage id="full_name" />} className="w-full max-sm:w-full" value={fullName} />
                </Box>
                <Box className='flex flex-col justify-between mt-16 max-sm:flex-col'>
                    <TextField variant="outlined" label={<FormattedMessage id="email" />} className="w-full max-sm:w-full" value={email} />
                </Box>
                <Box className='flex flex-col justify-between mt-16 max-sm:flex-col'>
                    <TextField variant="outlined" label={<FormattedMessage id="phone" />} className="w-full max-sm:w-full" value={phone} />
                </Box>
            </Box>
        </Box>
    );
}

export default UserDetails;