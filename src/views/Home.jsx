// import { useState, useEffect } from 'react';
// import { NavBar } from '../components/NavBar';
// import { useQuery } from 'react-query';
// // import { authService } from '../services/auth.service';
// import TaskModal from '../components/Tasks/TaskModal';
// import Tasks from '../components/Tasks/Tasks';
// import { useUserAuth } from '../services/auth.service';
// import { taskService } from '../services/task.service';

// const Home = () => {
//   const userValue = useUserAuth();

//   const [tasks, setTasks] = useState([]);

//   const { isLoading } = useQuery('getAllTasks', async () => {
//     const { data } = await taskService.getAllTasks(userValue);
//     setTasks(data);
//   });

//   const deleteTask = async (id) => {
//     await taskService.deleteTask(id);
//   };

//   const markComplete = async (id, task) => {
//     let { isCompleted } = task;
//     let updateIsCompleted = !isCompleted;
//     let updatedTask = { ...task, isCompleted: updateIsCompleted };
//     console.log(updatedTask);

//     await taskService.updateTask(id, { updatedTask });
//   };

//   return (
//     <>
//       <NavBar />
//       <div className='absolute left-1 top-30'>
//         <TaskModal />
//       </div>
//       <div className='flex justify-center items-center'>
//         <div className='flex flex-col items-center justify-center'>
//           <h4 className='text-4xl font-bold text-center my-5 py-8 '>
//             {`Welcome Back ${
//               userValue?.firstName.charAt(0).toUpperCase() +
//               userValue?.firstName.slice(1)
//             }!`}
//           </h4>
//           {!isLoading && (
//             <div>
//               <Tasks
//                 tasks={tasks}
//                 onDelete={deleteTask}
//                 onComplete={markComplete}
//               />
//             </div>
//           )}
//         </div>
//       </div>
//     </>
//   );
// };

// export default Home;

import { useState } from 'react';
import { NavBar } from '../components/NavBar';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import TaskModal from '../components/Tasks/TaskModal';
import Tasks from '../components/Tasks/Tasks';
import { useUserAuth } from '../services/auth.service';
import { taskService } from '../services/task.service';

const Home = () => {
  const userValue = useUserAuth();
  const queryClient = useQueryClient();

  const [tasks, setTasks] = useState([]);

  const { isLoading } = useQuery('getAllTasks', async () => {
    const { data } = await taskService.getAllTasks(userValue);
    setTasks(data);
  });

  const deleteTaskMutation = useMutation(id => taskService.deleteTask(id), {
    onSuccess: () => queryClient.invalidateQueries('getAllTasks'),
  });

  //   const markComplete = async (id, task) => {
  //   let { isCompleted } = task;
  //   let updateIsCompleted = !isCompleted;
  //   let updatedTask = { ...task, isCompleted: updateIsCompleted };
  //   console.log(updatedTask);

  //   await taskService.updateTask(id, { updatedTask });
  // };


  // const markCompleteMutation = useMutation(
  //   ({ id, task }) => {
  //   let updatedTask = { ...task, isCompleted: !task.isCompleted };
  //     taskService.updateTask(id, {updatedTask}),
  //   {
  //     onSuccess: () => queryClient.invalidateQueries('getAllTasks'),
  //   }
  // }
  // );

  const markCompleteMutation = useMutation(
    ({ id, task }) =>
      taskService.updateTask(id, {...task,  isCompleted: !task.isCompleted }),
    {
      onSuccess: () => queryClient.invalidateQueries('getAllTasks'),
    }
  );

  const handleDelete = async (id) => {
    await deleteTaskMutation.mutateAsync(id);
  };

  const handleComplete = async (id, task) => {
    await markCompleteMutation.mutateAsync({ id, task });
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
              <Tasks tasks={tasks} onDelete={handleDelete} onComplete={handleComplete} />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;

