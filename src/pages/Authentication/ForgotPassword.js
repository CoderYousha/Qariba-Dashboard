import { Box, Button, CircularProgress, Typography } from "@mui/material";
import VerificationInput from "react-verification-input";
import { useState } from "react";
import Fetch from "../../services/Fetch";
import { useConstants } from "../../hooks/UseConstants";
import { useWaits } from "../../hooks/UseWait";
import SnackbarAlert from "../../components/SnackBar";
import useSnackBar from "../../hooks/SnackBar/UseSnackBar";
import { useNavigate } from "react-router-dom";
import { useForgotPassword } from "../../hooks/Authentication/UseForgotPassword";
import Logo from "../../images/logo/logo.jpeg";
import { buildResetPasswordFormData } from "../../helper/Authentication/ResetPasswordFormData";

function ForgotPassword() {
    const { host } = useConstants();
    const { openSnackBar, type, message, setOpenSnackBar, setSnackBar } = useSnackBar();
    const { sendWait, setSendWait } = useWaits();
    const [openCodeSection, setOpenCodeSection] = useState(false);
    const [openResetPasswordSection, setOpenResetPasswordSection] = useState(false);
    const { email, setEmail, code, setCode, newPassword, setNewPassword, confirmNewPassword, setConfirmNewPassword } = useForgotPassword();
    const navigate = useNavigate();

    //Send Verification Code To Email
    const sendVerificationCode = async () => {
        setSendWait(true);

        const formData = new FormData();
        formData.append('email', email);
        let result = await Fetch(`${host}/api/forgot-password`, 'POST', formData);

        if (result.status === 201) {
            setOpenCodeSection(true);
            localStorage.setItem('verification_token', result.data.data);
        } else if (result.status === 422) {
            setSnackBar('error', result.data.errors[0]);
        }

        setSendWait(false);
    }

    //Chcek Verification Code
    const checkVerificationCode = async (code) => {
        const formData = new FormData();
        formData.append('code', code);

        let result = await Fetch(`${host}/api/check-forgot-password`, 'POST', formData, localStorage.getItem('verification_token'));

        if (result.status === 200) {
            setOpenResetPasswordSection(true);
            setOpenCodeSection(false);
            localStorage.setItem('verification_token', result.data.data);
        } else if (result.status === 422) {
            setSnackBar('error', result.data.errors[0]);
        } else if (result.status === 400) {
            setSnackBar('error', result.data.error);
        }
    }

    //Reset Password
    const resetPassword = async () => {
        setSendWait(true);

        const formData = buildResetPasswordFormData({
            newPassword: newPassword,
            newPasswordConfirmation: confirmNewPassword,
        });

        let result = await Fetch(`${host}/api/reset-forgot-password`, 'POST', formData, localStorage.getItem('verification_token'));

        if (result.status === 200) {
            navigate('/login');
            localStorage.removeItem('verification_token');
        } else if (result.status === 422) {
            setSnackBar('error', result.data.errors[0]);
        }

        setSendWait(false);
    }

    return (
        <>
            <Box>
                <Box className=''>
                    <Box className='w-1/3 mx-auto mt-20 rounded-xl shadow-lg px-5 py-5 max-sm:w-4/5'>
                        <img src={Logo} className="rounded-full w-20 h-20 mx-auto" />
                        <Typography variant='h4' className='!my-5' fontWeight={700}>Forgot Password</Typography>
                        {
                            !openCodeSection && !openResetPasswordSection &&
                            <Box className=''>
                                <Typography variant='body1'>Email</Typography>
                                <input onChange={(e) => setEmail(e.target.value)} type='text' className='w-full py-2 rounded-lg indent-2 outline-none bg-yellow-100' />
                                <Box className='mx-auto w-fit my-5'>
                                    <Button onClick={sendVerificationCode} variant='outlined' className='!rounded-full w-32 !border-green-500 !bg-green-500 !text-white hover:!bg-white hover:!text-green-500'>
                                        {
                                            sendWait ?
                                                <CircularProgress size={20} className="" color="white" />
                                                :
                                                'Next'
                                        }
                                    </Button>
                                </Box>
                            </Box>
                        }
                        {
                            openCodeSection &&
                            <Box className=''>
                                <Typography variant='body1'>Verification Code</Typography>
                                <Box className='mx-auto w-fit my-5'>
                                    <VerificationInput
                                        autoFocus
                                        passwordChar="*"
                                        passwordMode
                                        classNames={{
                                            character: "character",
                                            characterInactive: "character--inactive",
                                            characterSelected: "character--selected",
                                            characterFilled: "character--filled",
                                        }}
                                        onComplete={(value) => checkVerificationCode(value)}
                                    />
                                </Box>
                            </Box>

                        }
                        {
                            openResetPasswordSection &&
                            <Box className=''>
                                <Typography variant='body1'>New Password</Typography>
                                <input onChange={(e) => setNewPassword(e.target.value)} type='password' className='w-full py-2 rounded-lg indent-2 outline-none bg-yellow-100' />
                                <Typography className="!mt-5" variant='body1'>Confirm Password</Typography>
                                <input onChange={(e) => setConfirmNewPassword(e.target.value)} type='password' className='w-full py-2 rounded-lg indent-2 outline-none bg-yellow-100' />
                                <Box className='mx-auto w-fit my-5'>
                                    <Button onClick={resetPassword} variant='outlined' className='!rounded-full w-32 !border-green-500 !bg-green-500 !text-white hover:!bg-white hover:!text-green-500'>
                                        {
                                            sendWait ?
                                                <CircularProgress size={20} className="" color="white" />
                                                :
                                                'Reset'
                                        }
                                    </Button>
                                </Box>
                            </Box>
                        }
                    </Box>
                </Box>
            </Box>

            {/* Snackbar Alert */}
            <SnackbarAlert open={openSnackBar} message={message} severity={type} onClose={() => setOpenSnackBar(false)} />
        </>
    );
}

export default ForgotPassword;