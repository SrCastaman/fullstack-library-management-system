package com.example.library_api.controller;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
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

import com.example.library_api.model.Libro;
import com.example.library_api.model.Reserva;
import com.example.library_api.model.Usuario;
import com.example.library_api.repository.LibroRepository;
import com.example.library_api.repository.ReservaRepository;
import com.example.library_api.repository.UsuarioRepository;

@RestController
@RequestMapping("api/reservas")
public class ReservaController {

    private final ReservaRepository reservaRepository;
    private final UsuarioRepository usuarioRepository;
    private final LibroRepository libroRepository;

    public ReservaController(ReservaRepository reservaRepository, UsuarioRepository usuarioRepository, LibroRepository libroRepository) {
        this.reservaRepository = reservaRepository;
        this.usuarioRepository = usuarioRepository;
        this.libroRepository = libroRepository;
    }

    //Obtener todas las reservas
    @GetMapping
    public List<Reserva> getAllReservas() {
        return reservaRepository.findAll();
    }

    //Obtener reservas atrasadas
    @GetMapping("/retrasadas")
    public List<Reserva> getReservasRetrasadas() {
        LocalDateTime now = LocalDateTime.now();
        return reservaRepository.findAll().stream()
                    .filter(r -> r.getFechaDevolucion() == null && r.getFechaLimite() != null && r.getFechaLimite().isBefore(now))
                    .toList();
    }

    //Obetener una reserva por ID
    @GetMapping("/{id}")
    public Reserva getReservaById(@PathVariable Long id) {
        return reservaRepository.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Reserva no encontrada"));
    }

    //Crear una reserva
    @PostMapping
    public Reserva crearReserva(@RequestBody Map<String, Long> body) {
        Long libroId = body.get("libroId");
        Long usuarioId = body.get("usuarioId");

        Libro libro = libroRepository.findById(libroId).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Libro no encontrado"));

        if (!libro.isDisponible()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Libro no disponible");
        }

        Usuario usuario = usuarioRepository.findById(usuarioId).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Usuario no encontrado"));

        libro.setDisponible(false);
        libroRepository.save(libro);

        Reserva reserva = new Reserva();
        reserva.setLibro(libro);
        reserva.setUsuario(usuario);
        reserva.setFechaReserva(LocalDateTime.now().truncatedTo(ChronoUnit.SECONDS));
        reserva.setFechaDevolucion(null);
        reserva.setFechaLimite(LocalDateTime.now().plusMinutes(1).truncatedTo(ChronoUnit.SECONDS));

        return reservaRepository.save(reserva);
    }

    //Actualizar toda la reserva
    @PutMapping("/{id}")
    public Reserva updateReserva(@PathVariable Long id, @RequestBody Reserva reservaDetails) {
        return reservaRepository.findById(id).map(reserva -> {
            reserva.setLibro(reservaDetails.getLibro());
            reserva.setUsuario(reservaDetails.getUsuario());
            reserva.setFechaReserva(reservaDetails.getFechaReserva());
            reserva.setFechaDevolucion(reservaDetails.getFechaDevolucion());

            return reservaRepository.save(reserva);

        }).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Reserva no encontrada"));
    }

    //Actualizar parte de la reserva
    @PatchMapping("/{id}")
    public Reserva patchReserva(@PathVariable Long id, @RequestBody Map<String, Object> updates) {
        return reservaRepository.findById(id).map(reserva -> {
            if (updates.containsKey("libro")) {
                Map<String, Object> libroMap = (Map<String, Object>) updates.get("libro");
                Long libroId = ((Number) libroMap.get("id")).longValue();
                Libro libro = libroRepository.findById(libroId).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Libro no encontrado"));
                reserva.setLibro(libro);
            }

            if (updates.containsKey("usuario")) {
                Map<String, Object> usuarioMap = (Map<String, Object>) updates.get("usuario");
                Long usuarioId = ((Number) usuarioMap.get("id")).longValue();
                Usuario usuario = usuarioRepository.findById(usuarioId).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Usuario no encontrado"));
                reserva.setUsuario(usuario);
            }

            if (updates.containsKey("fechaReserva")) {
                String fechaReservaStr = (String) updates.get("fechaReserva");
                reserva.setFechaReserva(LocalDateTime.parse(fechaReservaStr));
            }

            if (updates.containsKey("fechaDevolucion")) {
                String fechaDevolucionStr = (String) updates.get("fechaDevolucion");
                reserva.setFechaDevolucion(LocalDateTime.parse(fechaDevolucionStr));
            }
            return reservaRepository.save(reserva);
        }).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Reserva no encontrada"));
    }

    //Eliminar una reserva
    @DeleteMapping("/{id}")
    public void deleteReserva(@PathVariable Long id) {
        if (!reservaRepository.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Reserva no encontrada");
        }
        reservaRepository.deleteById(id);
    }

    //Devolver un libro
    @PostMapping("/devolver/{reservaId}")
    public Reserva devolverLibro(@PathVariable Long reservaId) {
        return reservaRepository.findById(reservaId).map(reserva -> {

            if (reserva.getFechaDevolucion() != null) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Este libro ya fue devuelto");
            }
            reserva.setFechaDevolucion(LocalDateTime.now().truncatedTo(ChronoUnit.SECONDS));
            reserva.getLibro().setDisponible(true);
            libroRepository.save(reserva.getLibro());
            return reservaRepository.save(reserva);
        }).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Reserva no encontrada"));
    }

    //Obtener todas las reservas de un usuario
    @GetMapping("/usuario/{usuarioId}")
    public List<Reserva> getReservasByUsuario(@PathVariable Long usuarioId) {
        Usuario usuario = usuarioRepository.findById(usuarioId).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "No se encontró usuario"));

        return reservaRepository.findByUsuario(usuario);

    }

    //Obtener solo los libros que aun estan reservados de un usuario
    @GetMapping("/usuario/{usuarioId}/libros")
    public List<Libro> getLibrosActivosReservadosByUsuarios(@PathVariable Long usuarioId) {
        Usuario usuario = usuarioRepository.findById(usuarioId).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Usuario no encontrado"));

        return reservaRepository.findByUsuario(usuario).stream().filter(reserva -> reserva.getFechaDevolucion() == null).map(Reserva::getLibro).toList();
    }

}
