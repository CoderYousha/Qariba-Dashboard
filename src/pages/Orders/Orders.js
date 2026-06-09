import { Box, Button, CircularProgress, MenuItem, Paper, Select, Table, TableBody, TableContainer, TableHead, TableRow, Typography, useTheme } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/AuthContext";
import { useConstants } from "../../hooks/UseConstants";
import { useWaits } from "../../hooks/UseWait";
import { FormattedMessage, useIntl } from "react-intl";
import { usePopups } from "../../hooks/UsePopups";
import { useSearch } from "../../hooks/Search/UseSearch";
import { useTableStyles } from "../../hooks/Table/UseTableStyles";
import { usePagination } from "../../hooks/Pagination/UsePagination";
import SnackbarAlert from "../../components/SnackBar";
import useSnackBar from "../../hooks/SnackBar/UseSnackBar";
import AddIcon from '@mui/icons-material/Add';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import Fetch from "../../services/Fetch";
import DeleteDialog from "../../popup/DeleteDialog";
import AddCategory from "../../popup/category/AddCategory";
import UpdateCategory from "../../popup/category/UpdateCategory";
import { useNavigate } from "react-router-dom";
import UserDetails from "../../popup/user/UserDetails";
import OrderDetails from "../../popup/order/OrderDetails";
import CircleIcon from '@mui/icons-material/Circle';

