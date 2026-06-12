package cz.dominik.reservation.controller;

import cz.dominik.reservation.entity.Reservation;
import cz.dominik.reservation.service.ReservationService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;
import org.springframework.web.bind.annotation.PathVariable;

/**
 * MVC controller pro zobrazení stránky s rezervacemi.
 *
 * Slouží k:
 * - zobrazení přehledu rezervací v HTML šabloně
 * - předání dat do pohledu (Thymeleaf)
 *
 * Tento controller NEPOSKYTUJE REST API – pouze vrací HTML stránky.
 */
@RequestMapping("/reservations")
@Controller
public class ReservationController {

    private final ReservationService reservationService;

    ReservationController(ReservationService reservationService) {
        this.reservationService = reservationService;
    }

    /**
     * Zobrazí seznam všech rezervací.
     *
     * Používá se pro:
     * - přehled rezervací
     * - admin správu
     */
    @GetMapping
    public String list(Model model) {
        model.addAttribute("reservations", reservationService.getAllReservations());
        return "reservations";
    }

    /**
     * Zobrazí formulář pro vytvoření nové rezervace.
     */
    @GetMapping("/create")
    public String create(Model model) {
        model.addAttribute("reservation", new Reservation());
        return "reservation-create";
    }

    /**
     * Zpracuje odeslaný formulář pro vytvoření rezervace.
     *
     * - při úspěchu uloží rezervaci a přesměruje na přehled
     * - při chybě vrátí uživatele zpět na formulář
     */
    @PostMapping("/create")
    public String create(@ModelAttribute("reservation") Reservation reservation, RedirectAttributes ra) {
        try {
            reservationService.createReservation(reservation);
            ra.addFlashAttribute("success", "Rezervace byla vytvořena");
            return "redirect:/reservations";
        } catch (IllegalArgumentException e) {
            ra.addFlashAttribute("error", e.getMessage());
            return "redirect:/reservations/create";
        }
    }

    /**
     * Smaže rezervaci podle ID.
     *
     * - volá se z admin přehledu
     */
    @PostMapping("/delete/{id}")
    public String delete(@PathVariable Long id, RedirectAttributes ra) {
        reservationService.deleteReservation(id);
        ra.addFlashAttribute("success", "Rezervace byla smazána");
        return "redirect:/reservations";
    }

    /**
     * Zobrazí formulář pro editaci rezervace.
     *
     * - pokud rezervace neexistuje, přesměruje zpět na přehled
     */
    @GetMapping("/edit/{id}")
    public String edit(@PathVariable Long id, Model model) {
        Reservation reservation = reservationService.getById(id);
        model.addAttribute("reservation", reservation);
        if (reservation == null) {
            return "redirect:/reservations";
        }
        return "reservation-edit";
    }

    /**
     * Zpracuje odeslaný formulář pro editaci rezervace.
     *
     * - při chybě znovu zobrazí formulář s chybovou hláškou
     */
    @PostMapping("/edit")
    public String edit(@ModelAttribute Reservation reservation, RedirectAttributes ra) {
        try {
            reservationService.updateReservation(reservation);
            ra.addFlashAttribute("success", "Rezervace byla upravena");
            return "redirect:/reservations";
        } catch (IllegalArgumentException e) {
            ra.addFlashAttribute("error", e.getMessage());
            return "redirect:/reservations/edit/" + reservation.getId();
        }
    }

}

