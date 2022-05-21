import React from "react";

import { Link } from 'react-router-dom';
import '../components/ProfileDropdown'

export const ProfileDropdown = (props)=>{
    console.log(props.name)
    console.log(props.id)
    var name = props.name.split(" ")

    function deleteCookie(cname, cvalue) {
    

        document.cookie = cname + "=" + cvalue + ";expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/";
        console.log("cookes delete");
        window.location.replace("/")
      }
    function logoutOnClick(){
        deleteCookie("_id",null);
    }
    return(
        
        <div className="dropdown">
        <button className="dropbtn">Hi {name[0]}</button>
            <div className="dropdown-content">
            <Link to={"/"}><a href="# ">Watch list</a></Link>
            <Link to={"/"}><a href="# ">My Profile</a></Link>
            <Link to={"/"}><a href="# " onClick={()=>{
                logoutOnClick()
            }}>Log out</a></Link>
            </div>
      </div>
        
    )
}