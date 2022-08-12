import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import {useNavigate} from 'react-router-dom';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import WbTwilightIcon from '@mui/icons-material/WbTwilight';
import HomeIcon from '@mui/icons-material/Home';
import CollectionsBookmarkIcon from '@mui/icons-material/CollectionsBookmark';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MailIcon from '@mui/icons-material/Mail';
import ApprovalIcon from '@mui/icons-material/Approval';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbDownOutlinedIcon from '@mui/icons-material/ThumbDownOutlined';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import CheckBoxOutlineBlankOutlinedIcon from '@mui/icons-material/CheckBoxOutlineBlankOutlined';
import RateReviewOutlinedIcon from '@mui/icons-material/RateReviewOutlined';

import {styled, alpha} from '@mui/material/styles';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import EditIcon from '@mui/icons-material/Edit';
import Divider from '@mui/material/Divider';
import ArchiveIcon from '@mui/icons-material/Archive';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import LocalOfferRoundedIcon from '@mui/icons-material/LocalOfferRounded';
import CardGiftcardRoundedIcon from '@mui/icons-material/CardGiftcardRounded';
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import {useState} from "react";
import DetailsIcon from "@mui/icons-material/Details";
import {IconButton} from "@mui/material";
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import DesktopMacIcon from "@mui/icons-material/DesktopMac";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';

const StyledMenu = styled((props) => (
    <Menu
        elevation={0}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
        }}
        {...props}
    />
))(({theme}) => ({
    '& .MuiPaper-root': {
        borderRadius: 6,
        marginTop: theme.spacing(1),
        minWidth: 180,
        color:
            theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
        boxShadow:
            'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
        '& .MuiMenu-list': {
            padding: '4px 0',
        },
        '& .MuiMenuItem-root': {
            '& .MuiSvgIcon-root': {
                fontSize: 18,
                color: theme.palette.text.inherit,
                marginRight: theme.spacing(1.5),
            },
            '&:active': {
                backgroundColor: alpha(
                    theme.palette.primary.main,
                    theme.palette.action.selectedOpacity,
                ),
            },
        },
    },
}));

