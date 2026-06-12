package cz.dominik.reservation.controller;

import cz.dominik.reservation.entity.Service;
import cz.dominik.reservation.repository.ServiceRepository;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * REST API controller pro seznam nabízených služeb.
 *
 * Poskytuje jednoduchý JSON endpoint, ze kterého si frontend (Vite aplikace)
 * načítá dostupné servisní služby pro formulář a texty na stránce.
 */
@RestController
@RequestMapping("/api/services")
@CrossOrigin(origins = "http://localhost:5173")
public class ServiceApiController {

    private final ServiceRepository serviceRepository;

    public ServiceApiController(ServiceRepository serviceRepository) {
        this.serviceRepository = serviceRepository;
    }

    /**
     * Vrátí seznam všech služeb uložených v databázi.
     *
     * Používá se:
     * - při načtení formuláře rezervace
     * - pro zobrazení ceníku / popisu služeb na frontendu
     *
     * @return seznam všech služeb
     */
    @GetMapping
    public List<Service> getAll() {
        return serviceRepository.findAll();
    }
}