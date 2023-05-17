import { useState } from 'react';
import { NavBar } from '../components/NavBar';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import CreateTask from '../components/Tasks/CreateTask';
import Modal from '../components/Tasks/Modal';
import Tasks from '../components/Tasks/Tasks';
import { useUserAuth } from '../services/auth.service';
import { taskService } from '../services/task.service';

const Home = () => {
  const userValue = useUserAuth();
  const queryClient = useQueryClient();

  const [tasks, setTasks] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState({});
  const [isOpen, setIsOpen] = useState(false);

  const { isLoading } = useQuery('getAllTasks', async () => {
    const { data } = await taskService.getAllTasks();
    setTasks(data);
  });

  const handleOpenModal = () => {
    setIsOpen(!isOpen);
  };

  const deleteTaskMutation = useMutation((id) => taskService.deleteTask(id), {
    onSuccess: () => queryClient.invalidateQueries('getAllTasks'),
  });

  const editTask = (taskBody) => {
    setIsEditing(true);
    setTaskToEdit({ ...taskBody });
    setIsOpen(true);
  };

  const markCompleteMutation = useMutation(
    ({ id, task }) =>
      taskService.updateTask(id, { ...task, isCompleted: !task.isCompleted }),
    {
      onSuccess: () => queryClient.invalidateQueries('getAllTasks'),
    }
  );

  // const editTaskMutation = (id, updatedTask) => {
  //   console.log(updatedTask);
  //   taskService.updateTask(id, updatedTask);
  // };

  const editTaskMutation = useMutation(
    (id, updatedTask) => taskService.updateTask(id, updatedTask),
    {
      onSuccess: () => queryClient.invalidateQueries('getAllTasks'),
    }
  );

  const createTaskMutation = useMutation(
    (newTask) => taskService.createTask(newTask),
    {
      onSuccess: () => queryClient.invalidateQueries('getAllTasks'),
    }
  );

  const handleEditTask = async (taskId, updatedTask) => {
    console.log(taskId, updatedTask);
    await editTaskMutation(taskId, updatedTask);
    //await editTaskMutation.mutateAsync(taskId, updatedTask);
  };
  const handleCreateTask = async (newTask) => {
    await createTaskMutation.mutateAsync(newTask);
  };

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
        <Modal
          openModal={handleOpenModal}
          isOpen={isOpen}
          buttonText='Create Task'
          component={
            <CreateTask
              isEditing={isEditing}
              setEditTask={isEditing ? taskToEdit : null}
              openModal={handleOpenModal}
              onCreate={handleCreateTask}
              onEdit={handleEditTask}
            />
          }
        />
      </div>
      <div className='flex justify-center items-center'>
        <div className='flex flex-col items-center justify-center'>
          <h4 className='text-4xl font-bold text-center my-5 py-8 '>
            {`Welcome Back ${
              userValue?.firstName.charAt(0).toUpperCase() +
              userValue?.firstName.slice(1)
            }!`}
          </h4>
          {!isLoading && tasks.length > 0 ? (
            <div>
              <Tasks
                tasks={tasks}
                onEdit={editTask}
                onDelete={handleDelete}
                onComplete={handleComplete}
              />
            </div>
          ) : (
            <h2>To Get Started, create a task!!</h2>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
