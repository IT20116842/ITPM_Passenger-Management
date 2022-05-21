import React, { useState  } from "react";
import {Button, Col, Container, Row} from "react-bootstrap"
import {Checkbox, FormControlLabel, TextField} from "@mui/material"
import "../style/loginStyle.css"
import { Link } from "react-router-dom";
import { API_URL } from "../utils/constants";
import axios from "axios"; 
import { useNavigate } from 'react-router-dom';
/**
 * initial states for inputs
 */
const initialState = { userName: "", password: "" };


export const LoginScreen = () =>{

    const navigate = useNavigate;

    //useStates
    const [formData, setFormData] = useState(initialState); //form date 
    const [errors, setErrors] = useState(initialState); //error message
    const [data, setData] = useState([]); // sign in data

    /**
     * User sign in API call
     * Form submit
     * @param {login data} e 
     */
    const onSubmit = async (e) => {
        e.preventDefault();
        console.log(formData);
        try {
        await axios.post(`${API_URL}/userLogin/signin`, formData).then((res) => {
            localStorage.setItem("token", "");
        });
        try {
            const { data } = await axios.get(
            `${API_URL}/userLogin/getUser/${formData.userName}`
            );
            setData(data[0]);
            console.log(data[0].userName);
            localStorage.setItem("user", JSON.stringify({ formData: data[0] }));
            setData(null);
        } catch (error) {
            console.log(error);
        }
        navigate("/profile");
        console.log(formData);
        window.location.reload();
        } catch (error) {
            // error.response && setErrorMsg(error.response.data);
            console.log(error);
        }
    };

    /**
     * input onChage method
     * @param {e} e 
     */
    const onchange = (e) => {
    e.preventDefault();
    const { name, value } = e.target; 

    //validating user inputs
    switch (name) {
      case "userName":
        errors.userName = value.length <= 0 ? "User name can not be empty! Ex:- user001" : "";
        break;
      case "password":
        errors.password = value.length <= 0 ? "Password can not be empty!" : "";
        break;
      default:
        break;
    }
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log(e.target.name + " " + e.target.value)
  };

    return(
        <Container className="loginContainer"> 
            <div >
                <form className="formWrapper" onSubmit={onSubmit}>
                    <div className="headingTxt">Sign in</div>
                   
                    <Row className="inputWrapper">    
                        <TextField name ="userName" id="userName" label="User name" variant="standard" onChange={e =>{onchange(e)}} fullWidth/>
                        {errors.userName.length > 0 && (
                            <span className="error">{errors.userName}</span>
                        )}
                    </Row>
                     
                    <Row className="inputWrapper">    
                        <TextField name= "password" id="password" label="Password" variant="standard" type="password" onChange={e =>{onchange(e)}} fullWidth/>
                        {errors.password.length > 0 && (
                            <span className="error">{errors.password}</span>
                        )} 
                    </Row> 
                    <Row>
                         <FormControlLabel control={<Checkbox defaultChecked />} label="Remember me" />
                    </Row>
                    <Row>
                        <Button type="submit" className="btn-primary">Login</Button>
                    </Row>
                    <Row className="bottomLayer">
                        <Col>
                            <div>New User ? <Link className="linkWrapper" to="/register">Sign up</Link></div> 
                        </Col>
                        <Col>
                            <Link className="linkWrapper" to="">Forgot your password ?</Link> 
                        </Col> 
                    </Row>
                </form>
            </div>
        </Container>
    )
}