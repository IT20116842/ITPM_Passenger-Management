import React, { useEffect, useState } from "react";
import { Col, Container, Row} from "react-bootstrap"
import {Avatar, Button, ButtonBase, Checkbox, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField} from "@mui/material"
import "../style/profileStyle.css"
import '@mui/material'
import jsPDF from "jspdf";
import "jspdf-autotable";
import userAvatar from "../images/avatar.jpg"
import { useHistory, useLocation,Link } from "react-router-dom";

export const ProfileScreen = () =>{

  const location = useLocation();
  const localUser = JSON.parse(localStorage.getItem("user")) || null;
  let [user, setUser] = useState(localUser);
   
    
useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")));
    console.log("data " + user.formData._id);
  }, [location]);

  const exportUserPDF = (tableData, type) => {
    const unit = "pt";
    const size = "A4"; // Use A1, A2, A3 or A4
    const orientation = "portrait"; // portrait or landscape
    const marginLeft = 40;
    const doc = new jsPDF(orientation, unit, size);
    doc.setFontSize(15);
    console.log(tableData);

    //title of pdf
    const title = "user profile report";
    //headers
    const headers = [
      [
        "User name",
        "First name",
        "Last name",
        "Email",
        "Gender", 
      ],
    ];

    //data
      
      tableData =  [
        [user.formData.userName,
        user.formData.FirstName,
        user.formData.LastName,
        user.formData.email, 
        user.formData.gender, ]
      ]; 

    let content = {
      startY: 50,
      head: headers,
      body: tableData,
    };
    doc.text(title, marginLeft, 40);
    doc.autoTable(content);
    //save name
    doc.save("userReport.pdf");
  };

    return(
        <Container className="container">  
                <div className="formWrapper">
                    <div className="headingTxt">User Profile</div>
                   
                    <Row className="picWrapper">    
                         <div className="dataWrapper">
                             <Avatar alt="Dinushi de silva" src={user.formData.proPic!=""?user.formData.proPic:userAvatar}  sx={{ width: 150, height: 150 }}/>
                            <div className="displayData">
                                <div className="UserName">
                                   {user.formData.userName}
                                </div>
                                <div className="otherText">
                                    Sri Lanka
                                </div>
                                <div className="email">
                                    {user.formData.email}
                                </div>
                            </div>
                        </div> 
                    </Row>

                    <Row className="profileDataWrapper">    
                        <div className="profiledataLeft">
                            <p>First Name </p>
                            <p>Last Name </p>
                            <p>E- mail </p>
                            <p>Country </p>
                            <p>Gender</p> 
                        </div>
                        <div className="profiledataLeft">
                            <p> : </p>
                            <p> : </p>
                            <p> : </p>
                            <p> : </p>
                            <p> : </p>
                        </div>
                        <div className="profiledataLeft">
                            <p>{user.formData.userName}</p>
                            <p>{user.formData.FirstName + " " + user.formData.LastName}</p>
                            <p>{user.formData.email}</p>
                            <p>Sri Lanka</p>
                            <p>{user.formData.gender}</p>    
                        </div>   
                    </Row>
                     <Row className="profileDataWrapper">      
                           <Button component={Link} to='/editprofile' className="btn">Change details</Button>
                           <Button className="btn green"  onClick={() => exportUserPDF()}>Download user details report</Button> 
                    </Row>
                    
                   
                </div>
        </Container>
    )
}