import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../utils/api';
import { mapApiTaskToTask } from '../types/task';
import type { Task, TaskFromAPI, TaskStatus } from '../types/task';

const initialTasks: Task[] = [];

export const useTasks = () => {
  return useQuery<Task[]>({
    queryKey: ['tasks'],
    queryFn: async () => {
      return initialTasks;
    },
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false
  });
};

export const useCreateTask = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (taskData: { title: string; description?: string }) => {
      const newTask: Task = {
        ...taskData,
        id: Date.now(), // уникальный ID из timestamp
        createdAt: new Date(),
        status: 0
      };
      return newTask;
    },
    onSuccess: (newTask) => {
      queryClient.setQueryData(['tasks'], (old: Task[] = []) => [...old, newTask]);
    }
  });
};

export const useUpdateTask = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, status }: { id: number; status: TaskStatus }) => {
      return { id, status };
    },
    onSuccess: ({ id, status }) => {
      queryClient.setQueryData(['tasks'], (old: Task[] = []) =>
        old.map(task => task.id === id ? { ...task, status } : task)
      );
    }
  });
};

export const useDeleteTask = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id: number) => id,
    onSuccess: (id) => {
      queryClient.setQueryData(['tasks'], (old: Task[] = []) =>
        old.filter(task => task.id !== id)
      );
    }
  });
};