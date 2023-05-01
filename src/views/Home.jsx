import { useState, useEffect } from 'react';
import { NavBar } from '../components/NavBar';
import { useQuery } from 'react-query';
// import { authService } from '../services/auth.service';
import TaskModal from '../components/Tasks/TaskModal';
import Task from '../components/Tasks/Task';
import { useUserAuth } from '../services/auth.service';
import { taskService } from '../services/task.service';

const Home = () => {
  // const userValue = authService.userValue;
  const userValue = useUserAuth();

  const [tasks, setTasks] = useState([]);

  const { data, isLoading } = useQuery('getAllTasks', async () => {
    console.log(isLoading);
    const { data } = await taskService.getAllTasks(userValue);
    setTasks(data);
    return data.results;
  });

  const deleteTask = async (id) => {
    await taskService.deleteTask(id);
  };

  const markComplete = async (id, task) => {
    let { isCompleted } = task;
    let updateIsCompleted = !isCompleted;

    await taskService.updateTask(id, {
      ...task,
      isCompleted: updateIsCompleted,
    });
  };

  return (
    <>
      <NavBar />
      <div className='absolute left-1 top-30'>
        <TaskModal />
      </div>
      <div className='flex justify-center items-center'>
        <div className='flex flex-col items-center justify-center'>
          <h4 className='text-4xl font-bold text-center my-5 py-8 '>
            {`Welcome Back ${
              userValue?.firstName.charAt(0).toUpperCase() +
              userValue?.firstName.slice(1)
            }!`}
          </h4>
          {!isLoading && (
            <div>
              {tasks.map((task) => {
                return (
                  <Task
                    key={task._id}
                    task={task}
                    onDelete={deleteTask}
                    onComplete={markComplete}
                  />
                );
              })}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
