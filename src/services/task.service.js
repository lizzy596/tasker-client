import { createAuthCaller } from './http.service'
import { authService } from './auth.service'

export const taskService = {
  createTask,
  getAllTasks,
  deleteTask,
  updateTask

}

export function createTask(params) {
  console.log(params);
  const accessToken = authService.userValue.token;
  const http = createAuthCaller(accessToken);
  return http.post('/task', params);
}

export function getAllTasks() {
  const accessToken = authService.userValue.token;
  const id = authService.userValue.id;
  const http = createAuthCaller(accessToken);
  return http.get(`/task/user/${id}`);
}

export function deleteTask(id) {
  const accessToken = authService.userValue.token;
  const http = createAuthCaller(accessToken);
  return http.delete(`/task/${id}`);
}

export function updateTask(taskId, updatedTask) {
  console.log(updatedTask)
  const accessToken = authService.userValue.token;
  const http = createAuthCaller(accessToken);
  return http.patch(`/task/${taskId}`, updatedTask);
}