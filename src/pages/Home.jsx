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
    if (task.trim() !== '') {
      setTaskList(prevTasks => ({
        ...prevTasks,
        todo : [...prevTasks.todo, task],
      }));
      setTask(''); // Clear input field
    }
  }

  // Move task to "ongoing" category
  const moveTask = (currentCategory, targetCategory, taskToMove) => {
    setTaskList((prevTasks) => {

      // Filter out the task to move from the current category
      const updatedCurrent = prevTasks[currentCategory].filter(
        (t) => t !== taskToMove
      )

      // Add the task to move to the target category
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

        {/* // Display tasks in the "todo" category */}
        <div className='task-section'>
          <h2>Tasks</h2>
          <ul>
            {taskList.todo.map((t, index) => (
              <li key = {index}>
                {t}
                <button onClick={() => moveTask('todo', 'ongoing', t)}>
                  Move to Ongoing
                </button>
                <button onClick={() => moveTask('todo', 'completed', t)}>
                  Move to Completed
                </button>
              </li>
            ))}
          </ul>
        </div>
        
        {/* // Display tasks in the "ongoing" category */}
        <div className='task-section'>
          <h2>OnGoing Tasks</h2>
          <ul>
            {taskList.ongoing.map((t, index) => (
              <li key = {index}>
                {t}
                <button onClick={() => moveTask('ongoing', 'todo', t)}>
                  Move to todo
                </button>
                <button onClick={() => moveTask('ongoing', 'completed', t)}>
                  Move to Completed
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* // Display tasks in the "completed" category */}
        <div className='task-section'>
          <h2>Completed Tasks</h2>
          <ul>
            {taskList.completed.map((t, index) => (
              <li key = {index}>
                {t}
                <button onClick={() => moveTask('completed', 'todo', t)}>
                  Move to todo
                </button>
                <button onClick={() => moveTask('completed', 'ongoing', t)}>
                  Move to Completed
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
