import { Box, Button, CircularProgress, Paper, Table, TableBody, TableContainer, TableHead, TableRow, Typography, useTheme } from "@mui/material";
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
import { useNavigate, useParams } from "react-router-dom";
import AddSubCategory from "../../popup/category/AddSubCategory";
import UpdateSubCategory from "../../popup/category/UpdateSubCategory";

function SubCategories() {
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
    const [subCategoriesCounts, setSubCategoriesCounts] = useState();
    const [subCategories, setSubCategories] = useState([]);
    const [subCategory, setSubCategory] = useState();
    const param = useParams();

    {/* Get Sub Categories Function */ }
    const getSubCategories = async () => {
        let result = await Fetch(`${host}/api/sub-categories/category/${param.id}?search=${search}`, 'GET', null);
        if (result.status === 200) {
            setSubCategoriesCounts(result.data.data.length);
            setSubCategories(result.data.data);
        }

        setGetWait(false);
    }

    {/* Delete Sub Category Function */ }
    const deleteSubCategory = async () => {
        let result = await Fetch(`${host}/api/sub-categories/${subCategory.id}`, 'DELETE', null);

        if (result.status === 200) {
            setSubCategories((prevSubCategories) => prevSubCategories.filter((prevSubCategory) => prevSubCategory.id !== subCategory.id));
            setSubCategoriesCounts(subCategoriesCounts-1);
            setSnackBar('success', result.data.message);
            setSubCategory('');
        }
    }

    useEffect(() => {
        getSubCategories();
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
                                            <Typography variant="h5" className="py-2 px-3 max-sm:!text-lg"><FormattedMessage id='sub_categories' /></Typography>
                                            <Button variant="contained" onClick={() => setPopup('add', 'flex')} className="!bg-yellow-500">
                                                <AddIcon />
                                                <FormattedMessage id='add_sub_category' />
                                            </Button>
                                        </Box>


                                        <Box>
                                            <TableContainer className="" component={Paper} dir={language === 'en' ? 'ltr' : "rtl"}>
                                                {/* Top Table */}
                                                <Box className="min-h-12 py-2 px-2 flex justify-between items-center max-sm:flex-col">
                                                    <Box className="w-full flex items-center">
                                                        <Box className="w-2/4 relative mr-3 max-sm:w-full">
                                                            <input style={{ backgroundColor: theme.palette.background.default }} onChange={(e) => setSearch(e.target.value)} className="w-11/12 h-12 rounded-md border indent-14 outline-none max-sm:w-full" placeholder={intl.formatMessage({ id: "search_sub_category" })} />
                                                            <SearchOutlinedIcon className="absolute top-1/2 -translate-y-1/2 right-3 text-gray-500" sx={{ right: language === 'en' && '90%' }} />
                                                        </Box>
                                                    </Box>
                                                    <Box className="flex w-2/4 items-center justify-end max-sm:mt-2 max-sm:w-full max-sm:justify-between">
                                                        <Typography variant="body1" className="!text-gray-500"><FormattedMessage id='total_sub_categories' />: {subCategoriesCounts}</Typography>
                                                    </Box>
                                                </Box>

                                                {/* Sub Categories Table */}
                                                <Table className="" sx={{ minWidth: 700 }} aria-label="customized table">
                                                    <TableHead className="bg-gray-200">
                                                        <TableRow sx={{ backgroundColor: theme.palette.background.paper }}>
                                                            <StyledTableCell align={language === 'en' ? "left" : "right"}><FormattedMessage id='sub_category' /></StyledTableCell>
                                                            <StyledTableCell align={language === 'en' ? 'left' : 'right'} className="!text-center"><FormattedMessage id='procedures' /></StyledTableCell>
                                                        </TableRow>
                                                    </TableHead>
                                                    <TableBody>
                                                        {subCategories.map((subCategory, index) => (
                                                            <StyledTableRow key={index} className="hover:bg-gray-200 duration-100 cursor-pointer">
                                                                <StyledTableCell align={language === 'en' ? "left" : "right"} className="">{subCategory.sub_category}</StyledTableCell>
                                                                <StyledTableCell align="right">
                                                                    <Box className="!flex justify-center items-center">
                                                                        <Button variant="contained" className="!bg-red-300 !font-bold !text-red-800 hover:!bg-red-500 hover:!text-white duration-300 !ml-2" onClick={(e) => { setSubCategory(subCategory); setPopup('delete', 'flex') }}><FormattedMessage id='delete' /></Button>
                                                                        <Button variant="contained" className="!bg-green-300 !font-bold !text-green-800 hover:!bg-green-500 hover:!text-white duration-300 !ml-2" onClick={(e) => { setSubCategory(subCategory); setPopup('update', 'flex') }}><FormattedMessage id='update' /></Button>
                                                                    </Box>
                                                                </StyledTableCell>
                                                            </StyledTableRow>
                                                        ))}
                                                    </TableBody>
                                                </Table>
                                            </TableContainer>
                                        </Box>
                                    </Box>
                            }
                        </Box>

                        {/* Add New Sub Category Popup */}
                        <Box id="add" sx={{ right: language === 'en' && '0' }} className="w-4/5 h-screen fixed top-0 bg-gray-200 bg-opacity-5 hidden justify-center items-center">
                            <AddSubCategory setSubCategories={setSubCategories} onClickCancel={() => setPopup('add', 'none')} setSnackBar={setSnackBar} />
                        </Box>

                        {/* Update Sub Category Popup */}
                        <Box id="update" sx={{ right: language === 'en' && '0' }} className="w-4/5 h-screen fixed top-0 bg-gray-200 bg-opacity-5 hidden justify-center items-center">
                            <UpdateSubCategory subCategory={subCategory} onClickCancel={() => setPopup('update', 'none')} getSubCategories={getSubCategories} setSnackBar={setSnackBar} />
                        </Box>

                        {/* Delete Category Popup */}
                        <Box id="delete" sx={{ right: language === 'en' && '0' }} className="w-4/5 h-screen fixed top-0 bg-gray-200 bg-opacity-5 hidden justify-center items-center">
                            <DeleteDialog onClickConfirm={deleteSubCategory} onClickCancel={() => setPopup('delete', 'none')} title={<FormattedMessage id="delete_sub_category_title" />} subtitle={<FormattedMessage id="delete_sub_category_description" />} />
                        </Box>

                        {/* Snackbar Alert */}
                        <SnackbarAlert open={openSnackBar} message={message} severity={type} onClose={() => setOpenSnackBar(false)} />
                    </Box>
            }
        </>
    );
}

export default SubCategories;