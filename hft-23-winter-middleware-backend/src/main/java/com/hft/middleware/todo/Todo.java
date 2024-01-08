package com.hft.middleware.todo;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "TODOS")
public class Todo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "TEXT")
    private String text;

    @Override
    public String toString() {
        return "Todo{" +
                "id=" + id +
                '}';
    }
}
