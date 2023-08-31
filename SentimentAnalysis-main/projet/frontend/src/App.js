import './App.css';
import { BrowserRouter as Router, Route , Routes} from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'

import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import SingupPage from './pages/SingupPage'
import ProfilePage from './pages/ProfilePage'
import Header from './components/Header'
import App1 from './components/App1';
import App2 from './components/PostsViewCy';
import PostsCy from './components/Posts_Cy';
import Expertform from './components/Expertformulaire';

function App() {
  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <Header/>
          <Routes>
            <Route element = {<HomePage/>} path="/" exact/>
            <Route element = {<LoginPage/>} path="/login"/>
            <Route element = {<SingupPage/>} path="/singup"/>
            <Route element = {<ProfilePage/>} path="/profile"/>
            <Route element = {<App1/>} path="/App1"/>
            <Route element = {<Expertform/>} path="/Expertform"/>
            <Route element = {<App2/>} path="/PostsCy"/>
          </Routes>
        </AuthProvider>
      </Router>

    </div>
  );
}

export default App;
