import { Box, Button, Checkbox, CircularProgress, Divider, FormControlLabel, TextField, Typography, useTheme } from "@mui/material";
import { FormattedMessage } from "react-intl";
import { useConstants } from "../../hooks/UseConstants";
import { useWaits } from "../../hooks/UseWait";
import CloseIcon from '@mui/icons-material/Close';
import { useEffect, useState } from "react";
import Fetch from "../../services/Fetch";
import { useAddCategory } from "../../hooks/Category/UseAddCategory";
import { buildAddCategoryFormData } from "../../helper/Category/AddCategoryFormData";

function UpdateSubCategory({ onClickCancel, setSnackBar, subCategory, getSubCategories }) {
    const theme = useTheme();
    const { host, language } = useConstants();
    const { sendWait, setSendWait } = useWaits();
    const [subCateg, setSubCateg] = useState('');

    const updateCategory = async () => {
        setSendWait(true);
        const formData = new FormData();
        formData.append('sub_category', subCateg);

        let result = await Fetch(`${host}/api/sub-categories/update/${subCategory.id}`, 'POST', formData);

        if (result.status === 200) {
            setSnackBar('success', result.data.message);
            await getSubCategories();
            onClickCancel();
        } else if (result.status === 422) {
            setSnackBar('error', result.data.errors[0]);
        } else if (result.status === 400) {
            setSnackBar('error', result.data.error);
        }

        setSendWait(false);
    }

    const resetValue = () => {
        setSubCateg(subCategory.sub_category);
    }

    useEffect(() => {
        if (subCategory)
            resetValue();
    }, [subCategory]);

    return (
        <Box sx={{ backgroundColor: theme.palette.background.paper }} className="shadow-lg w-3/5 h-fit rounded-3xl px-4 py-5 overflow-y-scroll none-view-scroll max-sm:w-4/5 max-sm:translate-x-0 max-sm:left-0 relative max-sm:overflow-y-scroll" dir={language === 'en' ? 'ltr' : "rtl"}>
            <Typography variant="h5" className="!font-semibold max-sm:!text-xl">
                <FormattedMessage id='update_sub_category' />
            </Typography>
            <CloseIcon onClick={() => { resetValue(); onClickCancel(); }} className="text-gray-700 cursor-pointer absolute top-5 left-5" fontSize="large" sx={{ left: language === 'en' && '90%' }}></CloseIcon>
            <Divider className="!my-5" />
            <Box>
                <Box className='flex justify-between mt-16 max-sm:flex-col'>
                    <TextField variant="outlined" label={<FormattedMessage id="sub_category" />} className="w-full max-sm:w-full" value={subCateg} onChange={(e) => setSubCateg(e.target.value)} />
                </Box>
                <Box className='mx-auto w-1/3 mt-10 max-sm:w-full'>
                    <Button onClick={updateCategory} variant='outlined' className='!rounded-full w-full !border-green-500 !bg-green-500 !text-white hover:!bg-white hover:!text-green-500'>
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

export default UpdateSubCategory;