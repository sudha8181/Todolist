import React, { useState,useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import List from "./List";
import './todo.css';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DescriptionIcon from '@mui/icons-material/Description';


//to get the data from localstorage

const getLocalItems=()=>{
    let lists=localStorage.getItem('lists');
    console.log(lists);

    if(lists){
        return JSON.parse(localStorage.getItem('lists'));
    }
    else
    return [];
}

const Todo=()=>{
    const[inputData,setInputData]=useState('')
    const[data,setData]=useState(getLocalItems());
    const[submitToggle,setSubmitToggle]=useState(true);
    const[edit,setEdit]=useState(null);

    const inputEvent=((event)=>{
       setInputData(event.target.value);
     })


    // to add the data to todolist
    const addData=()=>{
        // empty field validation
        if(!inputData){
            alert("plz fill the data")
        }
        //updating value 
        else if (inputData && !submitToggle){
            setData(data.map((elem)=>{
            if(edit===elem.id){
            return {...elem,name:inputData};
                }
            return elem;   
            }));
                
            setSubmitToggle(true);
            setInputData("");
            setEdit(null);
         }
        //adding value 
        else {
        const allInputData={ id:new Date().getTime().toString(), name:inputData}   
        setData([...data,allInputData]);
        setInputData("");
        }
      }

    // delete the todolist from list 
    const deleteItem=(val)=>{
      setData((olditem)=>{
        return olditem.filter((value)=>{
            return value.id!==val;
        })
      })
    }


    //edit data 
    const editData=(id)=>{
       let getEditValue=data.find((value)=>{
         return id===value.id;
       });
       alert(getEditValue);
       setInputData(getEditValue.name);
       setSubmitToggle(false);
       setEdit(id);
    
    }

    // to set the data to the localstorage.
    useEffect(()=>{
        localStorage.setItem('lists',JSON.stringify(data));
    },[data]);

    
    return(<>
        <div className="container ">
            <div className="main-div  mx-auto d-flex flex-column  justify-content-start align-items-center ps-2 ">
                <DescriptionIcon style={{fontSize:"80px"}}></DescriptionIcon>
                <h5 style={{color:"white"}} className="my-3 ps-5">Add your List Here ✌️</h5>  
                <div className="input d-flex flex-row bg-light px-3 ms-4 mr-2 py-2 ">
                   ✍️ <input type="text" className="inputField mx-auto w-75 px-3 "  onChange={inputEvent} value={inputData} style={{border:"none",outline:"none"}}/>
                        {
                        submitToggle?(
                            <AddIcon onClick={addData} ></AddIcon>
                            
                        ):
                        (<EditIcon onClick={addData} style={{color:"green"}}></EditIcon>)
                        }
                </div>
             </div>
            {/* generating list */} 
            <ul>
              {data.map((val)=>{
                return <List
                  index={val.id}
                  value={val.name}
                  deleteData={deleteItem}
                  editItem={editData}                                    
                            />
                })
               }
            </ul>
        </div>
    </>);
}

export default Todo;