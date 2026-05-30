import { useContext, useEffect, useState } from "react";
import { useConstants } from "../../hooks/UseConstants";
import AuthContext from "../../context/AuthContext";
import { useWaits } from "../../hooks/UseWait";
import useSnackBar from "../../hooks/SnackBar/UseSnackBar";
import Fetch from "../../services/Fetch";
import { Box, Button, CircularProgress, useTheme } from "@mui/material";
import { FormattedMessage } from "react-intl";
import SnackbarAlert from "../../components/SnackBar";
import QuillTextInput from "../../components/QuillTextInput";

function Aboutus() {
    const { language, host } = useConstants();
    const { wait } = useContext(AuthContext);
    const { getWait, setGetWait, sendWait, setSendWait } = useWaits();
    const [aboutus, setAboutus] = useState('');
    const { openSnackBar, type, message, setSnackBar, setOpenSnackBar } = useSnackBar();
    const theme = useTheme();

    const getAboutus = async () => {
        let result = await Fetch(`${host}/api/aboutus`, 'GET');

        if (result.status === 200) {
            setAboutus(result.data.data.data.aboutus);
        }

        setGetWait(false);
    }

    const updateAboutus = async () => {
        setSendWait(true);

        const formData = new FormData();
        formData.append('content', aboutus);

        let result = await Fetch(`${host}/api/aboutus`, 'POST', formData);

        if (result.status === 200) {
            setSnackBar('success', result.data.message);
        }

        setSendWait(false);
    }

    useEffect(() => {
        getAboutus();
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
                                    <Box sx={{ backgroundColor: theme.palette.background.default }} className="rounded-xl px-2 pt-20">
                                        <Box className='w-2/3 rounded-lg mx-auto p-3' sx={{ backgroundColor: theme.palette.background.paper }}>
                                        <QuillTextInput 
                                            label={<FormattedMessage id="about_us"/>}
                                            value={aboutus}
                                            onChange={setAboutus}
                                            
                                        />
                                            <Box className='w-fit mx-auto mt-5'>
                                                <Button onClick={updateAboutus} className="w-60" variant="contained" color="success">
                                                    {
                                                        sendWait ?
                                                            <CircularProgress size={20} className="" color="white" />
                                                            :
                                                            <FormattedMessage id="save" />
                                                    }
                                                </Button>
                                            </Box>
                                        </Box>
                                    </Box>
                            }
                        </Box>
                    </Box>
            }
            {/* Snackbar Alert */}
            <SnackbarAlert open={openSnackBar} message={message} severity={type} onClose={() => setOpenSnackBar(false)} />
        </>
    );
}

export default Aboutus;