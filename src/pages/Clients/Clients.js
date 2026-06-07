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
import { useAddProjectImage } from "../../hooks/Project/UseAddProjectImage";
import { buildAddProjectImageFormData } from "../../helper/Project/AddProjectImageFormData";
import useSnackBar from "../../hooks/SnackBar/UseSnackBar";
import SnackbarAlert from "../../components/SnackBar";
import MediaCard from "../../components/MediaCard";
import AddClient from "../../popup/client/AddClient";

function Clients() {
    const { language, host } = useConstants();
    const { wait } = useContext(AuthContext);
    const { getWait, setGetWait } = useWaits();
    const { setPopup } = usePopups();
    const theme = useTheme();
    const [clients, setClients] = useState([]);
    const { openSnackBar, type, message, setSnackBar, setOpenSnackBar } = useSnackBar();

    const getClients = async () => {
        let result = await Fetch(`${host}/api/clients`, 'GET');

        if (result.status === 200) {
            setClients(result.data.data.clients);
        }

        setGetWait(false);
    }

    const deleteClient = async (id) => {
        let result = await Fetch(`${host}/api/clients/${id}`, 'DELETE');

        if (result.status === 200) {
            setClients((prevClients) => prevClients.filter((prevClient) => prevClient.id !== id));
            setSnackBar('success', result.data.message);
        }
    }

    useEffect(() => {
        getClients();
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
                                            <Typography variant="h5" className="py-2 px-3 max-sm:!text-lg"><FormattedMessage id='clients' /></Typography>
                                            <Button variant="contained" onClick={() => setPopup('add', 'flex')} className="!bg-yellow-500">
                                                <AddIcon />
                                                <FormattedMessage id='add_client' />
                                            </Button>
                                        </Box>
                                        <Box className='grid grid-cols-3 gap-y-5 mt-10 max-sm:grid-cols-1'>
                                            {
                                                clients.map((client, index) =>
                                                    <MediaCard
                                                        image={`${host}/${client.image}`}
                                                        btn1={<FormattedMessage id="delete" />}
                                                        onClickBtn1={() => deleteClient(client.id)}
                                                    />
                                                )
                                            }
                                        </Box>
                                    </Box>
                            }
                        </Box>
                    </Box>
            }

            {/* Add New Client Popup */}
            <Box id="add" sx={{ right: language === 'en' && '0' }} className="w-4/5 h-screen fixed top-0 bg-gray-200 bg-opacity-5 hidden justify-center items-center">
                <AddClient setClients={setClients} onClickCancel={() => setPopup('add', 'none')} setSnackBar={setSnackBar} />
            </Box>

            {/* Snackbar Alert */}
            <SnackbarAlert open={openSnackBar} message={message} severity={type} onClose={() => setOpenSnackBar(false)} />
        </>
    );
}

export default Clients;