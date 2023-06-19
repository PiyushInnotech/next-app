'use client'
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAppSelector, useAppDispatch } from '@/redux/hooks';
import { deleteTodoAction } from '@/redux/todos/todoSlice';
const TodoList = () => {

  const [activeIndex, setActiveIndex] = useState(-1);
  const router = useRouter()
  const dispatch = useAppDispatch()
  const todoItems = useAppSelector((state) => state.todoReducer.list)

  const deleteTodo = (e : any, id: number) => {
    e.stopPropagation();
    dispatch(deleteTodoAction(id))
  }

  const addNewTodo = () => {
    router.push('/addtodo')
  }

  const showDescription = (index: any) => {
    setActiveIndex(index === activeIndex ? -1 : index);
  }

  return (
    <div className='todoList'>
      <h1 className="pageHeading">To Do List</h1>
      <div className='listWrapper'>
        {
          todoItems && todoItems.length ? todoItems.map((todo: any, index: number) => {
            return (
              <div className="listItem" key={todo.id}>
                <div className='title' onClick={() => showDescription(index)}>
                  <p>{todo.title}</p>
                  <div>
                    <button onClick={(e) => deleteTodo(e ,todo.id)}>X</button>
                  </div>
                </div>
                {index === activeIndex && <p className="desc"> Description: {todo.desc} </p>}
              </div>
            );
          }) : (
            <div className="noTodo">
              <h4 className='pageSubHeading'>No Todos, Add a todo</h4>
              <button className='' onClick={() => addNewTodo()}>Add</button>
            </div>
          )
        }
      </div>
      {todoItems && todoItems.length && <button className='addButton' onClick={() => addNewTodo()}>Add</button>}
    </div>
  )
}

export default TodoList