import React,{useState} from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Carlist from './Carlist';
import { SERVER_URL } from '../constants';
import Snackbar from '@mui/material/Snackbar';


const Login = () => {
    const [user, setUser] = useState({
        username: '',
        password: ''
    });
    const [isAuthenticated, setAuth] = useState(false);
    const [open, setOpen] = useState(false);

    const handleChange = (event) => {
        setUser({
            ...user,
            [event.target.name]: event.target.value
        })
    }

    

    const login = () => {
        fetch(SERVER_URL + 'login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        .then(res => {
            const jwtToken = res.headers.get('Authorization');
            if(jwtToken !== null){
                sessionStorage.setItem("jwt", jwtToken);
                setAuth(true);
            }else{
                setOpen(true);
            }
        })
    }

    if(isAuthenticated){
        return <Carlist/>;
    }else{
        return (

            <div>
                <Stack spacing={2} alignItems='center' mt={2}>
                    <TextField label="Username" name="username"
                        onChange={handleChange}/>
                    <TextField type="password" label="Password" name="password"
                        onChange={handleChange}/>
                    <Button variant="outlined" 
                    onClick={login} 
                    color="primary">
                        Login
                    </Button>
                </Stack>
                <Snackbar 
                open={open} 
                autoHideDuration={3000} 
                onClose={() => setOpen(false)}
                message="Login Failed: check username and password"/>
            </div>
          )
    }

  
}

export default Login