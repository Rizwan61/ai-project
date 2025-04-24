import React, { useState } from 'react'
import { Link , useNavigate} from 'react-router-dom'
import toast from 'react-hot-toast';
import axios from 'axios'
import { Box, Typography, useMediaQuery,TextField, Button, Alert, Collapse, capitalize } from '@mui/material'

const registerpage = () => {

    const navigate = useNavigate()

    // media query

    const isNotMobile = useMediaQuery("(min-width: 1000px)")
    const [username,setUsername] = useState("")
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [error,setError] = useState("")

    // submit handle
    const handlesubmit = async (e)=>{
        e.preventDefult();
        try {
            const {data} = await axios.post('/api/v1/auth/register',{username,email,password})
            toast.success('User Register Successfully')
            navigate('/login')
        } catch (error) {
            if(error.response.data.error){
                setError(error.response.data.error)

            }
            else if(error.message){
                setError(error.message)
            }
            setTimeout(() => {setError("")}, 5000);

        console.log(error)
            
        }
    }
    return (
        <Box width={isNotMobile? '40%':'80%'} p={'2rem'} m={'2rem auto'} borderRadius={5} sx={{boxShadow:5}} >

            <Collapse in={error}>
                <Alert severity='error' sx={{mb:2}}>
                    {error}    
                </Alert>            
            </Collapse>
           <form onSubmit={handlesubmit}>
           <Typography variant='h3'>SignUp</Typography>
            <TextField label="Username" required margin='normal' fullWidth value={username} onChange={(e)=>{setUsername(e.target.value)}}/>
            <TextField label="Email" required margin='normal' fullWidth value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
            <TextField label="Password" required margin='normal' fullWidth value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
             <Button type='submit' fullWidth variant='contained' size='large' sx={{color:"white", mt: 2}}>
                Sing Up
             </Button>
             <Typography mt={2}>
                Already you have account? <Link to="/login" > Please Login</Link>
             </Typography>
            </form>   
        </Box>
    )
}

export default registerpage
registerpage