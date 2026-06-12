package cz.dominik.reservation.service;

import cz.dominik.reservation.entity.Reservation;
import cz.dominik.reservation.entity.Service;
import cz.dominik.reservation.repository.ReservationRepository;
import cz.dominik.reservation.repository.ServiceRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class ReservationServiceTest {

    @Mock
    private ReservationRepository reservationRepository;

    @Mock
    private ServiceRepository serviceRepository;

    @InjectMocks
    private ReservationService reservationService;

    private Reservation validReservation;
    private Service service;

    @BeforeEach
    void setUp() {
        service = new Service();
        service.setId(1L);

        validReservation = new Reservation();
        validReservation.setReservationDate(LocalDate.now().plusDays(1));
        validReservation.setReservationTime(LocalTime.of(10, 0));
        validReservation.setCustomerName("Jan Novák");
        validReservation.setService(service);
    }

    @Test
    void createReservation_shouldSaveAndReturn() {
        when(reservationRepository.existsByReservationDateAndReservationTime(any(), any())).thenReturn(false);
        when(serviceRepository.findById(1L)).thenReturn(Optional.of(service));
        when(reservationRepository.save(any(Reservation.class))).thenReturn(validReservation);

        Reservation result = reservationService.createReservation(validReservation);

        assertNotNull(result);
        verify(reservationRepository, times(1)).save(any(Reservation.class));
    }

    @Test
    void createReservation_whenDateIsNull_shouldThrowException() {
        validReservation.setReservationDate(null);

        assertThrows(IllegalArgumentException.class, () -> {
            reservationService.createReservation(validReservation);
        });
    }

    @Test
    void createReservation_whenTimeIsNull_shouldThrowException() {
        validReservation.setReservationTime(null);

        assertThrows(IllegalArgumentException.class, () -> {
            reservationService.createReservation(validReservation);
        });
    }

    @Test
    void createReservation_whenDateInPast_shouldThrowException() {
        validReservation.setReservationDate(LocalDate.now().minusDays(1));

        assertThrows(IllegalArgumentException.class, () -> {
            reservationService.createReservation(validReservation);
        });
    }

    @Test
    void createReservation_whenSlotTaken_shouldThrowException() {
        when(reservationRepository.existsByReservationDateAndReservationTime(any(), any())).thenReturn(true);

        assertThrows(IllegalArgumentException.class, () -> {
            reservationService.createReservation(validReservation);
        });
    }

    @Test
    void deleteReservation_whenNotFound_shouldThrowException() {
        when(reservationRepository.existsById(99L)).thenReturn(false);

        assertThrows(IllegalArgumentException.class, () -> {
            reservationService.deleteReservation(99L);
        });
    }

    @Test
    void deleteReservation_shouldCallDeleteById() {
        when(reservationRepository.existsById(1L)).thenReturn(true);

        reservationService.deleteReservation(1L);

        verify(reservationRepository, times(1)).deleteById(1L);
    }
}