import { Button } from '@mui/material'
import * as React from 'react'

export default function FacilitiesPage(props){
    return(
        <div>
            <h1>Facilities</h1>
            <Button onClick={()=>{props.setPageNo(props.pageNo + 1)}}>next</Button>
        </div>
    )
}