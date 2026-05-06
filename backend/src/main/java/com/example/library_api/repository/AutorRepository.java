package com.example.library_api.repository;
import org.springframework.data.jpa.repository.JpaRepository;

import com.example.library_api.model.Autor;


public interface AutorRepository extends JpaRepository<Autor, Long>{
    
}
