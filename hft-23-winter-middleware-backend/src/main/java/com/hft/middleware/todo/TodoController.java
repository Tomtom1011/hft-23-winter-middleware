package com.hft.middleware.todo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/todos")
@CrossOrigin(origins = "*")
public class TodoController {

    private final TodoService todoService;

    @Autowired
    public TodoController(TodoService todoService) {
        this.todoService = todoService;
    }

    @GetMapping
    public ResponseEntity<List<Todo>> getAllTodos() {
        return ResponseEntity.ok(todoService.getAllTodos());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> geTodo(@PathVariable int id){

        Optional<Todo> todo = todoService.findTodoById(id);

        if (todo.isPresent()) {
            return ResponseEntity.ok(todo.get());
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Todo with id " + id +" not found");
        }
    }

    @PostMapping("/{newString}")
    public ResponseEntity<?> createString(@PathVariable String newString) {
        Todo newTodo = new Todo();
        newTodo.setText(newString);
        todoService.saveTodo(newTodo);

        return ResponseEntity.ok(newTodo);
    }

    @PutMapping("/{id}/{newString}")
    public ResponseEntity<?> updateString(
            @PathVariable int id,
            @PathVariable String newString
    ) {
        Optional<Todo> todo = todoService.findTodoById(id);

        if (todo.isPresent()) {
            Todo toChange = todo.get();
            toChange.setText(newString);
            return ResponseEntity.ok(toChange);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Todo with id " + id +" not found");
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteString(@PathVariable int id) {
        Optional<Todo> todo = todoService.findTodoById(id);

        if (todo.isPresent()) {
            todoService.deleteTodo(todo.get());
            return ResponseEntity.ok("Todo with id " + id + " deleted");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Todo with id " + id + " not found");
        }
    }
}