export default function AdminDashboard(props) {
    const navigate = useNavigate();
    const [newCategory, setNewCategory] = useState("");


    const useReservation = (event) => {
        navigate("/reservation");
    }
    const useNotification = (event) => {
        navigate("/notification");
    }
    const useHandleHostNewPropertyButton = (event) => {
        navigate("/hostproperty");
    }
    const useOfferpage = (event) => {
        navigate("/createOffer");
    }
    const useMyoffer = (event) => {
        navigate("/showOffers");
    }
    const useHostingRedirect = (event) => {
        navigate("/hosting");
    }
    const useShowProperties = (event) => {
        navigate("/showProperties")
    }

    function mouseOver(event) {
        event.target.style.color = "black";
    }

    function mouseOut(event) {
        event.target.style.color = "white";
    }
    function changeEdit(event) {
        setEdit(!edit);
    }

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = (event) => {
        setAnchorEl(null);
        console.log(event.target.value);
    };

    function changeDescription(event) {
        props.property.description = event.target.value;
    }

    function handleSubmit(event) {
        props.property.description = event.target.value;
    }

    function handleSubmitApprove(event) {
        setMessage(event.target.value);
        const data={
            message: message
        }
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        };
        setMessage("");
        setEdit(!edit);
        fetch(`http://localhost:8000/hosting/approve/`+propertyId, requestOptions)
            .then((response) => {
                if (response.ok) {
                    return response
                }
                else {
                    let err = new Error(response.status + ": " + response.text);
                    throw err;
                }
            })
            .then((response) => response.json())
            .then((response) => {
                setProperties(response.properties)
            })
            .catch((err) => {
                alert(err.message);
            })
    }

    function handleSubmitReject(event) {
        setMessage(event.target.value);
        const data={
            message: message
        }
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        };
        setMessage("");
        setEdit(!edit);
        fetch(`http://localhost:8000/hosting/reject/`+propertyId, requestOptions)
            .then((response) => {
                if (response.ok) {
                    return response
                }
                else {
                    let err = new Error(response.status + ": " + response.text);
                    throw err;
                }
            })
            .then((response) => response.json())
            .then((response) => {
                setProperties(response.properties)
            })
            .catch((err) => {
                alert(err.message);
            })

    }

    function showProperty(property) {
        props.setProperty(property);
        navigate('/showPropertyDetails/'+property.propertyID);
    }
    function editStatus(property) {
        setPropertyId(property.propertyID);
        setEdit(!edit);
    }
    function changeNewCategory(event) {
        setNewCategory(event.target.value);
    }

    function addCategory(){
        const data={
            category: newCategory
        }
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        };
        setNewCategory("");
        fetch(`http://localhost:8000/hosting/addCategory/`, requestOptions)
            .then((response) => {
                if (response.ok) {
                    return response
                }
                else {
                    let err = new Error(response.status + ": " + response.text);
                    throw err;
                }
            })
            .then((response) => response.json())
            .then((response) => {
                setCategories(response.categories)
            })
            .catch((err) => {
                console.log(err.message);
            })

    }

    function showAdmin(props) {
        return (
            <div>
                <Box
                    component="form"
                    sx={{
                        '& .MuiTextField-root': {m: 0.5, width: '35ch', height:'10ch'},
                    }}
                    noValidate
                    m={0.5}
                    p={0.5}
                    autoComplete="off"
                >
                    <Grid container>
                        <Grid item xs={1}/>
                        <Grid item xs={11}>
                            <label><p style={{
                                "fontFamily": "Lucida Handwriting",
                                "fontSize": "15px",
                                "color": "black"
                            }}>Category</p></label>
                            <TextField
                                id="outlined-basic"
                                label="Category Name"
                                value={newCategory}
                                onChange={changeNewCategory}
                                />
                            <Button variant="contained" onClick={addCategory}
                                    sx={{bgcolor: '#282c34', marginTop: 2, marginLeft: 4 }} endIcon={<CategoryOutlinedIcon sx={{ color: 'white' }}/>}>Add Category
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </div>
        )
    }

    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar position="static" sx={{bgcolor: "#C4036C"}}>
                <Toolbar>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{display: {xs: 'none', sm: 'block'}}}
                    >
                        <p style={{"fontFamily": "Jokerman", "fontSize": "25px"}}>AdminDashboard</p>

                    </Typography>
                    {/* <Button disabled></Button> */}

                    <Button
                        id="demo-customized-button"
                        aria-controls={open ? 'demo-customized-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        variant="inherit"
                        sx={{fontFamily: "Lucida Handwriting", fontSize: "15px", paddingLeft: "30px"}}
                        disableElevation
                        onClick={handleClick}
                        endIcon={<KeyboardArrowDownIcon/>}
                    >
                        Menu
                    </Button>
                    <StyledMenu
                        id="demo-customized-menu"
                        MenuListProps={{
                            'aria-labelledby': 'demo-customized-button',
                        }}
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                    >
                        <MenuItem value="offer" onClick={useOfferpage} disableRipple>
                            <LocalOfferRoundedIcon/>
                            Create Offer
                        </MenuItem>
                        <MenuItem onClick={handleClose} disableRipple>
                            <CardGiftcardRoundedIcon/>
                            Create Gift card
                        </MenuItem>
                        <MenuItem onClick={useReservation} disableRipple>
                            <CollectionsBookmarkIcon/>
                            Reservation
                        </MenuItem>
                        <MenuItem value="offer" onClick={useNotification} disableRipple>
                            <NotificationsIcon/>
                            Notification
                        </MenuItem>
                        <MenuItem onClick={handleClose} disableRipple>
                            <MailIcon/>
                            Inbox
                        </MenuItem>
                    </StyledMenu>
                </Toolbar>
            </AppBar>
            {showAdmin(props)}
        </Box>
    );
}
