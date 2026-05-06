package com.example.library_api.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.library_api.model.Reserva;
import com.example.library_api.model.Usuario;

public interface ReservaRepository extends JpaRepository<Reserva, Long>{
    List<Reserva> findByUsuario(Usuario usuario);
}
