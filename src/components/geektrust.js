import "./geektrust.css"
import {useEffect, useState} from "react"
import axios from "axios"
export const GeekTrust=()=>{
    const [text,setText]=useState("")
    const [data,setData]=useState({admin:[]})
    const [pagesize,setPageSize]=useState({le:[]})
    const [page,setPage]=useState(1)
    
    
    useEffect(()=>{
       if(text!==""){   
       let searchFilter=data.admin.filter((e)=>{
               return e.name.startsWith(text) || e.email.startsWith(text) || e.role.startsWith(text) 
           })
          setData({...data,admin:[...searchFilter]})
       }
       else{
           getData()
       }
    },[text])

  useEffect(()=>{
    getFullData()
      
    },[])


    useEffect(()=>{
    
     getData (page)

    },[page])

    const getFullData=()=>{
        axios.get("https://rajfakeserver.herokuapp.com/admins")
        .then(function(response){
            let size=Math.ceil((response.data.length)/10)
            let arraySize=[]
            for(let i=1;i<=size;i++){
             arraySize.push(i)
            }
          
            setPageSize({...pagesize,le:[...arraySize]})
        })
    }
    const getData=(page)=>{
      
      axios.get(`https://rajfakeserver.herokuapp.com/admins?_page=${page}&_limit=10`)
      .then(function(response){
          
          setData({...data,admin:[...response.data]})
      })
    }
  
    const handleEdit=(id)=>{
        console.log(id)
        axios.patch(`https://rajfakeserver.herokuapp.com/admins/${id}`)
        .then(function(response){
            getFullData()
            getData()
        })
    }
    const handleDelete=(id)=>{
       
        axios.delete(`https://rajfakeserver.herokuapp.com/admins/${id}`)
      .then(function(response){
          getFullData()
          getData()
      })
    }
    const handleCheck=(id,status)=>{
      let flag=status?false:true;
      
        axios.patch(`https://rajfakeserver.herokuapp.com/admins/${id}`,{status:flag})
        .then(function(response){
            getData()
        })
    }
 
    return(
        <>
        <h1>Admin UI</h1>
        <input className="searchBar" placeholder="Search by name, email or role" onInput={(e)=>setText(e.target.value)}/>
        <table>
            <thead>
                <tr>  
                    <th>
                    <input type="checkbox" />
                    </th>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
            {data.admin.map((e, index) => {
            return (
              <tr key={index} className={e.status?"selected":"notSelected"}>
                <td>
                <input type="checkbox" onClick={()=>{handleCheck(e.id,e.status)}} checked={e.status} readOnly/>
                </td>
                <td>{e.id}</td>
                <td>{e.name}</td>
                <td>{e.email}</td>
                <td>{e.role}</td>
                <td ><img  src="https://img.icons8.com/external-kiranshastry-solid-kiranshastry/40/000000/external-edit-interface-kiranshastry-solid-kiranshastry.png" 
                alt="edit" onClick={()=>{handleEdit(e.id)}}/></td>
                <td><img src="https://img.icons8.com/material-rounded/35/000000/filled-trash.png" 
                alt="delete" onClick={()=>{handleDelete(e.id)}}/></td>
              </tr>
            );
          })}

            </tbody>
           
        </table>

        <div className="pagination">
            <div className="previous"><img src="https://img.icons8.com/ios-glyphs/25/000000/back.png" alt="prev" onClick={()=>setPage(page-1)}/></div>
           {pagesize.le.map((e,index)=>(
               <div key={index} className="firstPage" onClick={()=>setPage(e)}>{e}</div>
           ))}
            
     
            <div className="next"><img src="https://img.icons8.com/ios-glyphs/25/000000/forward.png"alt="next" onClick={()=>setPage(page+1)}/></div>
        </div>

        <div className="deleteSelected">
            <button>Delete Selected</button>
        </div>
        </>
    )
}