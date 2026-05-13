package com.vj.todoapp.service;

import com.vj.todoapp.dto.TaskDTO;
import com.vj.todoapp.exception.TaskNotFoundException;
import com.vj.todoapp.model.Task;
import com.vj.todoapp.model.User;
import com.vj.todoapp.repository.TaskRepository;
import com.vj.todoapp.repository.UserRepository;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TaskService {

    private final TaskRepository taskRepository;
    private final UserRepository userRepository;

    public TaskService(TaskRepository taskRepository,
                       UserRepository userRepository) {
        this.taskRepository = taskRepository;
        this.userRepository = userRepository;
    }


    private User getCurrentUser() {
        String username =
                SecurityContextHolder.getContext()
                        .getAuthentication()
                        .getName();

        return userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }


    public List<Task> getAllTasks() {
        User user = getCurrentUser();
        return taskRepository.findByUserUsername(user.getUsername());
    }

    public Task createTask(TaskDTO dto) {

        User user = getCurrentUser();

        Task task = new Task();
        task.setTitle(dto.getTitle());
        task.setCompleted(dto.getCompleted());
        task.setUser(user);

        return taskRepository.save(task);
    }

    public Task getTaskById(int id) {

        User user = getCurrentUser();

        Task task = taskRepository.findById(id)
                .orElseThrow(() ->
                        new TaskNotFoundException("Task not found with id: " + id));

        if (!task.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("Access denied");
        }

        return task;
    }

    public Task patchTask(int id, TaskDTO dto) {

        Task existing = getTaskById(id); // already secured

        if (dto.getTitle() != null) {
            existing.setTitle(dto.getTitle());
        }

        if (dto.getCompleted() != null) {
            existing.setCompleted(dto.getCompleted());
        }

        return taskRepository.save(existing);
    }

    public Task updateTask(int id, TaskDTO dto) {

        Task existing = getTaskById(id);

        existing.setTitle(dto.getTitle());
        existing.setCompleted(dto.getCompleted());

        return taskRepository.save(existing);
    }

    public void deleteTask(int id) {

        Task existing = getTaskById(id);

        taskRepository.delete(existing);
    }
}