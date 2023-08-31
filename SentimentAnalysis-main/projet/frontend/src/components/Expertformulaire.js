import React from 'react';
import './Expertform.css'
import TextField from '@mui/material/TextField';
import Input from '@mui/material/Input';
import Button from '@mui/material/Button';
import { useState ,useEffect,useContext,useRef} from 'react';
import AuthContext from '../context/AuthContext'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';



function Expertformulaire() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const data0 = queryParams.get('data0');
const data1 = queryParams.get('data1');
const data2 = queryParams.get('data2');
const data3 = queryParams.get('data3');
const data4 = queryParams.get('data4');

const [proprietaire,setproprietaire]=useState(data0);
  const [title,settitle]=useState(data1);
    const [description,setdescription]=useState(data2);
    const [im,setim]=useState('');
    const navigate = useNavigate();
    let {user} = useContext(AuthContext)
 

  async function addarticle()
  {   let data=new FormData()
      data.append("proprietaire",user.id)
      data.append("title",title)
      data.append("description",description)
      data.append("im",im)

      await axios.post(`http://127.0.0.1:8000/api/articles/`,data,
      { headers:{ 'Content-Type': 'multpart/form-data'}}
      ).then(resp=>{console.log(resp) 
        }).catch(err=>console.log(err))
       
        navigate('/App1') 
        window.location.reload()
   }
   
   async function editarticle()
   { 
    let data=new FormData()
      data.append("proprietaire",user.id)
      data.append("title",title)
      data.append("description",description)
      data.append("im",im ? im : data3)

      await axios.put(`http://127.0.0.1:8000/api/articles/${data4}/`,data,
      { headers:{ 'Content-Type': 'multpart/form-data'}}
      ).then(resp=>{console.log(resp) 
        }).catch(err=>console.log(err))
       
        navigate('/App1') 
        window.location.reload() 
      
   }
   

  return (
    <div className='bodycontainer'>
      <div className='body'>
      <input
        placeholder="Title..."
        type="text"
        value={title}
        onChange={(e)=>settitle(e.target.value)}
       
      /><br></br>
      <textarea 
        placeholder="Description..."
        
        value={description}
        onChange={(e)=>setdescription(e.target.value)}
       
      /><br></br>
      <input   
        type="file"
        accept="image/*"
        fullWidth
        margin="normal"
        
        onChange={(e)=>setim(e.target.files[0])}
        
      /><br></br>
      <div className='container'>
      <Button type="submit" variant="contained" color="primary" onClick={editarticle}>
        Submit
      </Button>
      </div>
      
    </div>
    </div>
    
  );
};

export default Expertformulaire;
