import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import Divider from '@mui/material/Divider';


import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Todo from './Todo';
import Grid from '@mui/material/Unstable_Grid2';
import TextField from '@mui/material/TextField';
import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { jsx } from '@emotion/react';

const initionlTodos = [

    {
        id: uuidv4(),
        title: "فهم الuseEffect في رياكت",
        details: "",
        isComleted: false
    },

    {
        id: uuidv4(),
        title: "3) مراجعة الasync/await في الجافا سكريبت",
        details: "",
        isComleted: false
    },


]

export default function TodoList() {
    const [todos, setTodos] = useState(initionlTodos)
    const [todosFeild, setTodosFeild] = useState("")
    const [displayedTodosType, setDisplayedTodosType] = useState('all')



    /////////////////////////////////EVENT////////////////////////////////////////
    /*
    ================================================================================
     Adding A New Todo to List Todos
    ================================================================================
    */
    function handleAddclicked() {
        const AddTodos = {
            id: uuidv4(),
            title: todosFeild,
            details: "",
            isComleted: false
        }
        const UpdatedTodos = [...todos, AddTodos]
        setTodos(UpdatedTodos)
        localStorage.setItem('todos', JSON.stringify(UpdatedTodos))
        setTodosFeild('')
    }
    /*
    ================================================================================
    Updating completed Todo 
    ================================================================================
    */
    function handleCheckclicked(id) {
        const updatTodo = todos.map((t) => {
            if (t.id == id) {
                t.isComleted = !t.isComleted
            }
            return t
        })
        setTodos(updatTodo)
        localStorage.setItem('todos', JSON.stringify(updatTodo))



    }

    /*========================================================
    Mapping on Data Array that Stored Inside (State)
    Then Return Data With Child Componant (Todo Componant)
    =========================================================*/
    /* const todosDisplay = todos.map((t) => {
        return <Todo key={t.id} objectTodo={t} handleCheck={handleCheckclicked} todos={todos} setTodos={setTodos} />
    }) */


    /* UseEffect */
    useEffect(() => {
        setTodos(JSON.parse(localStorage.getItem("todos")))
    }, [])

    //Filtration Array and render the  
    const completedTodos = todos.filter((t) => {
        return t.isComleted
    })
    const nonCompletedTodos = todos.filter((t) => {
        return !t.isComleted
    })
    let todosToBeRenderd = todos
    if (displayedTodosType == 'completed') {
        todosToBeRenderd = completedTodos
    } else if (displayedTodosType == 'nonCompleted') {
        todosToBeRenderd = nonCompletedTodos
    } else {
        todosToBeRenderd = todos
    }


    const todosShow = todosToBeRenderd.map((t) => {
        return <Todo key={t.id} objectTodo={t} handleCheck={handleCheckclicked} todos={todos} setTodos={setTodos} /* handlDelete={handlDeleteConfirm} */ />
    })


    function changeDisplayType(e) {
        setDisplayedTodosType(e.target.value)
    }





    return (
        <Container maxWidth="sm">
            {/*===============================main card==============================*/}
            <Card sx={{ minWidth: 275, background: "#7100ffb5" }}>
                <CardContent>
                    <Typography variant="h3" sx={{ fontWeight: "700", color: "#e22bba" }} >
                        مهامي
                    </Typography>
                    <Divider />

                    {/*
                    ==========================================
                    Filter Buttons
                    ==========================================
                    */}
                    <ToggleButtonGroup
                        value={displayedTodosType}
                        exclusive
                        onChange={changeDisplayType}
                        aria-label="text alignment"
                        style={{ direction: "ltr", marginTop: "30px" }}
                    >

                        <ToggleButton value="nonCompleted" style={{ color: "#ffffffc9", fontWeight: "900" }}>
                            غير منجز
                        </ToggleButton>
                        <ToggleButton value="completed" style={{ color: "#ffffffc9", fontWeight: "900" }}>
                            منجز
                        </ToggleButton>
                        <ToggleButton value="all" style={{ color: "#ffffffc9", fontWeight: "900" }}>
                            الكل
                        </ToggleButton>


                    </ToggleButtonGroup>
                    {/* //////////////////////////////////////////////////////// */}


                    {/* ======================== ALL TODOS =====================*/}

                    {/*
                    ===================================================
                    Injecting Array Data Mapping With 
                    Child Componant(Todo Componant) Into JSX
                    ==================================================
                     */}

                    {/*  {todosDisplay} */}
                    {todosShow}

                    {/* ======================== ALL TODOS ====================== */}




                    <Grid container spacing={2} sx={{ marginTop: "20px" }}>
                        <Grid xs={8}>
                            <TextField
                                style={{ width: "100%" }}
                                id="outlined-basic"
                                label="عنوان المهمة"
                                variant="outlined"
                                value={todosFeild}
                                onChange={(e) => {
                                    setTodosFeild(e.target.value)
                                }}

                            />

                        </Grid>
                        <Grid xs={4}>
                            {/* Add-Btn */}
                            <Button
                                style={{ width: "100%", height: "100%", background: '#bf2be2' }}
                                variant="contained"
                                onClick={handleAddclicked}>
                                إضافة مهمة جديدة
                            </Button>
                            {/* === Add-Btn === */}
                        </Grid>
                    </Grid>
                </CardContent>

            </Card>
            {/*===============================main card============================*/}


        </Container>

    );
}