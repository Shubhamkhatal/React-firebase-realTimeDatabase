import { Button, Grid, TextField, Typography } from '@material-ui/core';
import React, { useState } from 'react'


export default function Contact() {
    const [user, setuser] = useState(
        {
           name:"",
            email:"",
            phone:"",
            address:"",
            message:"",
        }
    )
    let  name,value;
    const getUserData = (e:any)=>{
        name = e.target.name;
        value = e.target.value;
        setuser({...user, [name]:value})
    }
    console.log(user)
    const resetForm=()=>{
        setuser(
            {
                name:"",
                 email:"",
                 phone:"",
                 address:"",
                 message:"",
             }
        )
    }
    const postData = async (e:any)=>{
        e.preventDefault();
        const {
            name,
            email,
            phone,
            address,
            message,
        } = user;
        const databasepath= 'https://contactform-fd396-default-rtdb.firebaseio.com'
        const res = await fetch(
            
            `${databasepath}/contact.json`,
            {
                method :"POST",
                headers:{
                    "Content-Type":"application/json",
                },
                body:JSON.stringify({
                   name,
                    email,
                    phone,
                    address,
                    message,
                })
            }           
        )
        alert("Data Added To the Firebase Database");
        resetForm();
    }
    
    return (
        <div>
            <Grid container>
            <Grid xs={3}></Grid>  
            <Grid xs={6}>
                <br/>
                <Typography variant='h2' color='secondary'>Contact Form</Typography>
            <form noValidate autoComplete="off">
                <br/>
                <TextField id="standard-full-width" onChange={getUserData} value={user.name} fullWidth label="Enter Name" variant="outlined" required name='name'/>
                <br/><br/>
                <TextField id="outlined-basic" onChange={getUserData} value={user.email} fullWidth label="Enter Email" variant="outlined" required name="email"/>
                <br/><br/>
                <TextField id="outlined-basic" onChange={getUserData} value={user.phone} fullWidth label="Enter Phone" variant="outlined"  required name="phone"/>
                <br/><br/>
                <TextField id="outlined-basic" onChange={getUserData} value={user.address} fullWidth label="Enter Address" variant="outlined" required name="address"/>
                <br/><br/>
                <TextField id="outlined-multiline-static" onChange={getUserData} value={user.message} fullWidth label="Enter Message" required multiline rows={4}  variant="outlined" name='message' />
                <br/><br/>
                <Button onClick={postData} color='primary' variant="contained" >Submit</Button>
            </form>
            </Grid>
            </Grid>
        </div>
    )
}
