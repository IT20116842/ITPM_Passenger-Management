import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import { NewButton } from './NewButton';
import '../style/Navbar.css';
import { ProfileDropdown } from './ProfileDropdown';


export const Navbar = (props) => {
    const [click,setClick] = useState(false);
    const handleClick = () => setClick(!click);
    const [button,setButton] = useState(false);
    const closeMobileMenu = () => setClick(false);
    const [profile, setprofile] = useState(true)

    var name =""
    try {
        name = props.userData.name
    } catch (error) {
        
    }

    console.log(props)

    function getCookie(cname) {
        let name = cname + "=";
        let decodedCookie = decodeURIComponent(document.cookie);
        let ca = decodedCookie.split(';');
        for(let i = 0; i <ca.length; i++) {
          let c = ca[i];
          while (c.charAt(0) === ' ') {
            c = c.substring(1);
          }
          if (c.indexOf(name) === 0) {
            console.log("cookes return!");
            return c.substring(name.length, c.length);
            
          }
        }
        return "";
    }
    const userID = getCookie("_id");

    const showButton = () => {
        if(window.innerWidth <=960){
            setButton(false);
            setprofile(false)
        }else{
            if(userID === ""){
              setButton(true)
              setprofile(false)
            }else{
                setButton(false)
                setprofile(true)
            }
            
        }
    };
    useEffect(()=>{
        showButton();
    },[]);

    window.addEventListener('resize',showButton);
    try{
        //const windowsize = window.innerHeight;
        window.addEventListener('scroll',()=>{
            try{
                let content_0 = document.querySelector('.navbar1');
                //let contentPosition_0 = content_0.getBoundingClientRect().top;
        
                let scrolCount = window.scrollY;
                //let screenPosition = window.innerHeight/2;
        
                if(scrolCount > 150){
                    content_0.classList.add('navbar1-active');
                }else{
                    content_0.classList.remove('navbar1-active');
                }
               // console.log({count:scrolCount})
                
            }catch(err1){
                
            }    
        },[]);
                   
    }catch(err){
        
    }
    return(
        <>
            <nav className='navbar1'>
                <div className='navbar-container'>
                    <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
                        <img src='./images/first.png'className='sltb-logo'/>
                    </Link>
                    <div className='menu-icon' onClick={handleClick}>
                        <i className={click ? 'fas fa-times' : 'fas fa-bars'}/>
                    </div>
                    <ul className={click ? 'nav-menu active': 'nav-menu'}>
                        <li>
                            <Link to='/' className='nav-links' onClick={closeMobileMenu}>
                                Home
                            </Link>
                        </li>
                        
                        <li>
                            <Link to='/drawing' className='nav-links' onClick={closeMobileMenu}>
                                Services
                            </Link>
                        </li>
                        <li>
                            <Link to='/aboutme' className='nav-links' onClick={closeMobileMenu}>
                                About
                            </Link>
                        </li>
                        <li>
                            <Link to='/contact' className='nav-links' onClick={closeMobileMenu}>
                                contact
                            </Link>
                        </li>
                        
                        <li>
                            <Link to='/userlogin' className='nav-links-mobile' onClick={closeMobileMenu}>
                                Sign Up
                            </Link>
                        </li>
                         
                    </ul>
                    {button && <NewButton buttonStyle='btnn--outline'>Sing in</NewButton>}
                    {profile && <ProfileDropdown name={name} id={userID}/>}
                </div> 
            </nav>
        </>
    );
}  

