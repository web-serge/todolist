import { instance } from "common/api"
import { BaseResponseType } from "common/types"
import { AddTaskArgType, GetTasksResponse, RemoveTaskArgType, reorderArg, TaskType } from "features/TodolistsList/api/tasks.api.types";

export const tasksApi = {
  getTasks(todolistId: string) {
    return instance.get<GetTasksResponse>(`todo-lists/${todolistId}/tasks`)
  },
  deleteTask(arg: RemoveTaskArgType) {
    return instance.delete<BaseResponseType>(`todo-lists/${arg.todolistId}/tasks/${arg.taskId}`)
  },
  createTask(arg: AddTaskArgType) {
    return instance.post<
      BaseResponseType<{
        item: TaskType
      }>
    >(`todo-lists/${arg.todolistId}/tasks`, { title: arg.title })
  },
  updateTask(todolistId: string, taskId: string, model: Partial<TaskType>) {
    return instance.put<BaseResponseType<TaskType>>(`todo-lists/${todolistId}/tasks/${taskId}`, model)
  },
  reorderTask({taskId, putAfterItemId, todolistId}: reorderArg) {
    return instance.put(`todo-lists/${todolistId}/tasks/${taskId}/reorder`, {putAfterItemId})
  }
}