import { Button, FormControlLabel, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import '../style/booking.css'
import { API_URL } from "../utils/constants";
import axios from "axios"; 
import jsPDF from "jspdf";
import "jspdf-autotable";


const initialState = {
  RootNo: "",
  From: "",
  To: "",
  BookingDate: "",
  seatNo: "",
  qty: "", 
  errors: {
    RootNo: "",
    From: "",
    To: "",
    BookingDate: "",
    seatNo: "",
    qty: "", 
  },
};

export const MyOrders =()=>{

    function createData(RootNo,From,To,BookingDate,seatNo,qty,price,) {
        return { RootNo, From, To, BookingDate, seatNo, qty, price};
        }


     const [errors, setErrors] = useState(initialState); //error message
     const [formData, setFormData] = useState(initialState); //form date 
     const [data, setData] = useState([]); //table date 
     const [rows, setRows] = useState(); //row date  
     const [isEdit, setIsEdit] = useState(false); //row date  
    
     //get all booking details
    useEffect(() => {
        const getFileList = async () => {
            try {
                const { data } = await axios.get(`${API_URL}/booking/getAllBooking`);
                setData(data); 
            } catch (error) {
                    console.log(error);
            }

        };  
        getFileList();
 
    }, [data]);

    const onchange =(e) =>{
        e.preventDefault();
                const { name, value } = e.target; 

                //validating user inputs
                switch (name) {
                case "RootNo":
                    errors.RootNo = value.length <= 0 ? "Root number can not be empty! Ex:- 177/7" : "";
                    break;
                case "From":
                    errors.From = value.length <= 0 ? "Starting location can not be empty! Ex:- Colombo" : "";
                    break;
                case "To":
                    errors.To = value.length <= 0 ? "Destination location can not be empty! Ex:- Kandy" : "";
                    break;
                case "BookingDate":
                    errors.BookingDate = value.length <= 0 ? "Booking date can not be empty! Ex:- 2022/02/2" : "";
                    break;
                case "seatNo":
                    errors.seatNo = value.length <= 0 ? "Seat number can not be empty! Ex:- 1 or 12,14" : "";
                    break;
                case "qty":
                    errors.qty = value.length <= 0 ? "Ticket count can not be empty! Ex:- 2" :"";
                    break;
                 
                default:
                    break;
                }
                setFormData({ ...formData, [e.target.name]: e.target.value });
                console.log(formData)
    }   
     const deleteBooking =  async (item)=>{
       await axios.delete(`${API_URL}/booking/deleteBooking/` + item)
    };

    const handleOnSubmit = async (event) => {
    event.preventDefault(); 
    if(formData.RootNo != "" || formData.From !="" || formData.To != "" || formData.seatNo != "" || formData.qty !=""){
        try { 
            formData.price = formData.qty *100;
           
            await axios.post(`${API_URL}/booking/addBooking`, formData, {
            });

            console.log("upload Success");
            setFormData(initialState);
        
        } catch (error) {
        console.log("error : " +error)
        }
    } 
  };

  const updateData = (rowData)=>{
      setIsEdit(true);
      setFormData(rowData);
  }

  const updateBooking = async (event) => {
    event.preventDefault(); 
    if(formData.RootNo != "" || formData.From !="" || formData.To != "" || formData.seatNo != "" || formData.qty !=""){
        try { 
            formData.price = formData.qty *100;
           
            await axios.put(`${API_URL}/booking/`+ formData._id, formData, {
            });

            console.log("upload Success");
            setFormData(initialState);
        
        } catch (error) {
        console.log("error : " +error)
        }
    } 
  };
    const exportUserPDF = (tableData, type) => {
        const unit = "pt";
        const size = "A4"; // Use A1, A2, A3 or A4
        const orientation = "portrait"; // portrait or landscape
        const marginLeft = 40;
        const doc = new jsPDF(orientation, unit, size);
        doc.setFontSize(15);
        console.log(tableData);

        //title of pdf
        const title = "My Bookings Report";
        //headers
        const headers = [
        [
            "Root number",
            "From",
            "To",
            "Booking number",
            "Quantity", 
            "Price", 
        ],
        ];

        //data
        
        tableData =  [
            [formData.RootNo,
             formData.From,
             formData.To,
             formData.BookingDate, 
             formData.qty, 
             formData.price, ]
        ]; 

        let content = {
        startY: 50,
        head: headers,
        body: tableData,
        };
        doc.text(title, marginLeft, 40);
        doc.autoTable(content);
        //save name
        doc.save("My_Bookin_Report.pdf");
    };
  
 

    return (
        <Paper>
            <div className="center-text">
                <h2>{!isEdit?"Add":"Edit"} new booking</h2>
            </div>
            <Row> 
                <form className="bookFormWrap"  onSubmit={!isEdit?handleOnSubmit:updateBooking}>
                    <div className="flex-row-style ">
                        <Col >
                            <div className="bookInputWrap">    
                                <TextField name ="RootNo" id="RootNo" label="Root number" value={formData.RootNo} variant="standard" onChange={e =>{onchange(e)}} fullWidth/>
                                {errors.RootNo.length > 0 && (
                                    <span className="error">{errors.RootNo}</span>
                                )}
                            </div>
                            
                            <div className="bookInputWrap">    
                                <TextField name= "From" id="From" label="From" variant="standard" value={formData.From}  type="text" onChange={e =>{onchange(e)}} fullWidth/>
                                {errors.From.length > 0 && (
                                    <span className="error">{errors.From}</span>
                                )}
                            </div> 
                            
                            <div className="bookInputWrap">    
                                <TextField name= "To" id="To" label="To" variant="standard" value={formData.To}  type="text" onChange={e =>{onchange(e)}} fullWidth/>
                                {errors.To.length > 0 && (
                                    <span className="error">{errors.To}</span>
                                )}
                            </div> 
                        </Col>
                        <Col >
                            <div className="bookInputWrap">    
                                <TextField name= "BookingDate" id="BookingDate" label="Booking date" value={formData.BookingDate}  variant="standard" type="date" onChange={e =>{onchange(e)}} fullWidth/>
                                {errors.BookingDate.length > 0 && (
                                    <span className="error">{errors.BookingDate}</span>
                                )}
                            </div> 
                            
                            <div className="bookInputWrap">    
                                <TextField name= "seatNo" id="seatNo" label="seatNo" variant="standard" value={formData.seatNo}  type="text" onChange={e =>{onchange(e)}} fullWidth/>
                                {errors.seatNo.length > 0 && (
                                    <span className="error">{errors.seatNo}</span>
                                )}
                            </div> 

                            <div className="bookInputWrap">    
                                <TextField name= "qty" id="qty" label="qty" variant="standard" value={formData.qty}  type="text" onChange={e =>{onchange(e)}} fullWidth/>
                                {errors.qty.length > 0 && (
                                    <span className="error">{errors.qty}</span>
                                )}
                            </div> 
                        </Col>
                        <div className="btn-row">
                            <button type="submit" className="btn btn-primary">{!isEdit?"Add":"Save"}</button>
                        </div>
                    </div>
                   
                    
                     
                </form>
            </Row>
            <div className="heading_separate">
                <h2>My Bookings</h2>
                <button className="btn-report" onClick={exportUserPDF}>Get report</button>
            </div>
             <div className="table-wrap">
                 <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                        <TableRow>
                            <TableCell>Root number</TableCell>
                            <TableCell align="right">From</TableCell>
                            <TableCell align="right">To</TableCell>
                            <TableCell align="right">Booking date</TableCell>
                            <TableCell align="right">Seat number</TableCell>
                            <TableCell align="right">Quantity</TableCell>
                            <TableCell align="right">Price</TableCell>
                            <TableCell align="right">options</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {data.map((row) => (
                            <TableRow
                            key={row.RootNo}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            > 
                            <TableCell align="center">{row.RootNo}</TableCell>
                            <TableCell align="center">{row.From}</TableCell>
                            <TableCell align="center">{row.To}</TableCell>
                            <TableCell align="center">{row.BookingDate}</TableCell>
                            <TableCell align="center">{row.seatNo}</TableCell>
                            <TableCell align="center">{row.qty}</TableCell>
                            <TableCell align="center">RS. {row.price}.00</TableCell>
                            <TableCell align="right">
                                <button className="btn-edit"  onClick={()=>{updateData(row)}}>Edit</button>
                                <button className="btn-delete" onClick={() =>deleteBooking(row._id)}>Delete</button>
                            </TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                </TableContainer>
             </div>
        </Paper>
    )
}