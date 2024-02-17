import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import Box from '@mui/material/Box';
import { useState } from 'react';
/* icons */
import CheckIcon from '@mui/icons-material/Check';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
/*Dialog Imports*/
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';

export default function Todo({ objectTodo, handleCheck, handlDelete, todos, setTodos }) {
    const [showDeleteDialog, setShowDeleteDialog] = useState(false)
    const [showUpdateDialog, setShowUpdateDialog] = useState(false)
    const [updatedTodo, setUpdatedTodo] = useState({ title: objectTodo.title, details: objectTodo.details })
    function handleCheckclicked() {
        handleCheck(objectTodo.id)
    }


    /*
    ================================================================================
    Control Opening And Closing (Delete) Dialog By Contoling State Value
    ================================================================================
    */

    function handleDeleteClick() {
        setShowDeleteDialog(true)
    }
    function handleDeleteDialogClose() {
        setShowDeleteDialog(false)
    }


    /*
    =================================================================================
        Control Opening And Closing (Edit) Dialog By Contoling State Value
    =================================================================================
    */
    function handleEditClick() {
        setShowUpdateDialog(true)

    }
    function handleUpdateDialogClose() {
        setShowUpdateDialog(false)
    }



    /*
    ==================================================================================
    handle With Delete Todos 
    ==================================================================================
    */
    function handlDeleteConfirm() {

        const DeletTodo = todos.filter((t) => {
            if (t.id == objectTodo.id) {
                return false
            } else {
                return true
            }
        })
        setTodos(DeletTodo)
        localStorage.setItem('todos', JSON.stringify(DeletTodo))

    }

    /*
       =================================================================================
       handle With Edited Todos
       =================================================================================    
       */
    function handlUpdateCliked() {
        const EditedTodo = todos.map((t) => {
            if (t.id == objectTodo.id) {
                return ({ ...t, title: updatedTodo.title, details: updatedTodo.details })
            } else {
                return t
            }
        })
        setTodos(EditedTodo)
        localStorage.setItem('todos', JSON.stringify(EditedTodo))

        setShowUpdateDialog(false)
    }




    return (
        <>
            {/*  
            =======================================================================
                                           DELETE Dailog
            =======================================================================
            */}
            <Dialog style={{ direction: "rtl" }}
                open={showDeleteDialog}
                onClose={handleDeleteDialogClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"هل متأكد من رغبتك في حذف المهمة؟"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        لا يمكنك التراجع عن الحذف في حال اختيار زر(حذف)
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDeleteDialogClose} >إغلاق</Button>
                    <Button autoFocus
                        onClick={handlDeleteConfirm}
                    >
                        نعم قم بالحذف
                    </Button>
                </DialogActions>
            </Dialog>


            {/*  
            =======================================================================
                                           Edit Dailog
            =======================================================================
            */}
            <Dialog style={{ direction: "rtl" }}
                open={showUpdateDialog}
                onClose={handleUpdateDialogClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"تعديل المهمة"}
                </DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        /* required */
                        margin="dense"
                        id="name"
                        name="email"
                        label="العنوان"
                        type="email"
                        fullWidth
                        variant="standard"
                        value={updatedTodo.title}
                        onChange={(e) => {
                            setUpdatedTodo({ ...updatedTodo, title: e.target.value })
                        }}
                    />
                    <TextField
                        autoFocus
                        /*   required */
                        margin="dense"
                        id="name"
                        name="email"
                        label="التفاصيل"
                        type="email"
                        fullWidth
                        variant="standard"
                        value={updatedTodo.details}
                        onChange={(e) => {
                            setUpdatedTodo({ ...setUpdatedTodo, details: e.target.value })
                        }}

                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleUpdateDialogClose} >إلغاء</Button>
                    <Button autoFocus onClick={handlUpdateCliked}>
                        تعديل
                    </Button>
                </DialogActions>
            </Dialog>


            {/*  
            =======================================================================
                                           Todo-Compoanat
            =======================================================================
            */}
            <Card className='card-body' sx={{ minWidth: 275, background: "#00000029", color: 'white', marginTop: 4 }}>

                <CardContent>
                    <Grid container spacing={2}>
                        <Grid xs={8} >
                            <Typography variant="h6" style={{ textAlign: "right" }}>{objectTodo.title}</Typography>
                            <Typography variant="h6" style={{ textAlign: "right" }}>{objectTodo.details}</Typography>

                        </Grid>
                        <Grid xs={4} display='flex' justifyContent="space-around" alignItems="center"  >

                            {/*
                            =============
                            Check-Button
                            =============
                            */}
                            <IconButton
                                className='icon-button'
                                style={{
                                    background: objectTodo.isComleted ? 'green' : '#FFFFFF',
                                    color: '#8bc34a',
                                    border: "3px solid #8bc34a"
                                }}
                                onClick={handleCheckclicked}>

                                <CheckIcon />

                            </IconButton>


                            {/*
                            =============
                            Edit-Button
                            =============
                            */}
                            <IconButton
                                onClick={handleEditClick}
                                className='icon-button'
                                style={{ background: "white", border: "3px solid #A6C2E7", color: "#3F5971" }}>
                                <EditIcon />
                            </IconButton>


                            {/*
                            =============
                            Delete-Button
                            =============
                            */}
                            <IconButton
                                onClick={handleDeleteClick}
                                className='icon-button'
                                style={{
                                    background: "#FFFDFF",
                                    border: "3px solid rgb(244 0 0 / 42%)",
                                    color: 'rgb(244 0 0 / 78%)'
                                }}
                            >
                                <DeleteIcon />
                            </IconButton>

                        </Grid>
                    </Grid>

                </CardContent>


            </Card >

        </>


    )
}





