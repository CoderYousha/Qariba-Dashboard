import { useContext, useEffect } from "react";
import { useConstants } from "../../hooks/UseConstants";
import AuthContext from "../../context/AuthContext";
import { Box, Button, CircularProgress, TextField, useTheme } from "@mui/material";
import { useWaits } from "../../hooks/UseWait";
import Fetch from "../../services/Fetch";
import { useAddContact } from "../../hooks/Contact/UseAddContact";
import { FormattedMessage } from "react-intl";
import { buildAddContactFormData } from "../../helper/Contact/AddContactFormData";
import useSnackBar from "../../hooks/SnackBar/UseSnackBar";
import SnackbarAlert from "../../components/SnackBar";

function Contacts() {
    const { language, host } = useConstants();
    const { wait } = useContext(AuthContext);
    const { getWait, setGetWait, sendWait, setSendWait } = useWaits();
    const { facebook, setFacebook, tiktok, setTiktok, instagram, setInstagram, youtube, setYoutube, email, setEmail, whatsapp, setWhatsapp } = useAddContact();
    const { openSnackBar, type, message, setSnackBar, setOpenSnackBar } = useSnackBar();
    const theme = useTheme();

    const getContact = async () => {
        let result = await Fetch(`${host}/api/contacts`, 'GET');

        if (result.status === 200) {
            setFacebook(result.data.data.data.facebook);
            setTiktok(result.data.data.data.tiktok);
            setInstagram(result.data.data.data.instagram);
            setYoutube(result.data.data.data.youtube);
            setEmail(result.data.data.data.email);
            setWhatsapp(result.data.data.data.whatsapp);
        }

        setGetWait(false);
    }

    const updateContact = async () => {
        setSendWait(true);

        const formData = buildAddContactFormData({
            facebook: facebook,
            instagram: instagram,
            tiktok: tiktok,
            youtube: youtube,
        });

        let result = await Fetch(`${host}/api/contacts`, 'POST', formData);

        if (result.status === 200) {
            setSnackBar('success', result.data.message);
        }

        setSendWait(false);
    }

    useEffect(() => {
        getContact();
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
                                            <TextField variant="outlined" className="w-full" value={facebook} onChange={(e) => setFacebook(e.target.value)} label={<FormattedMessage id="facebook" />} />
                                            <TextField variant="outlined" className="w-full !mt-5" value={instagram} onChange={(e) => setInstagram(e.target.value)} label={<FormattedMessage id="instagram" />} />
                                            <TextField variant="outlined" className="w-full !mt-5" value={tiktok} onChange={(e) => setTiktok(e.target.value)} label={<FormattedMessage id="tiktok" />} />
                                            <TextField variant="outlined" className="w-full !mt-5" value={youtube} onChange={(e) => setYoutube(e.target.value)} label={<FormattedMessage id="youtube" />} />
                                            <TextField variant="outlined" className="w-full !mt-5" value={email} onChange={(e) => setEmail(e.target.value)} label={<FormattedMessage id="email" />} />
                                            <TextField variant="outlined" className="w-full !mt-5" value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)} label={<FormattedMessage id="whatsapp" />} />
                                            <Box className='w-fit mx-auto mt-5'>
                                                <Button onClick={updateContact} className="w-60" variant="contained" color="success">
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

export default Contacts;