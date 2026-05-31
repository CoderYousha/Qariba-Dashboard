import { Avatar, Box, Typography } from "@mui/material";
import InboxIcon from '@mui/icons-material/Inbox';
import Person2OutlinedIcon from '@mui/icons-material/Person2Outlined';
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import CampaignOutlinedIcon from '@mui/icons-material/CampaignOutlined';
import { NavLink, useNavigate } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import AuthContext from "../context/AuthContext";
import { useContext } from "react";
import { useConstants } from "../hooks/UseConstants";
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import { usePopups } from "../hooks/UsePopups";
import LogoutPopup from "../popup/Logout";
import AddIcCallOutlinedIcon from '@mui/icons-material/AddIcCallOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import AccountTreeOutlinedIcon from '@mui/icons-material/AccountTreeOutlined';
import LayersOutlinedIcon from '@mui/icons-material/LayersOutlined';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';

function Sidebar() {
    const { host, language } = useConstants();
    const { wait, profile } = useContext(AuthContext);
    const navigate = useNavigate();
    const { setPopup } = usePopups();
    const contents = [
        {
            "title": <FormattedMessage id="users" />,
            "icon": <Person2OutlinedIcon fontSize="large" className="text-yellow-500" />,
            "path": "/users",
        },
        {
            "title": <FormattedMessage id="categories" />,
            "icon": <LayersOutlinedIcon fontSize="large" className="text-yellow-500" />,
            "path": "/categories",
        },
        {
            "title": <FormattedMessage id="projects" />,
            "icon": <AccountTreeOutlinedIcon fontSize="large" className="text-yellow-500" />,
            "path": "/projects",
        },
        {
            "title": <FormattedMessage id="banners" />,
            "icon": <CampaignOutlinedIcon fontSize="large" className="text-yellow-500" />,
            "path": "/banners",
        },
        {
            "title": <FormattedMessage id="contact_us" />,
            "icon": <AddIcCallOutlinedIcon fontSize="large" className="text-yellow-500" />,
            "path": "/contacts",
        },
        {
            "title": <FormattedMessage id="about_us" />,
            "icon": <InfoOutlinedIcon fontSize="large" className="text-yellow-500" />,
            "path": "/about_us",
        },
        {
            "title": <FormattedMessage id="clients" />,
            "icon": <GroupOutlinedIcon fontSize="large" className="text-yellow-500" />,
            "path": "/clients",
        },
        {
            "title": <FormattedMessage id="orders" />,
            "icon": <InboxIcon fontSize="large" className="text-yellow-500" />,
            "path": "/orders",
        },
    ];

    return (
        <>
            {
                !wait &&
                <Box className='w-1/5 h-screen overflow-y-scroll none-view-scroll bg-white px-5 fixed !right-0'>
                    <Box className='py-5 flex items-center'>
                        <Box className='px-1 py-1 border border-yellow-400 border-r-4 border-b-4 rounded-full relative'>
                            {
                                profile.image ?
                                    <Avatar onClick={() => navigate('/profile')} className="w-10 h-10 cursor-pointer" alt="Cindy Baker" src={`${host}/${profile.image}`} />
                                    :
                                    <Box onClick={() => navigate('/profile')} className='w-10 h-10 rounded-full bg-gray-400 text-white text-3xl flex justify-center items-center cursor-pointer'>
                                        {profile.full_name.charAt(0)}
                                    </Box>
                            }
                            {/* <Avatar className="cursor-pointer" alt="Cindy Baker" src="/static/images/avatar/1.jpg" /> */}
                        </Box>
                        <Box className='!ml-5 max-sm:hidden'>
                            <Typography variant="h6" fontWeight={800}>{profile.full_name}</Typography>
                            <Typography variant="body2">Admin</Typography>
                        </Box>
                    </Box>
                    <Box className=''>
                        {
                            contents.map((content, index) =>
                                <NavLink key={index} to={content.path} className='mt-5 flex justify-between cursor-pointer rounded-lg px-3 py-2'>
                                    {content.icon}
                                    <Typography variant="h6" className="text-yellow-500 max-sm:hidden">{content.title}</Typography>
                                </NavLink>
                            )
                        }
                        <Box className='mt-5 flex justify-between cursor-pointer rounded-full px-3 py-2' onClick={() => setPopup('logout', 'flex')}>
                            <LogoutOutlinedIcon fontSize="large" className="text-yellow-500" />
                            <Typography variant="h6" className="text-yellow-500 max-sm:hidden"><FormattedMessage id="logout" /></Typography>
                        </Box>
                    </Box>
                </Box>
            }
            <Box id="logout" className="w-screen h-screen fixed top-0 bg-gray-200 bg-opacity-5 hidden justify-center items-center max-sm:left-0" sx={{ zIndex: 1000 }}>
                <LogoutPopup onClickCancel={() => setPopup('logout', 'none')} />
            </Box>
        </>
    );
}

export default Sidebar;