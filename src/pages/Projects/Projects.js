import { useContext, useEffect, useState } from "react";
import { useConstants } from "../../hooks/UseConstants";
import AuthContext from "../../context/AuthContext";
import { Avatar, Box, Button, CircularProgress, Paper, Table, TableBody, TableContainer, TableHead, TableRow, Typography, useTheme } from "@mui/material";
import { useWaits } from "../../hooks/UseWait";
import { usePopups } from "../../hooks/UsePopups";
import { useSearch } from "../../hooks/Search/UseSearch";
import { FormattedMessage, useIntl } from "react-intl";
import { useTableStyles } from "../../hooks/Table/UseTableStyles";
import useSnackBar from "../../hooks/SnackBar/UseSnackBar";
import { usePagination } from "../../hooks/Pagination/UsePagination";
import Fetch from "../../services/Fetch";
import AddIcon from '@mui/icons-material/Add';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import DeleteDialog from "../../popup/DeleteDialog";
import SnackbarAlert from "../../components/SnackBar";
import AddBanner from "../../popup/banner/AddBanner";
import UpdateBanner from "../../popup/banner/UpdateBanner";
import AddProject from "../../popup/project/AddProject";
import UpdateProject from "../../popup/project/UpdateProject";
import { useNavigate } from "react-router-dom";

