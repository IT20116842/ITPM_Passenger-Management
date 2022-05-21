import React, { useState ,useHistory, useRef} from "react";
import { Col, Container, Row} from "react-bootstrap"
import {Button, Checkbox, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField} from "@mui/material"
import "../style/loginStyle.css"
import { API_URL } from "../utils/constants";
import axios from "axios"; 
import Dropzone from "react-dropzone";
import dummy from "../images/dummy.png";
import { Link } from "react-router-dom";
/**
 * initial states for inputs
 */
const initialState = {
  userName: "",
  FirstName: "",
  LastName: "",
  email: "",
  gender: "",
  password: "", 
  errors: {
    userName: "",
    FirstName: "",
    LastName: "",
    email: "",
    gender: "",
    password: "", 
  },
};

export const EditProfile = () =>{

    //useStates 
    const localUser = JSON.parse(localStorage.getItem("user")) || null;
    let [user, setUser] = useState(localUser);
    const [images, setFile] = useState(localUser.formData.proPic); // state for storing actual image
    const [formData, setFormData] = useState(localUser.formData); //form date 
    const [errors, setErrors] = useState(initialState); //error message
    const [data, setData] = useState([]); // sign in data
    const [previewSrc, setPreviewSrc] = useState(""); // state for storing previewImage
    const [isPreviewAvailable, setIsPreviewAvailable] = useState(false); // state to show preview only for images
    const dropRef = useRef(); // React ref for managing the hover state of droppable area
    const [state, setState] = useState(localUser);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

    /**
     * input onChage method
     * @param {input value} e 
     */
    const onchange = (e) => {
        e.preventDefault();
        const { name, value } = e.target; 

        //validating user inputs
        switch (name) {
        case "userName":
            errors.userName = value.length <= 0 ? "User name can not be empty! Ex:- user001" : "";
            break;
        case "FirstName":
            errors.fName = value.length <= 0 ? "First name can not be empty! Ex:- Jhon" : "";
            break;
        case "LastName":
            errors.lName = value.length <= 0 ? "Last name can not be empty! Ex:- Deo" : "";
            break;
        case "email":
            errors.email = value.length <= 0 ? "Email can not be empty! Ex:- user001@mail.com" : "";
            break;
        case "gender":
            errors.gender = value.length <= 0 ? "Please select the gender! Ex:- male" : "";
            break;
        case "password":
            errors.password = value.length <= 0 ? "Password can not be empty!" :"";
            break;
        case "conPassword":
            errors.conPassword = value.length <= 0 ? "Please re-enter the password!" : "";
            break;
        default:
            break;
        }
        setFormData({ ...formData, [e.target.name]: e.target.value });
        console.log(formData)
    };
    const onDrop = (images) => {
    const [uploadedFile] = images;
    setFile(uploadedFile);

    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewSrc(fileReader.result);
    };
        fileReader.readAsDataURL(uploadedFile);
        setIsPreviewAvailable(uploadedFile.name.match(/\.(jpeg|jpg|png)$/));
        dropRef.current.style.border = "2px dashed #e9ebeb";
    };

    const updateBorder = (dragState) => {
        if (dragState === "over") {
        dropRef.current.style.border = "2px solid #000";
        } else if (dragState === "leave") {
        dropRef.current.style.border = "2px dashed #e9ebeb";
        }
    };
    /**
     * Register new user
     * Form submission
     * @param {*} event 
     */
    const handleOnSubmit = async (event) => {
    event.preventDefault(); 
    try {
       console.log("data "  + formData.userName ) 
      
          await axios.put(`${API_URL}/user/` + localUser.formData._id, formData, {
             
          });

          console.log("upload Success " + formData.userName);
         localStorage.setItem("user", JSON.stringify({ formData: formData }));
          
       
    } catch (error) {
      error.response && setErrorMsg(error.response.data);
    }
  };

  
    return(
        <Container className="container"> 
            <div >
                <form className="formWrapper" onSubmit={handleOnSubmit}>
                    <div className="headingTxt">Edit user details</div>
                   
                    <Row>    
                        <TextField id="userName" name="userName" label="User name" value={formData.userName} variant="standard" onChange={e=>{onchange(e)}} fullWidth/>
                        {errors.userName.length > 0 && (
                            <span className="error">{errors.userName}</span>
                        )}
                    </Row>

                    <Row>    
                        <TextField id="fName" name="FirstName" label="Frist Name" value={formData.FirstName} variant="standard" onChange={e=>{onchange(e)}}  fullWidth/>
                        {errors.FirstName.length > 0 && (
                            <span className="error">{errors.FirstName}</span>
                        )}
                    </Row>

                    <Row>    
                        <TextField id="lName" name="LastName" label="Last Name" value={formData.LastName} variant="standard" onChange={e=>{onchange(e)}}  fullWidth/>
                        {errors.LastName.length > 0 && (
                            <span className="error">{errors.LastName}</span>
                        )}
                    </Row>
                    
                    <Row>    
                        <TextField id="email" name="email" label="E - mail" value={formData.email} variant="standard" onChange={e=>{onchange(e)}}  fullWidth/>
                        {errors.email.length > 0 && (
                            <span className="error">{errors.email}</span>
                        )}
                    </Row>

                    <Row className="bottomLayer">    
                       <FormControl>
                            <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
                            <RadioGroup
                                aria-labelledby="demo-radio-buttons-group-label"
                                defaultValue={formData.gender}
                                name="gender"
                                onChange={e=>{onchange(e)}}
                            >
                                <FormControlLabel  value="female" control={<Radio name="gender" />} label="Female" />
                                <FormControlLabel  value="male" control={<Radio name="gender" />} label="Male" />
                                <FormControlLabel  value="other" control={<Radio name="gender"  />} label="Other" />
                            </RadioGroup>
                        </FormControl> 
                    </Row>
                    <br/>
                    <Row>    
                        <TextField id="password" name="password" label="Password" value={formData.password} variant="standard"  type="text" onChange={e=>{onchange(e)}}  fullWidth/>
                        {errors.password.length > 0 && (
                            <span className="error">{errors.password}</span>
                        )}
                    </Row>
 
                     <div className="upload-section">
              <Dropzone
                onDrop={onDrop}
                onDragEnter={() => updateBorder("over")}
                onDragLeave={() => updateBorder("leave")}
              >
                {({ getRootProps, getInputProps }) => (
                  <div
                    {...getRootProps({ className: "drop-zone" })}
                    ref={dropRef}
                  >
                    <input {...getInputProps() } />
                    <p>Drag and drop a file OR click here to select a file</p>
                    {images && (
                      <div>
                        <strong>Selected file:</strong> {images.name}
                      </div>
                    )}
                  </div>
                )}
              
              </Dropzone>
              {previewSrc ? (
                isPreviewAvailable ? ( 
                  <div className="image-preview">
                      <p>profile picture</p> 
                    <img
                      className="preview-image"
                      src={formData.proPic !=""?formData.proPic: previewSrc}
                      alt="Preview"
                      width="200px"
                      style={{ maxHeight: "200", maxWidth: "200" }}
                      align-item="center"
                    />
                  </div>
                ) : (
                  <div className="preview-message">
                    <p>No preview available for this image</p>
                  </div>
                )
              ) : (
                <div className="preview-message">
                  {/* <p>Image preview will be shown here after selection</p> */}
                  <img
                    src={dummy}
                    alt="John"
                    style={{ width: "250px", height: "200px", margin: "5px" }}
                  />
                </div>
              )}
            </div>

                   
                    
                    <Row>
                        <Button className="btn-primary" type="submit">Update</Button>
                    </Row>
                    <Row className="bottomLayer">
                        <Col>
                            <Button component={Link} to="/profile" className="linkWrapper">Back</Button> 
                        </Col>
                        
                    </Row>
                </form>
            </div>
        </Container>
    )
}