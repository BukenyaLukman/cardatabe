import React,{useState, useEffect} from 'react'
import { SERVER_URL } from '../constants';
import Snackbar from '@mui/material/Snackbar';
import Stack from '@mui/material/Stack';
import { DataGrid, GridToolbarContainer,GridToolbarExport,gridClasses } from '@mui/x-data-grid';
import AddCar from './AddCar';
import EditCar from './EditCar';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

const Carlist = () => {
    const [cars, setCars] = useState([]);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        fetchCars();
    },[])


    function CustomToolbar(){
        return (
            <GridToolbarContainer
                className={gridClasses.toolbarContainer}
                >
                <GridToolbarExport />
            </GridToolbarContainer>
        );
    }


    const updateCar = (car, link) => {
        const token = sessionStorage.getItem('jwt');

        fetch(link, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
            body: JSON.stringify(car)
        })
        .then(response => {
            if(response.ok){
                fetchCars();
            }else{
                alert('Error updating car');
            }
        }).catch(err => console.error(err));
    }

    const addCar = (car) => {
        const token = sessionStorage.getItem('jwt');

        fetch(SERVER_URL + 'api/cars', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
            body: JSON.stringify(car)
        })
        .then(res => {
            if (res.ok) {
                fetchCars();
            } else {
                alert('Error adding car');
            }
        })
        .catch(err => console.log(err));
    }

    const fetchCars = () => {
        const token = sessionStorage.getItem('jwt');
        fetch(SERVER_URL +'api/cars',{
            headers: {
                'Authorization': token
            }
        })
        .then(response => response.json())
        .then(data => setCars(data._embedded.cars))
        .catch(err => console.log(err))
    }

    const onDelClick = (url) => {
        if(window.confirm("Are you sure to delete?")){
            const token = sessionStorage.getItem('jwt');
            fetch(url, {
                method: 'DELETE',
                headers: {
                    'Authorization': token
                }
            })
            .then(response => {
                if(response.ok){
                    fetchCars();
                    setOpen(true);
                }else{
                    alert("Something went wrong");
                }
            })
            .catch(err => console.error(err))
        }
    }


    const columns = [
        { field: 'brand', headerName: 'Brand', width: 200 },
        {field: 'model', headerName: 'Model', width: 200},
        {field: 'color', headerName: 'Color', width: 200},
        {field: 'year', headerName: 'Year', width: 200},
        {field: 'price', headerName: 'Price', width: 150},
        {
            field: '_links.car.href',
            headerName: '',
            sortable: false,
            filterable: false,
            renderCell: row => 
            <EditCar
            data={row}
            updateCar={updateCar}/>
                
        },
        {
            field: '_links.self.href',
            headerName: '',
            sortable: false,
            filterable: false,
            renderCell: row => 
                <IconButton
                    onClick={() => onDelClick(row.id)}
                >
                    <DeleteIcon color="error"/>
                </IconButton>
        }
    ]
  return (
    <React.Fragment>
        <Stack mt={2} mb={2}>
            <AddCar addCar={addCar}/>
        </Stack>
        <div style={{height: 500, width: '100%'}}>
            <DataGrid rows={cars}
                columns={columns}
                disableSelectionOnClick={true}
                getRowId={row => row._links.self.href}
                component={{Toolbar: CustomToolbar}}
            />
            <Snackbar
                open={open}
                autoHideDuration={2000}
                onClose={() => setOpen(false)}
                message="Car deleted"
            />
        </div>
    </React.Fragment>
  )
}

export default Carlist