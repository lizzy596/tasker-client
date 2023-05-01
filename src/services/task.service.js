import { createAuthCaller } from './http.service'
import { authService } from './auth.service'



export const taskService = {
  createTask,
  getAllTasks,
  deleteTask,
  updateTask

}


export function createTask(params) {
  const accessToken = authService.userValue.token;
  const http = createAuthCaller(accessToken);
  return http.post('/task', params);
}

export function getAllTasks(params) {
  const accessToken = authService.userValue.token;
  const http = createAuthCaller(accessToken);
  return http.get('/task', params);
}


export function deleteTask(id) {
  const accessToken = authService.userValue.token;
  const http = createAuthCaller(accessToken);
  return http.delete(`/task/${id}`);
}

export function updateTask(taskId, updatedTask) {
  const accessToken = authService.userValue.token;
  const http = createAuthCaller(accessToken);
  return http.patch(`/task/${taskId}`, updatedTask);
}