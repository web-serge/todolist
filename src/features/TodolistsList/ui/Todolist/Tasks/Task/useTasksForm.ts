import { ChangeEvent, useState } from "react";
import { useActions } from "common/hooks";
import { tasksThunks } from "features/TodolistsList/model/tasks.slice";
import { TaskStatuses } from "common/enums";
import { getDate } from "common/utils/getDate";
import { FormikHelpers, useFormik } from "formik";
import { BaseResponseType } from "common/types";
import { TaskType } from "features/TodolistsList/api/tasks.api.types";

export const useTask = (task: TaskType) => {
  const { id: taskId, todoListId: todolistId, title } = task;
  const [isVisible, setIsVisible] = useState(false);
  const { removeTask, updateTask } = useActions(tasksThunks);

  const removeTaskHandler = () => {
    removeTask({ taskId, todolistId });
  };

  const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const status = e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New;
    updateTask({ taskId, domainModel: { status }, todolistId });
  };

  const changeTaskTitleHandler = (title: string) => {
    if (task.title === title) return;
    updateTask({ taskId, domainModel: { title }, todolistId });
  };

  const isTaskCompleted = task.status === TaskStatuses.Completed;
  const { dayOfWeek, day, month } = getDate(task.addedDate);

  type editTask = {
    title: string, description: string, deadline: string
  }
  const formik = useFormik({
    validate: (values) => {
      const errors = {} as editTask;
      if (!values.title) {
        errors.title = "Title is required";
      }

      return errors;
    },
    initialValues: {
      title: task.title,
      description: task.description || "",
      deadline: task.deadline || ""
    },
    onSubmit: (values, formikHelpers: FormikHelpers<editTask>) => {
      updateTask({ taskId: task.id, todolistId: task.todoListId, domainModel: values })
        .unwrap()
        .then(() => setIsVisible(false))
        .catch((reason: BaseResponseType) => {
          reason.fieldsErrors?.forEach((fieldError) => {
            formikHelpers.setFieldError(fieldError.field, fieldError.error);
          });
        });
    }
  });

  const isTitleError = formik.touched.title && !!formik.errors.title

  return {
    isTitleError,
    isVisible,
    formik,
    title,
    dayOfWeek,
    day,
    month,
    isTaskCompleted,
    changeTaskStatusHandler,
    changeTaskTitleHandler,
    setIsVisible, removeTaskHandler
  };
};