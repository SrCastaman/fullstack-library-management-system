package com.example.library_api.repository;
import org.springframework.data.jpa.repository.JpaRepository;

import com.example.library_api.model.Libro;


public interface LibroRepository extends JpaRepository<Libro, Long>{
    
}
