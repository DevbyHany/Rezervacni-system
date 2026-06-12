package cz.dominik.reservation.entity;

import jakarta.persistence.*;

import java.time.LocalDate;
import java.time.LocalTime;

import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;

/**
 * Databázová entita pro rezervaci servisního zásahu.
 *
 * Ukládá:
 * - údaje o zákazníkovi
 * - zvolenou službu
 * - datum a čas rezervace
 * - případný popis problému
 */
@Entity
public class Reservation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String customerName;
    private String customerPhone;
    private LocalDate reservationDate;
    private LocalTime reservationTime;
    private String problemDescription;

    @ManyToOne
    private Service service;

    public Service getService() {
        return service;
    }

    public void setService(Service service) {
        this.service = service;
    }


    public Reservation(String customerName, String customerPhone, LocalDate reservationDate,LocalTime reservationTime, String problemDescription, Service service) {
        this.customerName = customerName;
        this.customerPhone = customerPhone;
        this.reservationDate = reservationDate;
        this.reservationTime = reservationTime;
        this.problemDescription = problemDescription;
        this.service = service;
    }

    public Reservation() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCustomerName() {
        return customerName;
    }

    public void setCustomerName(String customerName) {
        this.customerName = customerName;
    }

    public String getCustomerPhone() {
        return customerPhone;
    }

    public void setCustomerPhone(String customerPhone) {
        this.customerPhone = customerPhone;
    }

    public LocalDate getReservationDate() {
        return reservationDate;
    }

    public void setReservationDate(LocalDate reservationDate) {
        this.reservationDate = reservationDate;
    }

    public LocalTime getReservationTime() { return reservationTime; }

    public void setReservationTime(LocalTime reservationTime) { this.reservationTime = reservationTime; }

    public String getProblemDescription() {
        return problemDescription;
    }

    public void setProblemDescription(String problemDescription) {
        this.problemDescription = problemDescription;
    }

}
