package cz.dominik.reservation;

import cz.dominik.reservation.entity.Service;
import cz.dominik.reservation.repository.ServiceRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class ReservationApplication {
    public static void main(String[] args) {
        SpringApplication.run(ReservationApplication.class, args);
    }
    @Bean
    CommandLineRunner seedServices(ServiceRepository repo) {
        return args -> {
            if (repo.count() == 0) {
                repo.save(new Service("Diagnostika PC / NTB", 300, 600, 30, "SUPPORT"));
                repo.save(new Service("Instalace Windows + nastavení", 800, 1500, 90, "SOFTWARE"));
                repo.save(new Service("Odvirování a vyčištění systému", 700, 1400, 60, "SOFTWARE"));
                repo.save(new Service("Výměna disku / RAM (práce)", 400, 800, 45, "HARDWARE"));
                repo.save(new Service("Záloha dat", 500, 1200, 60, "DATA"));
            }
        };
    }
}
