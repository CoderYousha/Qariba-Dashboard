import { Box, Button, Checkbox, CircularProgress, Divider, FormControlLabel, TextField, Typography, useTheme } from "@mui/material";
import { FormattedMessage, useIntl } from "react-intl";
import { useConstants } from "../../hooks/UseConstants";
import PhoneInput from "react-phone-input-2";
import { useWaits } from "../../hooks/UseWait";
import CloseIcon from '@mui/icons-material/Close';
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import Fetch from "../../services/Fetch";
import { useAddCategory } from "../../hooks/Category/UseAddCategory";
import { buildAddCategoryFormData } from "../../helper/Category/AddCategoryFormData";
import { useUser } from "../../hooks/User/UseUser";
import { useOrder } from "../../hooks/Order/UseOrder";
import { useEffect } from "react";

function OrderDetails({ onClickCancel, order }) {
    const theme = useTheme();
    const { host, language } = useConstants();
    const { sendWait, setSendWait } = useWaits();
    const {id, setId, description, setDescription, service, setService, category, setCategory, subCategory, setSubCategory} = useOrder();
    const intl = useIntl();
    
    const resetValue = () => {
        setId(order.id);
        setDescription(order.description);
        setService(order.category.service);
        setCategory(order.category.category);
        setSubCategory(order.sub_category.sub_category);
    }

    useEffect(() => {
        if(order)
            resetValue();
    }, [order]);

    return (
        <Box sx={{ backgroundColor: theme.palette.background.paper }} className="shadow-lg w-3/5 h-fit rounded-3xl px-4 py-5 overflow-y-scroll none-view-scroll max-sm:w-4/5 max-sm:translate-x-0 max-sm:left-0 relative max-sm:overflow-y-scroll" dir={language === 'en' ? 'ltr' : "rtl"}>
            <Typography variant="h5" className="!font-semibold max-sm:!text-xl">
                <FormattedMessage id='order_details' />
            </Typography>
            <CloseIcon onClick={() => { resetValue(); onClickCancel(); }} className="text-gray-700 cursor-pointer absolute top-5 left-5" fontSize="large" sx={{ left: language === 'en' && '90%' }}></CloseIcon>
            <Divider className="!my-5" />
            <Box>
                <Box className='flex flex-col justify-between mt-16 max-sm:flex-col'>
                    <TextField variant="outlined" label={<FormattedMessage id="id" />} className="w-full max-sm:w-full" value={id} />
                </Box>
                <Box className='flex flex-col justify-between mt-16 max-sm:flex-col'>
                    <TextField multiline rows={3} variant="outlined" label={<FormattedMessage id="description" />} className="w-full max-sm:w-full" value={description} />
                </Box>
                <Box className='flex flex-col justify-between mt-16 max-sm:flex-col'>
                    <TextField variant="outlined" label={<FormattedMessage id="service" />} value={service === 'software_developer' ? intl.formatMessage({id: 'software_developer'}) : service === 'digital_marketing' ? intl.formatMessage({id: 'digital_marketing'}) : intl.formatMessage({id: 'photography'})} />
                </Box>
                <Box className='flex flex-col justify-between mt-16 max-sm:flex-col'>
                    <TextField variant="outlined" label={<FormattedMessage id="category" />} className="w-full max-sm:w-full" value={category} />
                </Box>
                <Box className='flex flex-col justify-between mt-16 max-sm:flex-col'>
                    <TextField variant="outlined" label={<FormattedMessage id="sub_category" />} className="w-full max-sm:w-full" value={subCategory} />
                </Box>
            </Box>
        </Box>
    );
}

export default OrderDetails;