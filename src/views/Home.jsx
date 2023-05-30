import { useState, useEffect } from 'react';
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
  const [isComplete, setIsComplete] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const { isLoading } = useQuery(['getAllTasks', searchTerm], async () => {
    if (!isSearching) {
      const { data } = await taskService.getAllTasks();
      setTasks(data);
    } else {
      const { data } = await taskService.queryTasks({
        // userId: userValue.id,
        search: searchTerm,
      });
      setTasks(data.results);
    }
  });

  const handleSearch = async (input) => {
    setIsSearching(true);
    setSearchTerm(input);
    await searchPageMutation.mutateAsync(input);
  };

  const handleOpenModal = () => {
    setIsOpen(!isOpen);
    if (isEditing) {
      setIsEditing(!isEditing);
    }
  };

  const handleCloseModal = () => {
    setIsOpen(!isOpen);
    setIsEditing(!isEditing);
  };

  const deleteTaskMutation = useMutation((id) => taskService.deleteTask(id), {
    onSuccess: () => queryClient.invalidateQueries('getAllTasks'),
  });

  const editTask = (taskBody) => {
    setIsEditing(true);
    setTaskToEdit({ ...taskBody });
    setIsOpen(true);
  };

  const searchPageMutation = useMutation((input) => setSearchTerm(input), {
    onSuccess: () => queryClient.invalidateQueries('getAllTasks'),
  });

  const markCompleteMutation = useMutation(
    ({ id, task }) =>
      taskService.updateTask(id, { ...task, isCompleted: !task.isCompleted }),
    {
      onSuccess: () => queryClient.invalidateQueries('getAllTasks'),
    }
  );

  const editTaskMutation = useMutation(
    ({ id, task }) => taskService.updateTask(id, { ...task }),
    {
      onSuccess: () => queryClient.invalidateQueries('getAllTasks'),
    }
  );

  const createTaskMutation = useMutation(
    (newTask) => taskService.createTask(newTask),
    {
      onSuccess: () => queryClient.invalidateQueries('getAllTasks'),
    },
    {
      onError: (error) => console.error(error),
    }
  );

  const handleEditTask = async (id, task) => {
    await editTaskMutation.mutateAsync({ id, task });
    setIsEditing(false);
    setIsOpen(false);
  };

  const handleCreateTask = async (newTask) => {
    await createTaskMutation.mutateAsync(newTask);
  };

  const handleDelete = async (id) => {
    await deleteTaskMutation.mutateAsync(id);
  };

  const handleComplete = async (id, task) => {
    setIsComplete(true);
    await markCompleteMutation.mutateAsync({ id, task });
  };

  return (
    <>
      <NavBar handleSearch={handleSearch} />
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
              closeModal={handleCloseModal}
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
                isComplete={isComplete}
              />
            </div>
          ) : (
            <h2>To get started create a task!</h2>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
