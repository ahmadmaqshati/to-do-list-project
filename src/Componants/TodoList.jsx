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
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const initionlTodos = [
    {
        id: uuidv4(),
        title: "قرأءة كتاب",
        details: "سينبسنبسناسناسنباسنباياسلبليسب",
        isComleted: false

    },
    {
        id: uuidv4(),
        title: "ممارسة السباحة",
        details: "ييسيسيسيسيسيسسيسي",
        isComleted: false
    },
    {
        id: uuidv4(),
        title: "ترتيب البيت",
        details: "يييسيسسيسييسيسيس",
        isComleted: false
    },
    {
        id: uuidv4(),
        title: "قرأءة كتاب",
        details: "سينبسنبسناسناسنباسنباياسلبليسب",
        isComleted: false

    }
]
export default function TodoList() {
    const [todos, setTodos] = useState(initionlTodos)
    const [todosFeild, setTodosFeild] = useState("")

    //EVENT
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
        setTodos([...todos, AddTodos])
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
    }


    /*========================================================
    Mapping on Data Array that Stored Inside (State)
    Then Return Data With Child Componant (Todo Componant)
    =========================================================*/
    const todosDisplay = todos.map((t) => {
        return <Todo key={t.id} objectTodo={t} handleCheck={handleCheckclicked} todos={todos} setTodos={setTodos} /* handlDelete={handlDeleteConfirm} */ />
    })

    return (
        <Container maxWidth="sm">
            {/*===============================main card==============================*/}
            <Card sx={{ minWidth: 275, background: "#7100ffb5" }}>
                <CardContent>
                    <Typography variant="h3" sx={{ fontWeight: "700", color: "#e22bba" }} >
                        مهامي
                    </Typography>
                    <Divider />

                    <ToggleButtonGroup
                        /* value={alignment}
                        exclusive
                        onChange={handleAlignment}*/
                        aria-label="text alignment"
                        style={{ direction: "ltr", marginTop: "30px" }}
                    >

                        <ToggleButton value="left" style={{ color: "#ffffffc9", fontWeight: "900" }}>
                            غير منجز
                        </ToggleButton>
                        <ToggleButton value="center" style={{ color: "#ffffffc9", fontWeight: "900" }}>
                            منجز
                        </ToggleButton>
                        <ToggleButton value="right" style={{ color: "#ffffffc9", fontWeight: "900" }}>
                            الكل
                        </ToggleButton>


                    </ToggleButtonGroup>

                    {/* ======================== ALL TODOS =====================*/}

                    {/*
                    ===================================================
                    Injecting Array Data Mapping With 
                      Child Componant(Todo Componant) Into JSX
                    ==================================================
                     */}

                    {todosDisplay}

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