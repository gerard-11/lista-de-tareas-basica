import {useEffect, useState} from 'react'
import './App.css'

function App() {
  const [task, setTask] = useState('')
    const [tasks, setTasks] = useState(()=>{
        const stored = localStorage.getItem('tasks') //funcion para que al inicio de cada render el estado se revise si hay items  los parsea sino devuelve un array vacio
        if(stored){ // sino incio mi estado de esta forma el esatado no se guarda en localstorage
            return JSON.parse(stored)
        }else{
            return []
        }

    })

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks))// cada que se actualiza mi estado tasks
    },[tasks])//porque si tasks se actualiza quiere decir que hay una tarea que entra a local storage

    const writeTask=(event)=> setTask(event.target.value)

const addTaskEnter=(event)=> {
      if (event.key === 'Enter'){
         addTask()
      }
}
const editTask=(id)=> {
      const newText=window.prompt('Edita tu tarea'  );
      if(!newText) return
      setTasks(tasks.map(task=> task.id === id ? {...task, text:newText} : task))
}
    const addTask= ()=>{
        if (task=== '') return
        setTasks([...tasks, //se copian todas las tareas y se agregan la nueva tarea en forma de objeto sino se copian el setTasks actualiza y las deja libres, las eliminaria el garbage collector
            {
                id:Date.now(),
                text:task,
                completed:false
            }])
        setTask('')
    }
    const deleteTask= (id)=>{
     setTasks(tasks.filter(task => task.id !== id))// hazme un nuevo array con todos los elementos que sean diferentes al id seleccionado
    }
    const changeStateTask=(id)=> {
      setTasks(tasks.map(task => id === task.id ? { ...task, completed:!task.completed } : task))
    }

  return (
        <div>
            <h1>Lista de Tareas</h1>
            <input type= 'text' onChange={writeTask} onKeyDown={addTaskEnter} value={task} placeholder="Agregar Tareas"/>
            <button className='buttonAdd' onClick={addTask} >Add Task</button>
            <ul>
                {tasks.map((t) => (
                    <li key={t.id} style={{textDecoration: t.completed ? 'line-through' : 'none'}}>
                        <span onClick={()=>changeStateTask(t.id)} style={{cursor:'pointer'}}>{t.text}
                        </span>
                        <button className='buttonDelete' onClick={()=> deleteTask(t.id)}>❌</button>
                    <button className='buttonEdit' onClick={()=>editTask(t.id)}>✍️</button>
                    </li>
                    ))}
            </ul>


        </div>
  )
}

export default App
