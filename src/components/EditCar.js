import React,{useState} from 'react'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import EditIcon from '@mui/icons-material/Edit'

const EditCar = (props) => {
    const [open, setOpen] = useState(false);
    const [car, setCar] = useState({
        brand: '',
        model: '',
        color: '',
        year: '',
        price: ''
    });





    // open the modal form
    const handleClickOpen = () => {
        setCar({
            brand: props.data.row.brand,
            model: props.data.row.model,
            color: props.data.row.color,
            year: props.data.row.year,
            price: props.data.row.price

        });
        setOpen(true);
    };

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



    // update car and close form
    const handleSave = () => {
        props.updateCar(car, props.data.id);
        handleClose();
    }
  return (
    <div>
        <IconButton onClick={handleClickOpen}>
            <EditIcon color="primary"/>
        </IconButton>
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Edit Car</DialogTitle>
            <DialogContent>
                <input type="text" name="brand" value={car.brand} onChange={handleChange} placeholder="Brand" />
                <br/>
                <input type="text" name="model" value={car.model} onChange={handleChange} placeholder="Model" />
                <br/>
                <input type="text" name="color" value={car.color} onChange={handleChange} placeholder="Color" />
                <br/>
                <input type="text" name="year" value={car.year} onChange={handleChange} placeholder="Year" />
                <br/>
                <input type="text" name="price" value={car.price} onChange={handleChange} placeholder="Price" />
                <br/>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>
                    Cancel
                </Button>
                <Button onClick={handleSave}>
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    </div>
  )
}

export default EditCar