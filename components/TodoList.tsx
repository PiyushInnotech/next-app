'use client'
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const TodoList = () => {
  const getLocalList = () => {
    let list = localStorage.getItem('todolist')
    if (list) {
      return JSON.parse(list)
    } else {
      return [];
    }
  }
  
  const [todoList, setTodoList] = useState([]);
  const [activeIndex, setActiveIndex] = useState(-1);
  const router = useRouter()

  const deleteTodo = (e:any, index:any) => {
    e.stopPropagation();
    let updatedList = todoList.filter((item:any, ind:any) => {
      return ind !== index;
    })

    setTodoList(updatedList)
  }

  const addNewTodo = () => {
    router.push('/addtodo')
  }

  const showDescription = (index:any) => {
    setActiveIndex(index === activeIndex ? -1 : index);
  }

  useEffect(() => {
    setTodoList(getLocalList)
  },[])

  useEffect(() => {
    localStorage.setItem("todolist", JSON.stringify(todoList))
  }, [todoList])

  return (
    <div className='todoList'>
      <h1 className="pageHeading">To Do List</h1>
      <div className='listWrapper'>
        {
          todoList && todoList.length ? todoList.map((todo:any, index:any) => {
            return (
              <div className="listItem" key={todo.id}>
                <div className='title' onClick={() => showDescription(index)}>
                  <p>{todo.title}</p>
                  <div>
                    <button onClick={(e) => deleteTodo(e, index)}>X</button>
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
      {todoList && todoList.length && <button className='addButton' onClick={() => addNewTodo()}>Add</button>}
    </div>
  )
}

export default TodoList