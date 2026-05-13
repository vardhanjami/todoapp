package com.vj.todoapp.controller;

import com.vj.todoapp.dto.TaskDTO;
import com.vj.todoapp.model.Task;
import com.vj.todoapp.service.TaskService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/tasks")
public class TaskController {

    private final TaskService taskService;

    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    @GetMapping
    public List<Task> getTasks() {
        return taskService.getAllTasks();
    }

    @GetMapping("/{id}")
    public Task getTaskById(@PathVariable int id) {
        return taskService.getTaskById(id);
    }

    @PostMapping
    public Task createTask(@RequestBody TaskDTO taskDTO) {
        return taskService.createTask(taskDTO);
    }

    @PatchMapping("/{id}")
    public Task patchTask(@PathVariable int id,
                          @RequestBody TaskDTO taskDTO) {
        return taskService.patchTask(id, taskDTO);
    }

    @PutMapping("/{id}")
    public Task updateTask(@PathVariable int id,
                           @RequestBody TaskDTO taskDTO) {
        return taskService.updateTask(id, taskDTO);
    }

    @DeleteMapping("/{id}")
    public void deleteTask(@PathVariable int id) {
        taskService.deleteTask(id);
    }
}