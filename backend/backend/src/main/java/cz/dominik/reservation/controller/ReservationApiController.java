package cz.dominik.reservation.controller;

import cz.dominik.reservation.entity.Reservation;
import cz.dominik.reservation.service.ReservationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * REST API controller pro práci s rezervacemi.
 *
 * - načítání seznamu rezervací (pro admin tabulku)
 * - získání detailu jedné rezervace
 * - vytvoření nové rezervace
 * - úpravu existující rezervace
 * - smazání rezervace
 */
@RestController
@RequestMapping("/api/reservations")
@CrossOrigin(origins = "http://localhost:5173")
public class ReservationApiController {

    private final ReservationService reservationService;

    public ReservationApiController(ReservationService reservationService) {
        this.reservationService = reservationService;
    }

    /**
     * Vrátí seznam všech rezervací.
     *
     * Používá se hlavně v:
     * - admin tabulce s přehledem rezervací
     * - testovacím tlačítku „Načíst rezervace“ ve spodním panelu
     *
     * @return seznam všech rezervací v databázi
     */
    @GetMapping
    public List<Reservation> getAll() {
        return reservationService.getAllReservations();
    }

    /**
     * Smaže rezervaci podle ID.
     *
     * - volá se z admin tabulky při potvrzení smazání
     * - v případě neexistence ID vrací 404
     */
    @DeleteMapping("/{id}")
    public void deleteReservation(@PathVariable Long id) {
        reservationService.deleteReservation(id);
    }

    /**
     * Vytvoří novou rezervaci.
     *
     * - očekává JSON s údaji o zákazníkovi, službě, datu a času
     * - deleguje uložení do ReservationService
     * - vrací uloženou rezervaci včetně vygenerovaného ID
     */
    @PostMapping
    public ResponseEntity<Reservation> createReservation(@RequestBody Reservation reservation) {
        Reservation saved = reservationService.createReservation(reservation);
        return ResponseEntity.status(201).body(saved);
    }

    /**
     * Aktualizuje existující rezervaci podle ID.
     *
     * - pokud rezervace neexistuje, vyhazuje výjimku -> 404
     * - používá se pro úpravu poslední rezervace i editaci z tabulky
     */
    @PutMapping("/{id}")
    public ResponseEntity<Reservation> updateReservation(@PathVariable Long id, @RequestBody Reservation updated) {
        updated.setId(id);
        Reservation saved = reservationService.updateReservation(updated);
        return ResponseEntity.ok(saved);
    }

    /**
     * Vrátí detail jedné konkrétní rezervace.
     *
     * - používá se při kliknutí na tlačítko „Upravit“ v tabulce
     * - pokud rezervace neexistuje, vrací HTTP 404
     *
     * @param id ID hledané rezervace
     * @return ResponseEntity s rezervací nebo 404, pokud neexistuje
     */
    @GetMapping("/{id}")
    public ResponseEntity<Reservation> getById(@PathVariable Long id) {
        return reservationService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

}
