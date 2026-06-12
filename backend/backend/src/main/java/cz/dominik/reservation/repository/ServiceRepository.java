package cz.dominik.reservation.repository;

import cz.dominik.reservation.entity.Service;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ServiceRepository extends JpaRepository<Service, Long> {
}
