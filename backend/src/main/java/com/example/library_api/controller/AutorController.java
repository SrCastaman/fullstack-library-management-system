package com.example.library_api.controller;

import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
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

import com.example.library_api.model.Autor;
import com.example.library_api.repository.AutorRepository;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/autores")
public class AutorController {

    private final AutorRepository autorRepository;

    public AutorController(AutorRepository autorRepository) {
        this.autorRepository = autorRepository;
    }


    //Obtener todos los autores
    @GetMapping
    public List<Autor> getAllAutores(){
        return autorRepository.findAll();
    }

    //Crear un autor
    @PostMapping
    public Autor createAutor(@Valid @RequestBody Autor autor){
        return autorRepository.save(autor);
    }

    //Buscar un autor por ID
    @GetMapping("/{id}")
    public Autor getAutorById(@PathVariable Long id){
        return autorRepository.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Autor no encontrado"));
    }

    //Eliminar un autor por ID
    @DeleteMapping("/{id}")
    public void deleteAutor(@PathVariable Long id){
        autorRepository.deleteById(id);
    }

    //Actualizar todo de un autor por ID
    @PutMapping("/{id}")
    public Autor updateAutor(@PathVariable Long id, @RequestBody Autor autorDetails){
        return autorRepository.findById(id).map(autor -> {
            autor.setNombre(autorDetails.getNombre());
            return autorRepository.save(autor);
        }).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Autor no encontrado"));
    }

    //Actualizar parte de un autor por ID
    @PatchMapping("/{id}")
    public Autor patchAutor(@PathVariable Long id, @RequestBody Map<String, Object> updates) {
        return autorRepository.findById(id).map(autor -> {
            if(updates.containsKey("nombre")){
                autor.setNombre((String) updates.get("nombre"));
            }
            return autorRepository.save(autor);
        }).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Autor no encontrado"));
    }

}
