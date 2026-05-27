import { Box, Button, Checkbox, CircularProgress, Divider, FormControlLabel, TextField, Typography, useTheme } from "@mui/material";
import { FormattedMessage } from "react-intl";
import { useConstants } from "../../hooks/UseConstants";
import PhoneInput from "react-phone-input-2";
import { useWaits } from "../../hooks/UseWait";
import CloseIcon from '@mui/icons-material/Close';
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import Fetch from "../../services/Fetch";
import { useAddCategory } from "../../hooks/Category/UseAddCategory";
import { buildAddCategoryFormData } from "../../helper/Category/AddCategoryFormData";

function AddCategory({ onClickCancel, setSnackBar, setCategories }) {
    const theme = useTheme();
    const { host, language } = useConstants();
    const { sendWait, setSendWait } = useWaits();
    const { catgory, setCatgory, service, setService } = useAddCategory();

    const addCategory = async () => {
        setSendWait(true);
        const formData = buildAddCategoryFormData({
            category: catgory,
            service: service,
        });

        let result = await Fetch(`${host}/api/categories`, 'post', formData);

        if (result.status === 201) {
            setSnackBar('success', <FormattedMessage id="added_success" />);
            setCategories((prevCategories) => [result.data.data, ...prevCategories]);
            resetValue();
            onClickCancel();
        } else if (result.status === 422) {
            setSnackBar('error', result.data.errors[0]);
        } else if (result.status === 400) {
            setSnackBar('error', result.data.error);
        }

        setSendWait(false);
    }

    const resetValue = () => {
        setCatgory('');
        setService('');
    }

    return (
        <Box sx={{ backgroundColor: theme.palette.background.paper }} className="shadow-lg w-3/5 h-fit rounded-3xl px-4 py-5 overflow-y-scroll none-view-scroll max-sm:w-4/5 max-sm:translate-x-0 max-sm:left-0 relative max-sm:overflow-y-scroll" dir={language === 'en' ? 'ltr' : "rtl"}>
            <Typography variant="h5" className="!font-semibold max-sm:!text-xl">
                <FormattedMessage id='add_category' />
            </Typography>
            <CloseIcon onClick={() => { resetValue(); onClickCancel(); }} className="text-gray-700 cursor-pointer absolute top-5 left-5" fontSize="large" sx={{ left: language === 'en' && '90%' }}></CloseIcon>
            <Divider className="!my-5" />
            <Box>
                <Box className='flex justify-between mt-16 max-sm:flex-col'>
                    <TextField variant="outlined" label={<FormattedMessage id="category" />} className="w-2/5 max-sm:w-full" value={catgory} onChange={(e) => setCatgory(e.target.value)} />
                    <select value={service} onChange={(e) => setService(e.target.value)} className="w-2/5 outline-none rounded-md border border-gray-300 max-sm:w-full">
                        <option value='' disabled selected><FormattedMessage id="service" /></option>
                        <option value="software_developer"><FormattedMessage id="software_developer" /></option>
                        <option value="digital_marketing"><FormattedMessage id="digital_marketing" /></option>
                        <option value="photography"><FormattedMessage id="photography" /></option>
                    </select>
                </Box>
                <Box className='mx-auto w-1/3 mt-10 max-sm:w-full'>
                    <Button onClick={addCategory} variant='outlined' className='!rounded-full w-full !border-green-500 !bg-green-500 !text-white hover:!bg-white hover:!text-green-500'>
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

export default AddCategory;