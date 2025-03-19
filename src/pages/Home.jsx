import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRedo, faTrash, faCheck, faArrowLeft } from '@fortawesome/free-solid-svg-icons';

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
    } else {
      alert('Task cannot be empty!') // Alert user if task is empty
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

  // Clear specific task category
  const clearTask = (category, taskToClear) => {
    setTaskList((prevTasks) => {
      const updatedTasks = prevTasks[category].filter(
        (t) => t !== taskToClear
      )
      return {
        ...prevTasks,
        [category]: updatedTasks
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
                <button 
                  onClick={() => moveTask('todo', 'ongoing', t)}
                  title='Start Task'  
                  >
                  Start
                </button>
                <button 
                  title='Complete Task'
                  onClick={() => {
                  const confirm = window.confirm('Are you sure you want to mark this task as completed?');
                  if (confirm) {
                    moveTask('ongoing', 'completed', t);
                  }
                }}>
                  <FontAwesomeIcon icon={faCheck} />
                </button>
                <button 
                  title='Delete Task'
                  onClick={() => clearTask('todo', t)}>
                  <FontAwesomeIcon icon={faTrash} />
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
                <button 
                  title='Move back'
                  onClick={() => moveTask('ongoing', 'todo', t)}>
                  <FontAwesomeIcon icon={faArrowLeft} />
                </button>

                <button 
                  title='Complete Task'
                  onClick={() => {
                  const confirm = window.confirm('Are you sure you want to mark this task as completed?');
                  if (confirm) {
                    moveTask('ongoing', 'completed', t);
                  }
                }}>
                  <FontAwesomeIcon icon={faCheck} />
                </button>

                <button 
                  title='Delete Task'
                  onClick={() => clearTask('ongoing', t)}>
                  <FontAwesomeIcon icon={faTrash} />
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

                <button 
                  title='Redo Task'
                  onClick={() => moveTask('completed', 'todo', t)}>
                  <FontAwesomeIcon icon={faRedo} />
                </button>
                
                <button 
                  title='Delete Task'
                  className='deleteButton' 
                  onClick={() => clearTask('completed', t)}>
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
