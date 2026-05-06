package com.example.library_api.repository;
import org.springframework.data.jpa.repository.JpaRepository;

import com.example.library_api.model.Usuario;


public interface UsuarioRepository extends JpaRepository<Usuario, Long>{
    
}
