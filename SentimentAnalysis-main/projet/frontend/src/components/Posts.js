import './Posts.css';
import Share from './Share.js';
import { useState,useEffect,useContext} from 'react';
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import ClearIcon from '@mui/icons-material/Clear';
import InfiniteScroll from "react-infinite-scroll-component"
import axios from 'axios'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import SentimentNeutralIcon from '@mui/icons-material/SentimentNeutral';
import AuthContext from '../context/AuthContext'


function Posts() {
  const [posts,setposts]=useState([])
  const [hasmore,sethasmore]=useState(true);
  const [next,setnext]=useState('http://127.0.0.1:8000/api/PostVerifie/');
  const [nextUnv,setnextUnv]=useState('http://127.0.0.1:8000/api/posts/');
  const [Unvposts,setUnvposts]=useState([])
  const [show,setshow]=useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [authors, setAuthors] = useState({});
  const [bv, setbv] = useState({});
  let {user} = useContext(AuthContext)
  
    async function NomDuPro(id) {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/UserFullName/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: id }),
        });
        const data = await response.json();
       
        return(data.nom)
        
      } catch (error) {
        console.log(error);
      }
      
    }
    async function verifPost(id,sentiment){
      try {
        let postverifie = (await axios.get(`http://127.0.0.1:8000/api/posts/${id}/`)).data
        let data = {
          "proprietaire" : postverifie.proprietaire ,
          "description" : postverifie.description ,
          "im": postverifie.im,
          "vd" : postverifie.vd,
          "sentiment" : sentiment
        }
        await axios.delete(`http://127.0.0.1:8000/api/posts/${id}/`).then(() => {
          const updatedPosts = Unvposts.filter(p => p.id !== id);
         
          setUnvposts(updatedPosts);
        }).catch(err => {
          console.error(err);
        });
        await axios.post('http://127.0.0.1:8000/api/PostVerifie/', data, {
          headers: { 'Content-Type': 'multipart/form-data' }
        })
        }
      catch (error) {
        console.log(error);
      }
    }
    useEffect(() => {
      async function getAuthors() {
        const newAuthors = {};
        for (const post of Unvposts) {
          const authorName = await NomDuPro(post.id);
          newAuthors[post.id] = authorName;
        }
        setAuthors(newAuthors);
      }
      getAuthors();
    }, [Unvposts]);

    useEffect(() => {
      async function getbv() {
        const newbv = {};
        for (const post of Unvposts) {
          newbv[post.id] = post.bv;
        }
        setbv(newbv);
      }
      getbv();
    }, [Unvposts]);

  async function deletepost(post) {
    let postsupp = (await axios.get(`http://127.0.0.1:8000/api/posts/${post.id}/`)).data
    let data = {
      "proprietaire" : postsupp.proprietaire ,
      "description" : postsupp.description ,
      "im": postsupp.im,
      "vd" : postsupp.vd 
    }
    await axios.delete(`http://127.0.0.1:8000/api/posts/${post.id}/`)
    .then(() => {
      const updatedPosts = Unvposts.filter(p => p.id !== post.id);
     
      setUnvposts(updatedPosts);
    }).catch(err => {
      console.error(err);
    });
    await axios.post('http://127.0.0.1:8000/api/PostSupp/', data, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
  }
  
  function updateUnvpost(newstate)
  {
    setUnvposts(newstate)
  }
  
   function getUnverifiedData()
  {
    fetch( nextUnv,{
       'method':'GET',
       headers:{'Content-Type': 'application/json'}
     })
     .then(resp=>resp.json())
     .then(resp=>{setUnvposts(prevUnvPosts => [...prevUnvPosts, ...resp.results])
      setnextUnv(resp.next)
     sethasmore(!!resp.next)
   })
     .catch(error=>console.log("ddd"))
     
  }

  useEffect(()=>
   {
    getUnverifiedData()
   },[])

  return (


   <div>
     
     <InfiniteScroll
  dataLength={Unvposts.length} 
  next={getUnverifiedData}
  hasMore={hasmore}
  loader={<h4>Loading...</h4>}
  endMessage={
    <p style={{ textAlign: 'center' }}>
      <b>Yay! You have seen it all</b>
    </p>
  }>
 

{Unvposts.map(post=>(
  <div className="post">
  <div className="container">
    <div className="user">
      
        <div className="user1">
        <img src={require('./user1.png')} alt="" />
        <h3 className="name" >{authors[post.id]}</h3> 
          </div>          
        
        
        <div className="dropdown">
        <MoreVertIcon htmlColor='#424242' onClick={() => {
  const currentValue = bv[post.id];
  const updatedBv = { ...bv, [post.id]: !currentValue };
  setbv(updatedBv);
}}/>

          
        {bv[post.id] && (
          <ul className="dropdown-menu">
            <li onClick={()=> verifPost(post.id,1)}>
            <AddCircleOutlineIcon  htmlColor='#9CCC65'/>
             <span>Positive</span>
            </li>
            <li onClick={()=> verifPost(post.id,0)}>
            <SentimentNeutralIcon   htmlColor='#FFD54F'/>
             <span>Neutre</span>
            </li>
            <li onClick={()=> verifPost(post.id,-1)}>
            <RemoveCircleOutlineIcon  htmlColor='#1E88E5'/>
              <span>Negative</span>
            </li>
            <li   onClick={()=> deletepost(post)}>
            <ClearIcon htmlColor='red'/>
            <span>Supprimer</span> 
            </li>
          </ul>
        )}
      </div>
        

    </div>
    <div className="content">
      <p>{post.description}</p>
      {
        post.im&&(
          <img src={post.im} alt="" />
        )
      }
      {
        post.vd&&(
          <video src={post.vd} alt="" />
        )
      }
      
    </div>
    
  </div>
</div>
))}
</InfiniteScroll>
   </div>
);
}

export default Posts;