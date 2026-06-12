package cz.dominik.reservation.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

/**
 * Controller pro obsluhu kořenové URL ("/").
 *
 * Vrací úvodní šablonu aplikace (index), do které se následně
 * načte frontend (Vite) s rezervačním systémem.
 */
@Controller
public class HomeController {

    /**
     * Zobrazí domovskou stránku aplikace.
     *
     * @param model model pro případné budoucí předání dat do šablony
     * @return název šablony "index"
     */
    @GetMapping("/")
    public String home(Model model) {
        return "index";
    }
}
