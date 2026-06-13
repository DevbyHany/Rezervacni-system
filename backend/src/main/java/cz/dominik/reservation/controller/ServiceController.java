package cz.dominik.reservation.controller;

import cz.dominik.reservation.service.ServiceService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

/**
 * MVC controller pro zobrazení stránky se službami (ceník).
 *
 * Zodpovídá za:
 * - načtení seznamu služeb z databáze
 * - předání dat do HTML šablony
 *
 * Tento controller NEVRACÍ JSON, ale klasickou HTML stránku.
 */
@Controller
public class ServiceController {

    private final ServiceService serviceService;

    public ServiceController(ServiceService serviceService) {
        this.serviceService = serviceService;
    }

    /**
     * Zobrazí stránku se seznamem nabízených služeb.
     *
     * - načte všechny služby z databáze
     * - předá je do modelu pro zobrazení v šabloně
     *
     * @param model model pro předání dat do HTML šablony
     * @return název šablony "services"
     */
    @GetMapping("/services")
    public String services(Model model) {
        model.addAttribute("services", serviceService.getAllServices());
        return "services";
    }

}
