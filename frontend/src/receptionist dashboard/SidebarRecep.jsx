import './sidebardoc.scss'
import DashboardIcon from '@mui/icons-material/Dashboard';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { Link, useNavigate } from 'react-router-dom';
import MessageIcon from '@mui/icons-material/Message';
import { FaUserInjured } from 'react-icons/fa';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios'

function SidebarRecep() {
  const { user, dispatch } = useContext(AuthContext)
  let navigate = useNavigate()
  const handleLogout = async () => {
    try {
     
      const removeToken = await axios.get("/api/receptionist/data/removetoken")
      if (removeToken) {
        dispatch({ type: "LOGOUT" })
        navigate('/');
      }
    }
    catch (error) {
      console.log(error)
    }
  };
  return (
    <div className='sidebar'>
      <div className="top">
        <Link to={'/recep/dashboard'} style={{ textDecoration: "none" }}>
          <span className="logo">Receptionist</span>
        </Link>
      </div>
      <hr />
      <div className="center">
        <ul>
          <p className="title">MAIN</p>
          <Link to={'/recep/dashboard'} style={{ textDecoration: "none" }}>
          <li>
            <DashboardIcon className='icon' />
            <span>Dashboard</span>
          </li>
          </Link>
          
          <p className="title">Profile</p>
          <Link to={'/recep/patient'} style={{ textDecoration: "none" }}>
            <li>
              <FaUserInjured className='icon' />
              <span>Patient</span>
            </li>
          </Link>
          <p className="title">Message</p>
          <Link to={'/recep/messages'} style={{ textDecoration: "none" }}>
          <li>
            <MessageIcon className='icon' />
            <span>Message</span>
          </li>
          </Link>
          <li>
            <NotificationsOutlinedIcon className='icon' />
            <span>Notifications</span>
          </li>

          <p className="title">USER</p>

          <li>
            <AccountCircleOutlinedIcon className='icon' />
            <span> {user.name} </span>
          </li>
          <li>
            <ExitToAppIcon className='icon' />
            <span  onClick={handleLogout}>Log Out</span>
          </li>
        </ul>
      </div>
     
    </div>
  )
}

export default SidebarRecep