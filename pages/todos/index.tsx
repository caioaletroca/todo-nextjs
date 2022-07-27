import type { NextPage } from "next";
import React from "react";
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useSession, signOut } from "next-auth/react";
import { Button, Divider, Grid, IconButton, InputAdornment, List, ListItem, ListItemSecondaryAction, ListItemText, Paper, Typography, TextField, CircularProgress } from "components";
import { createTodo, deleteTodo, getTodos } from "queries";
import { Todo } from "types";
import styles from './index.module.scss';

const TodoPage : NextPage = () => {
    const [newTodo, setNewTodo] = React.useState('');
    const { data: user } = useSession();
    
    const queryClient = useQueryClient();
    const { mutate: create } = useMutation(createTodo, {
        onSuccess: () => queryClient.invalidateQueries(['todos'])
    });
    const { mutate: deleteAction } = useMutation(deleteTodo, {
        onSuccess: () => queryClient.invalidateQueries(['todos'])
    });
    const { data: todos, isLoading } = useQuery<Todo[]>(['todos'], getTodos);
    
    const handleClear = () => setNewTodo('');

    const handleChange = (e) => setNewTodo(e.target.value);
    
    const handleSend = () => {
        if(!newTodo) return;
        
        create({ content: newTodo });
        setNewTodo('');
    }

    const handleDelete = (id) => {
        deleteAction(id);
    }
    
    return (
        <div className="app">
            <div className={styles.header}>
                <IconButton
                    onClick={() => signOut({ callbackUrl: '/' })}>
                    <span className="material-icons">logout</span>
                </IconButton>
            </div>
            <div className={styles.content}>
                <Typography variant="h3" align="center" gutterBottom>Todos</Typography>
                <Paper className={styles.paper} elevation={2}>
                    <Grid alignItems='center' container spacing={1} padding={2}>
                        <Grid item xs={10}>
                            <TextField
                                name='todo'
                                value={newTodo}
                                onChange={handleChange}
                                InputProps={{
                                    endAdornment:
                                        <InputAdornment position="end">
                                            <IconButton
                                                onClick={handleClear}>
                                                <span className="material-icons">close</span>
                                            </IconButton>
                                        </InputAdornment>
                                }}
                                placeholder="Insert a new to do"
                                variant="outlined"
                                margin="normal"
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={2}>
                            <Button
                                endIcon={<span className='material-icons'>add</span>}
                                variant="contained"
                                onClick={handleSend}
                                fullWidth>
                                Add
                            </Button>
                        </Grid>
                    </Grid>
                    <Divider />
                    {
                        isLoading ?
                        <CircularProgress /> :
                        <List className={styles.list}>
                            {todos?.map(({ id, content }, index, array) => (
                                <ListItem
                                    key={id}
                                    divider={index < array.length - 1}>
                                    <ListItemText>{content}</ListItemText>
                                    <ListItemSecondaryAction>
                                        <IconButton>
                                            <span className="material-icons">check</span>
                                        </IconButton>
                                        <IconButton onClick={() => handleDelete(id)}>
                                            <span className="material-icons">close</span>
                                        </IconButton>
                                    </ListItemSecondaryAction>
                                </ListItem>
                            ))}
                        </List>
                    }
                </Paper>
            </div>
        </div>
    )
}

export default TodoPage;