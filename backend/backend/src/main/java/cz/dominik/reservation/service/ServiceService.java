package cz.dominik.reservation.service;


import cz.dominik.reservation.entity.Service;

import java.util.ArrayList;
import java.util.List;

/**
 * Servisní třída pro práci se servisními službami.
 */
@org.springframework.stereotype.Service
public class ServiceService {

    public List<Service> getAllServices() {
        List<Service> services = new ArrayList<>();

        services.add(new Service("Diagnostika PC / NTB", 300, 600, 30, "SUPPORT"));
        services.add(new Service("Instalace Windows + nastavení", 800, 1500, 90, "SOFTWARE"));
        services.add(new Service("Odvirování a vyčištění systému", 700, 1400, 60, "SOFTWARE"));
        services.add(new Service("Výměna disku / RAM (práce)", 400, 800, 45, "HARDWARE"));
        services.add(new Service("Záloha dat", 500, 1200, 60, "DATA"));

        return services;
    }

}
