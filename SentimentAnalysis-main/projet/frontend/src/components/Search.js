import './Search.css';
import { useState,useEffect,useContext } from 'react';
import AuthContext from '../context/AuthContext'
import axios from 'axios'
import SearchIcon from '@mui/icons-material/Search';
import ArrowDropDownCircleIcon from '@mui/icons-material/ArrowDropDownCircle';
import ClearIcon from '@mui/icons-material/Clear';
import EditIcon from '@mui/icons-material/Edit';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import Expertformulaire from './Expertformulaire';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Expertform from './Expertformulaire';





function Search() {
    const [qestion,setqestion]=useState("");
    const [articles,setarticles]=useState([]);
    const [title,settitle]=useState("");
    const [description,setdescription]=useState("");
    const [im,setim]=useState(null);
    const [b,setb]=useState(false);
    const navigate = useNavigate();
    let {user} = useContext(AuthContext)
    

   
  function updatearticle(item) { 
    
    const updatedB = !item.b; 
  
    const data = {
      proprietaire:item.proprietaire,
      description: item.description,
      b: updatedB
    };
  
     
    fetch(`http://127.0.0.1:8000/api/articles/${item.id}/`, {
      method: 'PUT',
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
    .then(resp => resp.json())
    .then(data => {
      console.log(data); 
      getdata(); 
    })
    .catch(error => console.log(error));
  }
  
  
  
  
  
  
  

   function getdata()
   {
    fetch( 'http://127.0.0.1:8000/api/articles/',{
        'method':'GET',
        headers:{'Content-Type': 'application/json'}
      })
      .then(resp=>resp.json())
      .then(resp=>setarticles(resp["results"]))
      .catch(error=>console.log(error))
   }

    useEffect(()=>
    {
      getdata()
    },[])

    const handleAddClick = () => {
     
      
      navigate('/Expertform');
      

    }
    const handleUpdateClick = (item) => {
    
      navigate('/Expertform');
    }
    
  return (
    
    <div className="Search">
         <div className="cont">
         <input type="search" placeholder="Search..."
        onChange={(e)=>setqestion(e.target.value)}></input>
        <SearchIcon htmlColor='#40b2e5'/>
         </div>
        
         {articles.filter((item)=>{
        return qestion.toLocaleLowerCase()===''
        ?item
        :item.title.toLocaleLowerCase().includes(qestion)
       }
       ).map((item)=>(
        
        <div className="article" key={item.id}>
        <div className="arcontainer"><h3> {item.title}</h3>
        <Link to={`/Expertform?data0=${encodeURIComponent(item.proprietaire)}&data1=${encodeURIComponent(item.title)}&data2=${encodeURIComponent(item.description)}&data3=${encodeURIComponent(item.im)}
        &data4=${encodeURIComponent(item.id)}`}><EditIcon /></Link></div>
        <img src={item.im}/>
        
        
        {item.b&&(
            <div className="des">
            {item.description}
          </div>
        )}
        
        <ArrowDropDownCircleIcon htmlColor='#BDBDBD' onClick={()=>
          { setb(!item.b)
            settitle(item.title)
            setdescription(item.description)
            updatearticle(item)}}
            
            />
          
        
      </div>
       ))
       

       }
        <Button
      variant="contained"
      color="primary"
      startIcon={<AddIcon />}
      onClick={handleAddClick}
    >
      Add article
    </Button>
      
    </div>
    
  );
}

export default Search;
