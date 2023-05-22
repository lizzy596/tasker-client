import { createAuthCaller } from './http.service'
import { authService } from './auth.service'
import queryString from "query-string";
import { http } from './http.service';

export const taskService = {
  createTask,
  getAllTasks,
  deleteTask,
  updateTask,
  queryTasks

}


export function queryTasks(params) {
  const query = queryString.stringify(params);

  return http.get(`/task?${params}`)
};

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

export function updateTask(taskId, updated) {
  console.log(taskId)
  console.log(updated)
  const accessToken = authService.userValue.token;
  const http = createAuthCaller(accessToken);
  return http.patch(`/task/${taskId}`, updated);
}