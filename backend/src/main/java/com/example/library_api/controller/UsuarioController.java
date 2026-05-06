package com.example.library_api.controller;

import java.util.List;
import java.util.Map;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.example.library_api.model.Usuario;
import com.example.library_api.repository.UsuarioRepository;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/usuarios")
public class UsuarioController {
    private final UsuarioRepository usuarioRepository;


    public UsuarioController(UsuarioRepository usuarioRepository){
        this.usuarioRepository = usuarioRepository;
    }

    //Obtener todos los usuarios
    @GetMapping
    public List<Usuario> getAllUsuarios(){
        return usuarioRepository.findAll();
    }

    //Crear un usuario nuevo
    @PostMapping
    public Usuario createUsuario(@Valid @RequestBody Usuario usuario){
        return usuarioRepository.save(usuario);
    }

    //Buscar un usuario por ID
    @GetMapping("/{id}")
    public Usuario getUsuarioById(@PathVariable Long id){
        return usuarioRepository.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Autor no encontrado"));
    }

    //Eliminar un usuario por ID
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteUsuario(@PathVariable Long id) {
        if (!usuarioRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        try {
            usuarioRepository.deleteById(id);
            return ResponseEntity.noContent().build(); 
        } catch (DataIntegrityViolationException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("No se puede eliminar el usuario porque tiene reservas asociadas");
        }
    }


    //Actualizar todo un usuario por ID
    @PutMapping("/{id}")
    public Usuario updateUsuario(@PathVariable Long id, @RequestBody Usuario usuarioDetails){
        return usuarioRepository.findById(id).map(usuario-> {
            usuario.setNombre(usuarioDetails.getNombre());
            usuario.setEmail(usuarioDetails.getEmail());
            return usuarioRepository.save(usuario);
        }).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Usuario no encontrado"));
    }


    //Actualizar parte de un usuario por ID
    @PatchMapping("/{id}")
    public Usuario patchUsuario(@PathVariable Long id, @RequestBody Map<String, Object> updates){
        return usuarioRepository.findById(id).map(usuario -> {
            if(updates.containsKey("nombre")){
                usuario.setNombre((String) updates.get("nombre"));
            }
            if(updates.containsKey("email")){
                usuario.setEmail((String) updates.get("email"));
            }
            
            return usuarioRepository.save(usuario);
        }).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Usuario no encontrado"));
    }

}
