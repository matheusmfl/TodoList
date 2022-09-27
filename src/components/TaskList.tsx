import { useState } from 'react'

import '../styles/tasklist.scss'

import { FiTrash, FiCheckSquare } from 'react-icons/fi'

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  function handleCreateNewTask() {
    // Crie uma nova task com um id random, não permita criar caso o título seja vazio.
    const newTask = {
      id: Math.random(),
      title: newTaskTitle,
      isComplete: false
    }
    if (newTask.title == ''){
      return alert('Não pode colocar valores vazios')
    }
    
    setNewTaskTitle('')
    setTasks(tasks => [...tasks, newTask])


  }

  function handleToggleTaskCompletion(id: number) {
    // Altere entre `true` ou `false` o campo `isComplete` de uma task com dado ID


    const taskToogled = tasks.map(task => task.id === id ? {
      ...task, 
    isComplete: !task.isComplete} : task )

    setTasks(taskToogled)


    /* ESSE FOI O MODO QUE EU TENTEI ANTES DE VER VIDEO AULA 
   const taskComplete = tasks.filter(tarefa => tarefa.id === id)
   const newTaskComplete = {
    id: taskComplete[0].id,
    title: taskComplete[0].title,
    isComplete: !taskComplete[0].isComplete
  }
   setTasks(tasks => [...tasks.filter(tarefa => tarefa.id !== id), newTaskComplete])
 */


  }

  function handleRemoveTask(id: number) {
    // Remova uma task da listagem pelo ID

    setTasks(tasks => [...tasks.filter(tarefa => tarefa.id !== id)])

  }

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input 
            className='firstInput'
            type="text" 
            placeholder="Adicionar novo todo" 
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button type="submit" data-testid="add-task-button" onClick={handleCreateNewTask}>
            <FiCheckSquare size={16} color="#fff"/>
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <div className={task.isComplete ? 'completed' : ''} data-testid="task" >
                <label className="checkbox-container">
                  <input 
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button type="button" data-testid="remove-task-button" onClick={() => handleRemoveTask(task.id)}>
                <FiTrash size={16}/>
              </button>
            </li>
          ))}
          
        </ul>
      </main>
    </section>
  )
}