function Orders() {
    const { language, host } = useConstants();
    const { wait } = useContext(AuthContext);
    const theme = useTheme();
    const { getWait, setGetWait } = useWaits();
    const { setPopup } = usePopups();
    const { search, setSearch } = useSearch();
    const intl = useIntl();
    const { StyledTableCell, StyledTableRow } = useTableStyles();
    const { openSnackBar, type, message, setSnackBar, setOpenSnackBar } = useSnackBar();
    const { page, setPage, currentPage, setCurrentPage, totalPages, setTotalPages } = usePagination();
    const [ordersCounts, setOrdersCounts] = useState();
    const [orders, setOrders] = useState([]);
    const [user, setUser] = useState('');
    const [order, setOrder] = useState();
    const navigate = useNavigate();

    {/* Get Orders Function */ }
    const getOrders = async () => {
        let result = await Fetch(`${host}/api/requests?page=${page + 1}&search=${search}`, 'GET', null);
        if (result.status === 200) {
            setTotalPages(result.data.data.pagination.last_page);
            setOrdersCounts(result.data.data.pagination.total);
            setOrders(result.data.data.requests);
            setCurrentPage(page);
        }

        setGetWait(false);
    }

    {/* Change Order Status Function */ }
    const changeStatus = async (status, id) => {
        const formData = new FormData();
        formData.append('status', status);

        let result = await Fetch(`${host}/api/requests/change-status/${id}`, 'POST', formData);

        if (result.status === 200) {
            setSnackBar('success', result.data.message);
            getOrders();
        }
    }

    {/* Delete Order Function */ }
    const deleteOrder = async () => {
        let result = await Fetch(`${host}/api/requests/${order.id}`, 'DELETE', null);

        if (result.status === 200) {
            setOrders((prevOrders) => prevOrders.filter((prevOrder) => prevOrder.id !== order.id));
            setOrdersCounts(ordersCounts - 1);
            setSnackBar('success', result.data.message);
            setOrder('');
        }
    }

    useEffect(() => {
        getOrders();
    }, [page, search]);

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
                                    <Box sx={{ backgroundColor: theme.palette.background.paper }} className="bg-white rounded-xl px-2">
                                        {/* Top Section */}
                                        <Box sx={{ backgroundColor: theme.palette.background.default }} className="flex justify-between items-center px-2">
                                            <Typography variant="h5" className="py-2 px-3 max-sm:!text-lg"><FormattedMessage id='orders' /></Typography>
                                        </Box>

                                        <Box>
                                            <TableContainer className="" component={Paper} dir={language === 'en' ? 'ltr' : "rtl"}>
                                                {/* Top Table */}
                                                <Box className="min-h-12 py-2 px-2 flex justify-between items-center max-sm:flex-col">
                                                    <Box className="w-full flex items-center">
                                                        <Box className="w-2/4 relative mr-3 max-sm:w-full">
                                                            <input style={{ backgroundColor: theme.palette.background.default }} onChange={(e) => setSearch(e.target.value)} className="w-11/12 h-12 rounded-md border indent-14 outline-none max-sm:w-full" placeholder={intl.formatMessage({ id: "search_order" })} />
                                                            <SearchOutlinedIcon className="absolute top-1/2 -translate-y-1/2 right-3 text-gray-500" sx={{ right: language === 'en' && '90%' }} />
                                                        </Box>
                                                    </Box>
                                                    <Box className="flex w-2/4 items-center justify-end max-sm:mt-2 max-sm:w-full max-sm:justify-between">
                                                        <Typography variant="body1" className="!text-gray-500"><FormattedMessage id='total_orders' />: {ordersCounts}</Typography>
                                                    </Box>
                                                </Box>

                                                {/* Orders Table */}
                                                <Table className="" sx={{ minWidth: 700 }} aria-label="customized table">
                                                    <TableHead className="bg-gray-200">
                                                        <TableRow sx={{ backgroundColor: theme.palette.background.paper }}>
                                                            <StyledTableCell align={language === 'en' ? "left" : "right"}><FormattedMessage id='id' /></StyledTableCell>
                                                            <StyledTableCell align={language === 'en' ? "left" : "right"}><FormattedMessage id='client_name' /></StyledTableCell>
                                                            <StyledTableCell align={language === 'en' ? "left" : "right"} className=""><FormattedMessage id='service' /></StyledTableCell>
                                                            <StyledTableCell align={language === 'en' ? "left" : "right"} className=""><FormattedMessage id='category' /></StyledTableCell>
                                                            <StyledTableCell align={language === 'en' ? "left" : "right"} className=""><FormattedMessage id='model' /></StyledTableCell>
                                                            <StyledTableCell align={language === 'en' ? "left" : "right"} className=""><FormattedMessage id='sub_category' /></StyledTableCell>
                                                            <StyledTableCell align={language === 'en' ? "left" : "right"} className=""><FormattedMessage id='order_date' /></StyledTableCell>
                                                            <StyledTableCell align={language === 'en' ? "left" : "right"} className=""><FormattedMessage id='status' /></StyledTableCell>
                                                            <StyledTableCell align={language === 'en' ? 'left' : 'right'} className="!text-center"><FormattedMessage id='procedures' /></StyledTableCell>
                                                        </TableRow>
                                                    </TableHead>
                                                    <TableBody>
                                                        {orders.map((order, index) => (
                                                            <StyledTableRow key={index} className="hover:bg-gray-200 duration-100 cursor-pointer">
                                                                <StyledTableCell align={language === 'en' ? "left" : "right"} className="" onClick={() => { setOrder(order); setPopup('order_details', 'flex') }}>{order.id}</StyledTableCell>
                                                                <StyledTableCell align={language === 'en' ? "left" : "right"} className="" onClick={() => { setUser(order.user); setPopup('user_details', 'flex') }}>{order.user.full_name}</StyledTableCell>
                                                                <StyledTableCell align={language === 'en' ? "left" : "right"} className="">{order.service === 'software_developer' ? <FormattedMessage id="software_developer" /> : order.service === 'digital_marketing' ? <FormattedMessage id="digital_marketing" /> : <FormattedMessage id="photography" />}</StyledTableCell>
                                                                <StyledTableCell align={language === 'en' ? "left" : "right"} className="">{order.category}</StyledTableCell>
                                                                <StyledTableCell align={language === 'en' ? "left" : "right"} className="">{order.model}</StyledTableCell>
                                                                <StyledTableCell align={language === 'en' ? "left" : "right"} className="">{order.sub_category}</StyledTableCell>
                                                                <StyledTableCell align={language === 'en' ? "left" : "right"} className="">{order.created_at.split("T")[0]}</StyledTableCell>
                                                                <StyledTableCell align={language === 'en' ? "left" : "right"} className="">
                                                                    <Select onChange={(e) => changeStatus(e.target.value, order.id)} value={order.status} variant="standard" defaultValue="active" onClick={(e) => e.stopPropagation()} className="!border-0" sx={{ border: 'none' }}>
                                                                        <MenuItem value="accepted">
                                                                            <CircleIcon className="text-green-700" fontSize="small" /> <FormattedMessage id='accepted' />
                                                                        </MenuItem>
                                                                        <MenuItem value="pending">
                                                                            <CircleIcon className="text-gray-700" fontSize="small" /> <FormattedMessage id='pending' />
                                                                        </MenuItem>
                                                                        <MenuItem value="canceled">
                                                                            <CircleIcon className="text-red-700" fontSize="small" /> <FormattedMessage id='canceled' />
                                                                        </MenuItem>
                                                                        <MenuItem value="contact_us">
                                                                            <CircleIcon className="text-orange-500" fontSize="small" /> <FormattedMessage id='contact_us' />
                                                                        </MenuItem>
                                                                    </Select>
                                                                </StyledTableCell>
                                                                <StyledTableCell align="right">
                                                                    <Box className="!flex justify-center items-center">
                                                                        <Button variant="contained" className="!bg-red-300 !font-bold !text-red-800 hover:!bg-red-500 hover:!text-white duration-300 !ml-2" onClick={(e) => { setOrder(order); setPopup('delete', 'flex') }}><FormattedMessage id='delete' /></Button>
                                                                    </Box>
                                                                </StyledTableCell>
                                                            </StyledTableRow>
                                                        ))}
                                                    </TableBody>
                                                </Table>
                                                {/* Pagination Buttons */}
                                                <Box className="flex justify-center items-center" dir="rtl">
                                                    <Button disabled={page + 1 === totalPages} className="cursor-pointer" onClick={() => setPage(currentPage + 1)}>
                                                        <NavigateNextIcon fontSize="large" />
                                                    </Button>
                                                    <Typography variant="body1" className="!text-xl" dir='ltr'>{currentPage + 1} / {totalPages}</Typography>
                                                    <Button disabled={page + 1 === 1} className="cursor-pointer" onClick={() => setPage(currentPage - 1)}>
                                                        <NavigateBeforeIcon fontSize="large" />
                                                    </Button>
                                                </Box>
                                            </TableContainer>
                                        </Box>
                                    </Box>
                            }
                        </Box>

                        {/* User Details Popup */}
                        <Box id="user_details" sx={{ right: language === 'en' && '0' }} className="w-4/5 h-screen fixed top-0 bg-gray-200 bg-opacity-5 hidden justify-center items-center">
                            <UserDetails user={user} onClickCancel={() => setPopup('user_details', 'none')} />
                        </Box>

                        {/* Order Details Popup */}
                        <Box id="order_details" sx={{ right: language === 'en' && '0' }} className="w-4/5 h-screen fixed top-0 bg-gray-200 bg-opacity-5 hidden justify-center items-center">
                            <OrderDetails order={order} onClickCancel={() => setPopup('order_details', 'none')} />
                        </Box>

                        {/* Delete Order Popup */}
                        <Box id="delete" sx={{ right: language === 'en' && '0' }} className="w-4/5 h-screen fixed top-0 bg-gray-200 bg-opacity-5 hidden justify-center items-center">
                            <DeleteDialog onClickConfirm={deleteOrder} onClickCancel={() => setPopup('delete', 'none')} title={<FormattedMessage id="delete_order_title" />} subtitle={<FormattedMessage id="delete_order_description" />} />
                        </Box>

                        {/* Snackbar Alert */}
                        <SnackbarAlert open={openSnackBar} message={message} severity={type} onClose={() => setOpenSnackBar(false)} />
                    </Box>
            }
        </>
    );
}

export default Orders;