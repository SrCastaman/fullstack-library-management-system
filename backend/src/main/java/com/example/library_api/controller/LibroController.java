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
import com.example.library_api.model.Libro;
import com.example.library_api.repository.AutorRepository;
import com.example.library_api.repository.LibroRepository;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/libros")
public class LibroController {
    private final LibroRepository libroRepository;
    private final AutorRepository autorRepository;


    public LibroController(LibroRepository libroRepository, AutorRepository autorRepository){
        this.libroRepository = libroRepository;
        this.autorRepository = autorRepository;
    }

    //Obtener todos los libros
    @GetMapping
    public List<Libro> getAllLibros(){
        return libroRepository.findAll();
    }

    //Crear un libro nuevo
    @PostMapping
    public Libro createLibro(@Valid @RequestBody Libro libro){
        return libroRepository.save(libro);
    }

    //Buscar un libro por ID
    @GetMapping("/{id}")
    public Libro getLibroById(@PathVariable Long id){
        return libroRepository.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Libro no encontrado"));
    }

    //Eliminar Libro por ID
    @DeleteMapping("/{id}")
    public void deleteLibro(@PathVariable Long id){
        libroRepository.deleteById(id);
    }

    //Actualizar todo de un libro por ID
    @PutMapping("/{id}")
    public Libro updateLibro(@PathVariable Long id, @RequestBody Libro libroDetails){
        return libroRepository.findById(id).map(libro -> {
            libro.setNombre(libroDetails.getNombre());
            libro.setDisponible(libroDetails.isDisponible());
            libro.setAutor(libroDetails.getAutor());
            libro.setCategoria(libroDetails.getCategoria());
            return libroRepository.save(libro);
        }).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Libro no encontrado"));
    }


    //Actualizar parte de un libro por ID
    @PatchMapping("/{id}")
    public Libro patchLibro(@PathVariable Long id, @RequestBody Map<String, Object> updates){
        return libroRepository.findById(id).map(libro -> {
                if(updates.containsKey("nombre")){
                    libro.setNombre((String) updates.get("nombre"));
                }
                if(updates.containsKey("disponible")){
                    libro.setDisponible((Boolean) updates.get("disponible"));
                }
                if(updates.containsKey("autor")){
                    Map<String, Object> autorMap = (Map<String, Object>) updates.get("autor");
                    Long autorId = ((Number) autorMap.get("id")).longValue();
                    Autor nuevoAutor = autorRepository.findById(autorId).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Autor no encontrado"));
                    libro.setAutor(nuevoAutor);
                }
                if(updates.containsKey("categoria")) {
                    libro.setCategoria((String) updates.get("categoria"));
                }
                return libroRepository.save(libro);
        }).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Libro no encontrado"));
    }

}
