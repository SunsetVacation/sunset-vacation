import * as React from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Navigate, useNavigate } from 'react-router-dom';
import ManagementDashboard from '../ManagementDashboard/ManagementDashboard';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import './../../../App.css';
import NotificationMessage from '../NewProperty/NotificationMessage';
export default function ShowPropertyList(props) {
    let navigate = useNavigate();

    const [properties, setProperties] = React.useState([])
    const fetchProperties = async ()=>{
        fetch(`http://localhost:8000/hosting/propertylist/`, {
            method: 'GET',
            headers: { 
                'Content-Type': 'application/json' ,
                'Authorization' : `Bearer ${props.token}`
            }
        })
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
                console.log(response)
            })
            .catch((err) => {
                alert(err.message);
            })
    }
    React.useEffect(() => {
      fetchProperties();
        
    }, []);

    function getSelectedProperty(property) {
        props.setProperty(property)
        navigate('/showPropertyDetails/');
    }
    function  DeleteProperty(property) {
        console.log(property.propertyID)
        const requestOptions = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json',
        'Authorization': `Bearer ${props.token}` },
            body: JSON.stringify(props.property)
        };
        fetch(`http://localhost:8000/hosting/deleteProperty/` + `${property.propertyID}`, requestOptions)
        .then(response => response.json())
        .then(data => {
            console.log("delete successsfully")
            props.setflags("propertylist");
            navigate('/showProperty/Redirect');
        });


      }
   const resendPropertyForApproval = async (property)=>{
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json',
    'Authorization': `Bearer ${props.token}` },
     
    };
    fetch(`http://localhost:8000/message/rePublish/` + `${property.propertyID}/`, requestOptions)
    .then(response => response.json())
    .then(data => {
        fetchProperties();
    });

   }
    function showStatus(property){
        if(property.approved === true){
            return <Button  sx={{color: "black",fontFamily: "Lucida Handwriting", fontSize: "15px"}} variant="text" >Approved</Button>
        }else if(property.approved === false & property.published === false){
            return <Button  sx={{color: "black",fontFamily: "Lucida Handwriting", fontSize: "15px"}} variant="text" endIcon={<ArrowCircleRightIcon onClick={(event)=>{resendPropertyForApproval(property)}} />}  >Rejected</Button>

        }else if(property.approved===false & property.published === true){
            return <Button  sx={{color: "black",fontFamily: "Lucida Handwriting", fontSize: "15px"}} variant="text" >waiting for approval</Button>

        }
    }
    function tableData(properties){
        return(
            <TableBody>
            {properties.map((property) => (
                <TableRow
                    key={property.propertyID}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                    <TableCell component="th" scope="row">
                    <Button  sx={{color: "black",fontFamily: "Lucida Handwriting", fontSize: "15px"}} variant="text" value={property.title} onClick={() => { getSelectedProperty(property) }}>{property.title}</Button>

                    </TableCell>
                    <TableCell component="th" scope="row">
                        {showStatus(property)}
                        </TableCell>
                    {/* <TableCell  sx={{fontFamily:"Lucida Handwriting", fontSize:"15px"}}align="right"></TableCell> */}
                    <TableCell><Tooltip title="Delete">
                        <IconButton value={property.propertyID} onClick={()=>DeleteProperty(property)} >
                            <DeleteIcon />
                        </IconButton>
                    </Tooltip></TableCell>
                </TableRow>
            ))}
        </TableBody>
        )
    }
    function tableListing(properties) {
        return (
            <TableContainer component={Paper} sx={{ width: "60%", marginTop: "20px", marginLeft: "auto", marginRight: "auto" }} >
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead sx={{bgcolor:"#AED6F1 "}}>
                        <TableRow>
                            <TableCell sx={{ fontFamily: "Lucida Handwriting", fontSize: "20px" }}>Title</TableCell>
                            {/* <TableCell align="right">Calories</TableCell>
              <TableCell align="right">Fat&nbsp;(g)</TableCell>
      <TableCell align="right">Carbs&nbsp;(g)</TableCell>*/}
                            <TableCell align="right"></TableCell>
                            <TableCell align="right"></TableCell>

                        </TableRow>
                    </TableHead>
                   {tableData(properties)}
                </Table>
            </TableContainer>
        )
    }

    

    return (
        <div>
            {<ManagementDashboard />}

            <Typography sx={{marginTop:"50px", fontFamily:"Lucida Handwriting"}}align='center' variant="h5" component="h2">
 Your Listings
</Typography>;

            {tableListing(properties)}
        </div>
    );
}