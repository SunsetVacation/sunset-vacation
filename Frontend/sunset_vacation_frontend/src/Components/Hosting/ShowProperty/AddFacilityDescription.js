import * as React from 'react';
import EditIcon from '@mui/icons-material/Edit';
import ManagementDashboard from '../ManagementDashboard/ManagementDashboard';
import { Button, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import InsertPhotoOutlinedIcon from '@mui/icons-material/InsertPhotoOutlined';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import DetailsIcon from '@mui/icons-material/Details';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import DesktopMacIcon from '@mui/icons-material/DesktopMac';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import DescriptionIcon from '@mui/icons-material/Description';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
export default function ShowLocation(props) {
  let navigate = useNavigate();

  const [prop, setProp] = React.useState({});
  var [facDes,setFacDes]=React.useState([]);


  const useLocation = (event) => {
    navigate("/showPropertyDetails/location");
  }
  const useDescription = (event) => {
    navigate('/showPropertyDetails/description');
  }
  const useFaq = (event) => {
    navigate('/showPropertyDetails/faq');
  }
  const useCatagory = (event) => {
    navigate('/showPropertyDetails/catagory');
  }
  const useFacility = (event) => {
    navigate('/showPropertyDetails/facility');
  }
  const useHome = (event) => {
    navigate('/showPropertyDetails');
  }
  React.useEffect(() => {
    fetch(`http://localhost:8000/hosting/getProperty/` + `${props.property.propertyID}`)
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
        
        setProp(response.property)
        
      })
      .catch((err) => {
        alert(err.message);
      })
  },[])
  function SetDescription(event,fac) {
    let idx = props.selectedAmenityList.indexOf(fac);
    console.log("fac: "+fac);

  }
  
  
 
  function handleSubmit(event) {
    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(props.property)
    };
    fetch(`http://localhost:8000/hosting/updateProperty/` + `${props.property.propertyID}`, requestOptions)
      .then(response => response.json())
      .then(data => {
        console.log("updated successsfully")
      });


  }

  function AddDescription(props){
    return(
        <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 1, width: '40ch' },
        }}
        noValidate
        m={2}
        p={2}
        autoComplete="off"
    >
      <Grid container>
       {props.selectedAmenityList.map((fac)=>(
         
         <Grid item xs={6}>
         <label><p style={{ "fontFamily": "Lucida Handwriting", "fontSize": "15px", "color": "black" }}>{fac}</p></label>
         <TextField id="outlined-basic" onChange={()=>{SetDescription({fac})}}  variant="outlined" />
         </Grid>
       ))}
        
      </Grid>
    </Box>
    )
  }
  function showPropertyNavbar(props) {
    return (
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" sx={{ bgcolor: "inherit" }}>
          <Toolbar>

            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ display: { xs: 'none', sm: 'block' } }}
            >
              <p style={{ "fontFamily": "Lucida Handwriting", "fontSize": "25px", "color": "black" }}>{prop.title}
                &nbsp;&nbsp;&nbsp;<IconButton><EditIcon /></IconButton></p>
            </Typography>
          </Toolbar>
        </AppBar>
        <AppBar position='static' color='inherit' >
          <Toolbar>
            <Button onClick={useHome} color="inherit" sx={{ fontFamily: "Lucida Handwriting", fontSize: "15px", color: "black" }} >Images</Button><IconButton><InsertPhotoOutlinedIcon sx={{ color: 'black' }} /></IconButton>
            <Button onClick={useCatagory} color="inherit" sx={{ fontFamily: "Lucida Handwriting", fontSize: "15px", color: "black" }} >Catagory</Button><IconButton><DetailsIcon sx={{ color: 'black' }} /></IconButton>
            <Button onClick={useLocation} color="inherit" sx={{ fontFamily: "Lucida Handwriting", fontSize: "15px", color: "black" }} >Location</Button><IconButton><LocationOnIcon sx={{ color: 'black' }} /></IconButton>
            <Button onClick={useFacility} color="inherit" sx={{ fontFamily: "Lucida Handwriting", fontSize: "15px", color: "black" }} >Facilities & Safety Items</Button><IconButton><DesktopMacIcon sx={{ color: 'black' }} /></IconButton>
            <Button onClick={useDescription} color="inherit" sx={{ fontFamily: "Lucida Handwriting", fontSize: "15px", color: "black" }} >Description,price & Cancellation policy</Button><IconButton><DescriptionIcon sx={{ color: 'black' }} /></IconButton>
            <Button onClick={useFaq} color="inherit" sx={{ fontFamily: "Lucida Handwriting", fontSize: "15px", color: "black" }} >Faq</Button><IconButton><QuestionAnswerIcon sx={{ color: 'black' }} /></IconButton>
          </Toolbar>
        </AppBar>
      </Box>
    )
  }
  
  return (
    <div>

      <ManagementDashboard />

      {showPropertyNavbar(props)}
      {AddDescription(props)}

    </div>
  );
}