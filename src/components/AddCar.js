import React,{useState} from 'react'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';

const AddCar = (props) => {
    const [open, setOpen] = useState(false);
    const [car, setCar] = useState({
        brand: '',
        model: '',
        color: '',
        year: '',
        price: ''
    });

    // Open the modal form
    const handleClickOpen = () => {
        setOpen(true);
    }

    // close the modal form
    const handleClose = () => {
        setOpen(false);
    }

    // handle change
    const handleChange = (event) => {
        setCar({
            ...car,
            [event.target.name]: event.target.value
        })
    }

    // save car and close form
    const handleSave = () => {
        props.addCar(car);
        handleClose();
    }
  return (
    <div>
        <Button variant="contained" onClick={handleClickOpen}>New Car</Button>
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" >
            <DialogTitle id="form-dialog-title">New Car</DialogTitle>
                <DialogContent>
                    <Stack spacing={2} mt={1}>
                        <TextField label="Brand" name="brand"
                        autoFocus
                        variant="standard" value={car.brand}
                        onChange={handleChange}/>
                        <TextField label="Model" name="model"
                        autoFocus
                        variant="standard" value={car.model}
                        onChange={handleChange}/>
                        <TextField label="Color" name="color"
                        autoFocus
                        variant="standard" value={car.color}
                        onChange={handleChange}/>
                        <TextField label="Year" name="year"
                        autoFocus
                        variant="standard" value={car.year}
                        onChange={handleChange}/>
                        <TextField label="Price" name="price"
                        autoFocus
                        variant="standard" value={car.price}
                        onChange={handleChange}/>
                    </Stack>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button onClick={handleSave}>Save</Button>
                    </DialogActions>
                </DialogContent>
        </Dialog>
    </div>
  )
}

export default AddCar