import { createAuthCaller } from './http.service'
import { authService } from './auth.service'



export const taskService = {
  createTask

}


export function createTask(params) {
  const accessToken = authService.userValue.token;
  const http = createAuthCaller(accessToken);
  return http.post('/task/create', params);
}