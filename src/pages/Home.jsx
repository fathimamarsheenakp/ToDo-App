import React, { useState } from 'react'

export default function Home() {

  const [task, setTask] = useState(''); // task state
  const [taskList, setTaskList] = useState({ todo: [], ongoing: [], completed: []}); // task categories

  // Handle input change
  const handleInputChange = (e) => {
    setTask(e.target.value);
  }

  // Add task to "todo" category
  const addTask = () => {
    if (task.trim() === '') {
      setTaskList(prevTasks => ({
        ...prevTasks,
        todo : [...prevTasks.todo, task],
      }));
      setTask('');
    }
  }

  // Move task to "ongoing" category
  const moveTask = (currentCategory, targetCategory, taskToMove) => {
    setTaskList((prevTasks) => {
      const updatedCurrent = prevTasks[currentCategory].filter(
        (t) => t !== taskToMove
      )
      const updatedTarget = [...prevTasks[targetCategory], taskToMove]
      return {
        ...prevTasks,
        [currentCategory]: updatedCurrent,
        [targetCategory]: updatedTarget
      }
    })
  }

  return (
    <div className='home'>
      <form className='task-form'
        onSubmit={(e) => {
          e.preventDefault();
          addTask();
        }}
      >
        <input type="text" 
          placeholder="Add a task..." 
          className='task-input'
          value={task}
          onChange={handleInputChange}
          />
        <button type='button'
          className='add-task-button'
          onClick={addTask}
          >
            ADD TASK
          </button>
      </form>
      <div className='task-sections'>
        <div className='task-section'>
          <h2>Tasks</h2>
        </div>
        

        <div className='task-sections'>
          <h2>OnGoing Tasks</h2>
        </div>

        <div className='task-sections'>
          <h2>Completed Tasks</h2>
        </div>
      </div>
    </div>
  )
}
