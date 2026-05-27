import { useNavigate } from "react-router-dom";
import { useConstants } from "../../hooks/UseConstants";
import CheckLogin from "../../services/CheckLogin";
import { useWaits } from "../../hooks/UseWait";
import { useLogin } from "../../hooks/Authentication/UseLogin";
import { buildLoginFormData } from "../../helper/Authentication/LoginFormData";
import Fetch from "../../services/Fetch";
import useSnackBar from "../../hooks/SnackBar/UseSnackBar";
import SnackbarAlert from "../../components/SnackBar";
import { Typography, Box, Button, CircularProgress, useTheme } from '@mui/material';
import { useEffect } from "react";
import Logo from "../../images/logo/logo.jpeg";

function Login() {
    const { host } = useConstants();
    const { getWait, setGetWait, sendWait, setSendWait } = useWaits();
    const { email, setEmail, password, setPassword } = useLogin();
    const { openSnackBar, type, message, setOpenSnackBar, setSnackBar } = useSnackBar();
    const navigate = useNavigate();
    const theme = useTheme();

    //Check Login Function
    const checkLogin = async () => {
        let result = await CheckLogin(host);
        if (result) {
            navigate('/users');
        } else {
            setGetWait(false);
        }
    }

    //Login
    const login = async () => {
        setSendWait(true);

        const formData = buildLoginFormData({
            email: email,
            password: password,
        });

        let result = await Fetch(`${host}/api/login`, 'POST', formData);

        if (result.status === 200) {
            localStorage.setItem('token', result.data.data.token);
            navigate('/users');
        } else if (result.status === 422) {
            setSnackBar('error', result.data.errors[0]);
        } else if (result.status === 400) {
            setSnackBar('error', result.data.error);
        }

        setSendWait(false);
    }

    useEffect(() => {
        checkLogin();
    }, []);

    return (
        <>
            {
                getWait ?
                    <Box className="w-full h-screen relative flex justify-center items-center">
                        <CircularProgress size={70} className='!text-yellow-500' />
                    </Box>
                    :
                    <Box>
                        <Box className='w-2/6 mx-auto mt-20 rounded-xl shadow-lg px-5 py-5 max-sm:w-4/5'>
                            <img src={Logo} className="rounded-full w-20 h-20 mx-auto"/>
                            <Typography variant='body2' className='!mt-7 text-gray-500'>Welcome back !!!</Typography>
                            <Typography variant='h3' className='!my-5' fontWeight={700}>Sign in</Typography>
                            <Typography variant='body1'>Email</Typography>
                            <input onChange={(e) => setEmail(e.target.value)} type='text' className='w-full py-2 rounded-lg indent-2 outline-none bg-yellow-100' />
                            <Typography variant='body1' className='!mt-3'>Password</Typography>
                            <input onChange={(e) => setPassword(e.target.value)} type='password' className='w-full py-2 rounded-lg indent-2 outline-none bg-yellow-100' />
                            <Typography onClick={() => navigate('/forgot-password')} variant='body1' className='!my-3 cursor-pointer text-gray-600 hover:text-orange-500 w-fit'>Forgot Password?</Typography>
                            <Box className='mx-auto w-fit'>
                                <Button onClick={login} variant='outlined' className='!rounded-full w-32 !border-green-500 !bg-green-500 !text-white hover:!bg-white hover:!text-green-500'>
                                    {
                                        sendWait ?
                                            <CircularProgress size={20} className="" color="white" />
                                            :
                                            'SIGN IN'
                                    }
                                </Button>
                            </Box>
                        </Box>
                    </Box>
            }

            {/* Snackbar Alert */}
            <SnackbarAlert open={openSnackBar} message={message} severity={type} onClose={() => setOpenSnackBar(false)} />
        </>
    );
}

export default Login;