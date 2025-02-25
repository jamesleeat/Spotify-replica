import logo from '../../assets/Spotify-logo.svg';
import spotifyIcon from '../../assets/Spotify-Icon.svg';
import { HiHome, HiSearch } from 'react-icons/hi'
import {BsFillPlusSquareFill} from 'react-icons/bs'
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import './SideBar.css'
import { SaveIcon } from '../SaveICon';
import { useState } from 'react';
import { CreatePlaylistForm } from '../CreatePlaylistForm';
import { Modal } from '../Modal';


export const SideBar = () => {

    const { logged } = useSelector(state => state.log)
    const [openModal, setOpenModal]= useState(false)
    return (
        <aside className='side-bar'>
            <div className='logo'>
                <img className='logo-desktop' src={logo} alt='spotify logo' />
                <img className='logo-mobile' src={spotifyIcon} alt='spotify logo' />
            </div>
            <nav className='nav-bar'>
                <NavLink to='/' className='nav-bar-item'>
                    <span><HiHome /></span>
                    <p>Home</p>
                </NavLink>
                <NavLink to='search' className='nav-bar-item'>
                    <span><HiSearch /></span>
                    <p>Search</p>
                </NavLink>
                {logged &&
                    <>
                        <NavLink to='collection/tracks' className='nav-bar-item'>
                            <span><SaveIcon width='24px' height='24px' /></span>
                            <p>Saved tracks</p>
                        </NavLink>
                        <div className='nav-bar-item' onClick={()=>setOpenModal(true)}>
                            <span><BsFillPlusSquareFill/></span>
                            <p>Create playlist</p>
                        </div>
                    </>
                }
            </nav>
                {openModal&&<Modal>
                    <CreatePlaylistForm setOpenModal={setOpenModal}/>
                </Modal> }
        </aside>
    )
}
