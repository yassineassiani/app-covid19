import { createContext, useState} from 'react'
import { useNavigate} from 'react-router-dom'

const AuthContext = createContext()

export default AuthContext;


export const AuthProvider = ({children}) => {
    let [user, setUser] = useState(()=> localStorage.getItem('User') ? JSON.parse(localStorage.getItem('User')) : null)

    const history = useNavigate()

    let loginUser = async (e )=> {
        e.preventDefault()
        let response = await fetch('http://127.0.0.1:8000/api/login/', {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({'email':e.target.email.value, 'password':e.target.password.value})
        })
        

        if(response.status === 200){
            let data = await response.json()
            setUser(data)
            localStorage.setItem('User', JSON.stringify(data))
            history('/')
        }else{
            alert('Something went wrong!')
        }
    }

    let singup = async (e )=> {
        e.preventDefault()
        console.log(e.target)
        if(e.target.password.value !== e.target.Conf_password.value ){
            alert('Mot de passe de confirmation incorrecte!!!')
        }
        else{
        let response = await fetch('http://127.0.0.1:8000/api/signup/', {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({'email':e.target.email.value, 'password':e.target.password.value, 
            'first_name':e.target.first_name.value ,'last_name':e.target.last_name.value, 
            'Sexe':e.target.Sexe.value, 'DateDeNaissance':e.target.DateDeNaissance.value})
        })


        if(response.status === 201){
            history('/login')
        }else{
            alert('Something went wrong!')
        }
    }
    }
    

    let logoutUser = () => {
        setUser(null)
        localStorage.removeItem('User')
        history('/login')
    }



    let contextData = {
        user:user,
        loginUser:loginUser,
        logoutUser:logoutUser,
        singup:singup
    }



    return(
        <AuthContext.Provider value={contextData} >
            {children}
        </AuthContext.Provider>
    )
}
