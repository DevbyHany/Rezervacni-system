package cz.dominik.reservation.repository;

import cz.dominik.reservation.entity.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.time.LocalTime;

public interface ReservationRepository extends JpaRepository<Reservation, Long> {
    boolean existsByReservationDateAndReservationTime(LocalDate reservationDate, LocalTime reservationTime);

    boolean existsByReservationDateAndReservationTimeAndIdNot(LocalDate reservationDate, LocalTime reservationTime, Long id);
}