function Projects() {
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
    const [projectsCounts, setProjectsCounts] = useState();
    const [projects, setProjects] = useState([]);
    const [project, setProject] = useState();
    const navigate = useNavigate();

    {/* Get Projects Function */ }
    const getProjects = async () => {
        let result = await Fetch(`${host}/api/projects?page=${page + 1}&search=${search}`, 'GET', null);
        if (result.status === 200) {
            setTotalPages(result.data.data.pagination.last_page);
            setProjectsCounts(result.data.data.pagination.total);
            setProjects(result.data.data.projects);
            setCurrentPage(page);
        }

        setGetWait(false);
    }


    {/* Delete Project Function */ }
    const deleteProject = async () => {
        let result = await Fetch(`${host}/api/projects/${project.id}`, 'DELETE', null);

        if (result.status === 200) {
            setProjects((prevProjects) => prevProjects.filter((prevProject) => prevProject.id !== project.id));
            setProjectsCounts(projectsCounts - 1);
            setSnackBar('success', <FormattedMessage id="deleted_success" />);
            setProject('');
        }
    }

    useEffect(() => {
        getProjects();
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
                                            <Typography variant="h5" className="py-2 px-3 max-sm:!text-lg"><FormattedMessage id='projects' /></Typography>
                                            <Button variant="contained" onClick={() => setPopup('add', 'flex')} className="!bg-yellow-500">
                                                <AddIcon />
                                                <FormattedMessage id='add_project' />
                                            </Button>
                                        </Box>

                                        <Box>
                                            <TableContainer className="" component={Paper} dir={language === 'en' ? 'ltr' : "rtl"}>
                                                {/* Top Table */}
                                                <Box className="min-h-12 py-2 px-2 flex justify-between items-center max-sm:flex-col">
                                                    <Box className="w-full flex items-center">
                                                        <Box className="w-2/4 relative mr-3 max-sm:w-full">
                                                            <input style={{ backgroundColor: theme.palette.background.default }} onChange={(e) => setSearch(e.target.value)} className="w-11/12 h-12 rounded-md border indent-14 outline-none max-sm:w-full" placeholder={intl.formatMessage({ id: "search_project" })} />
                                                            <SearchOutlinedIcon className="absolute top-1/2 -translate-y-1/2 right-3 text-gray-500" sx={{ right: language === 'en' && '90%' }} />
                                                        </Box>
                                                    </Box>
                                                    <Box className="flex w-2/4 items-center justify-end max-sm:mt-2 max-sm:w-full max-sm:justify-between">
                                                        <Typography variant="body1" className="!text-gray-500"><FormattedMessage id='total_projects' />: {projectsCounts}</Typography>
                                                    </Box>
                                                </Box>

                                                {/* Projects Table */}
                                                <Table className="" sx={{ minWidth: 700 }} aria-label="customized table">
                                                    <TableHead className="bg-gray-200">
                                                        <TableRow sx={{ backgroundColor: theme.palette.background.paper }}>
                                                            <StyledTableCell align={language === 'en' ? "left" : "right"}><FormattedMessage id='image' /></StyledTableCell>
                                                            <StyledTableCell align={language === 'en' ? "left" : "right"}><FormattedMessage id='title' /></StyledTableCell>
                                                            <StyledTableCell align={language === 'en' ? "left" : "right"}><FormattedMessage id='description' /></StyledTableCell>
                                                            <StyledTableCell align={language === 'en' ? "left" : "right"}><FormattedMessage id='client_name' /></StyledTableCell>
                                                            <StyledTableCell align={language === 'en' ? "left" : "right"}><FormattedMessage id='category' /></StyledTableCell>
                                                            <StyledTableCell align={language === 'en' ? 'left' : 'right'} className="!text-center"><FormattedMessage id='procedures' /></StyledTableCell>
                                                        </TableRow>
                                                    </TableHead>
                                                    <TableBody>
                                                        {projects.map((project, index) => (
                                                            <StyledTableRow key={index} className="hover:bg-gray-200 duration-100 cursor-pointer">
                                                                <StyledTableCell align={language === 'en' ? "left" : "right"} component="th" scope="row">
                                                                    {
                                                                            <Avatar className="w-10 h-10" src={`${host}/${project.cover_image}`} />
                                                                    }
                                                                </StyledTableCell>
                                                                <StyledTableCell align={language === 'en' ? "left" : "right"} className="">{project.title}</StyledTableCell>
                                                                <StyledTableCell align={language === 'en' ? "left" : "right"} className="">{project.description}</StyledTableCell>
                                                                <StyledTableCell align={language === 'en' ? "left" : "right"} className="">{project.client_name}</StyledTableCell>
                                                                <StyledTableCell align={language === 'en' ? "left" : "right"} className="">{project.category.category}</StyledTableCell>
                                                                <StyledTableCell align="right">
                                                                    <Box className="!flex justify-center items-center">
                                                                        <Button variant="contained" className="!ml-5 !bg-red-300 !font-bold !text-red-800 hover:!bg-red-500 hover:!text-white duration-300" onClick={(e) => { setProject(project); setPopup('delete', 'flex') }}><FormattedMessage id='delete' /></Button>
                                                                        <Button variant="contained" className="!bg-green-300 !font-bold !text-green-800 hover:!bg-green-500 hover:!text-white duration-300" onClick={(e) => { setProject(project); setPopup('update', 'flex') }}><FormattedMessage id='update' /></Button>
                                                                        <Button variant="contained" onClick={() => navigate(`${project.id}/images`)} className="!bg-orange-300 !font-bold !text-orange-800 hover:!bg-orange-500 hover:!text-white duration-300 !mx-2"><FormattedMessage id='images' /></Button>
                                                                        <Button variant="contained" onClick={() => navigate(`${project.id}/videos`)} className="!bg-orange-300 !font-bold !text-orange-800 hover:!bg-orange-500 hover:!text-white duration-300"><FormattedMessage id='videos' /></Button>
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

                        {/* Add New Project Popup */}
                        <Box id="add" sx={{ right: language === 'en' && '0' }} className="w-4/5 h-screen fixed top-0 bg-gray-200 bg-opacity-5 hidden justify-center items-center">
                            <AddProject setProjects={setProjects} onClickCancel={() => setPopup('add', 'none')} setSnackBar={setSnackBar} />
                        </Box>

                        {/* Update Project Popup */}
                        <Box id="update" sx={{ right: language === 'en' && '0' }} className="w-4/5 h-screen fixed top-0 bg-gray-200 bg-opacity-5 hidden justify-center items-center">
                            <UpdateProject project={project} onClickCancel={() => setPopup('update', 'none')} getProjects={getProjects} setSnackBar={setSnackBar} />
                        </Box>

                        {/* Delete Project Popup */}
                        <Box id="delete" sx={{ right: language === 'en' && '0' }} className="w-4/5 h-screen fixed top-0 bg-gray-200 bg-opacity-5 hidden justify-center items-center">
                            <DeleteDialog onClickConfirm={deleteProject} onClickCancel={() => setPopup('delete', 'none')} title={<FormattedMessage id="delete_project_title" />} subtitle={<FormattedMessage id="delete_project_description" />} />
                        </Box>

                        {/* Snackbar Alert */}
                        <SnackbarAlert open={openSnackBar} message={message} severity={type} onClose={() => setOpenSnackBar(false)} />
                    </Box>
            }
        </>
    );
}

export default Projects;