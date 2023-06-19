'use client'
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { addTodoAction } from '@/redux/todos/todoSlice';

const AddTodo = () => {
    const [newTodo, setNewTodo] = useState({
        title: '',
        desc: '',
        id: null,
    });

    const [error, setError] = useState('');
    const todoList = useAppSelector((state) => state.todoReducer.list)
    const newTodoId = todoList && todoList.length ? todoList[todoList.length - 1].id + 1 : 1
    const router = useRouter()
    const dispatch = useAppDispatch();

    useEffect(() => {
        setNewTodo((prevTodo: any) => ({ ...prevTodo, id: newTodoId }));
    }, [newTodoId])

    const handleAddTodoItem = (e: any) => {
        const { name, value } = e.target;
        if (value) {
            setError('')
        }
        setNewTodo({ ...newTodo, [name]: value })
    }

    const handleSubmit = (e: any) => {
        e.preventDefault();
        if (newTodo.title && newTodo.desc) {
            dispatch(addTodoAction({
                id: newTodoId,
                title: newTodo.title,
                desc: newTodo.desc
            }))
            setNewTodo({ ...newTodo, title: '', desc: '' })
            router.push('/')
        } else {
            setError('Title and Description Should not be Empty')
        }
    }

    return (
        <div className="formWrapper">
            <h1 className='pageHeading'>Add ToDo to your List.</h1>
            <form>
                <label>Title</label>
                <input
                    type='text'
                    value={newTodo.title}
                    name="title"
                    onChange={handleAddTodoItem}
                    placeholder='Enter Todo' />
                <label>Description</label>
                <textarea
                    value={newTodo.desc}
                    name="desc"
                    onChange={handleAddTodoItem}
                    placeholder='Enter Description' />

                <p>{error}</p>
                <button onClick={handleSubmit}>
                    Add
                </button>
            </form>
        </div>
    )
}

export default AddTodo