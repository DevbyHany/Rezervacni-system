package cz.dominik.reservation.service;

import cz.dominik.reservation.entity.Reservation;
import cz.dominik.reservation.entity.Service;
import cz.dominik.reservation.repository.ReservationRepository;
import cz.dominik.reservation.repository.ServiceRepository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;

/**
 * Servisní vrstva pro práci s rezervacemi.
 *
 * Zapouzdřuje:
 * - načítání a ukládání rezervací přes repository
 * - business logiku (validace termínů, kontrola služeb, apod.)
 */
@org.springframework.stereotype.Service
public class ReservationService {

    private final ReservationRepository reservationRepository;
    private final ServiceRepository serviceRepository;

    public ReservationService(ReservationRepository reservationRepository, ServiceRepository serviceRepository) {
        this.reservationRepository = reservationRepository;
        this.serviceRepository = serviceRepository;
    }


    public Optional<Reservation> findById(Long id) {
        return reservationRepository.findById(id);
    }

    /**
     * Vytvoří a uloží novou rezervaci.
     */
    public Reservation createReservation(Reservation reservation) {
        if (reservation.getReservationDate() == null) {
            throw new IllegalArgumentException("Datum rezervace je povinné.");
        }
        if (reservation.getReservationTime() == null) {
            throw new IllegalArgumentException("Čas rezervace je povinný.");
        }

        LocalDateTime dt = reservation.getReservationDate().atTime(reservation.getReservationTime());
        if (dt.isBefore(LocalDateTime.now())) {
            throw new IllegalArgumentException("Zadali jste neplatné datum.");
        }

        boolean exists = reservationRepository.existsByReservationDateAndReservationTime(
                reservation.getReservationDate(),
                reservation.getReservationTime()
        );

        if (exists) {
            throw new IllegalArgumentException("Termín je již obsazený.");
        }

        if (reservation.getService() == null || reservation.getService().getId() == null) {
            throw new IllegalArgumentException("Služba je povinná.");
        }

        Service service = serviceRepository.findById(reservation.getService().getId())
                .orElseThrow(() -> new IllegalArgumentException("Vybraná služba neexistuje."));

        reservation.setService(service);

        return reservationRepository.save(reservation);
    }


    /**
     * Vrátí seznam všech rezervací seřazených podle data vytvoření.
     * Používá se v admin přehledu.
     */
    public List<Reservation> getAllReservations() {
        return reservationRepository
                .findAll()
                .stream()
                .sorted(Comparator
                        .comparing(Reservation::getReservationDate)
                        .thenComparing(Reservation::getReservationTime))
                        .toList();
    }

    /**
     * Smaže rezervaci podle ID.
     */
    public void deleteReservation(Long id) {
        if (!reservationRepository.existsById(id)) {
            throw new IllegalArgumentException("Rezervace nebyla nalezena");
        }
        reservationRepository.deleteById(id);
    }

    public Reservation getById(Long id) {
        return reservationRepository.findById(id).orElse(null);
    }

    /**
     * Aktualizuje existující rezervaci.
     */
    public Reservation updateReservation(Reservation updated) {
        Reservation target = reservationRepository.findById(updated.getId())
                .orElseThrow(() -> new IllegalArgumentException("Rezervace nebyla nalezena."));

        if (updated.getService() != null && updated.getService().getId() != null) {
            Service service = serviceRepository.findById(updated.getService().getId())
                    .orElseThrow(() -> new IllegalArgumentException("Vybraná služba neexistuje."));
            target.setService(service);
        }

        LocalDate newDate = updated.getReservationDate() != null ? updated.getReservationDate() : target.getReservationDate();
        LocalTime newTime = updated.getReservationTime() != null ? updated.getReservationTime() : target.getReservationTime();

        LocalDateTime dt = newDate.atTime(newTime);
        if (dt.isBefore(LocalDateTime.now())) {
            throw new IllegalArgumentException("Zadali jste neplatné datum.");
        }

        boolean exists = reservationRepository.existsByReservationDateAndReservationTimeAndIdNot(newDate, newTime, target.getId());
        if (exists) {
            throw new IllegalArgumentException("Termín je již obsazený.");
        }

        if (updated.getReservationDate() != null) target.setReservationDate(updated.getReservationDate());
        if (updated.getReservationTime() != null) target.setReservationTime(updated.getReservationTime());
        if (updated.getCustomerName() != null) target.setCustomerName(updated.getCustomerName());
        if (updated.getCustomerPhone() != null) target.setCustomerPhone(updated.getCustomerPhone());
        target.setProblemDescription(updated.getProblemDescription());

        return reservationRepository.save(target);
    }


}
