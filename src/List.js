import React from "react";
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import "./List.css";

const List=(Props)=>{
return(
<>
    <div className="list bg-light my-3 d-flex mx-auto justify-content-between align-items-center px-3 ">
        
        <p className="pt-3 ps-1">{Props.value}</p>

        <div className="d-flex justify-content-between align-items-center  py">
            <DeleteOutlineIcon onClick={ ()=>{Props.deleteData(Props.index)}} style={{color:"red"}}>delete</DeleteOutlineIcon>
            <EditIcon onClick={()=>{Props.editItem(Props.index)}} style={{color:"green"}}>Edit</EditIcon>
        </div>
    
    </div>
   
    </>
);
}

export default List;