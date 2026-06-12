package cz.dominik.reservation;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

/**
 * Handler výjimek pro REST API.
 *
 * Zajišťuje mapování výjimek na HTTP odpovědi
 * a vrací čitelné chybové zprávy pro frontend.
 */
@RestControllerAdvice
public class ApiExceptionHandler {

    /**
     * Zpracuje případ, když rezervace nebyla nalezena.
     */
    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<String> handleIllegalArgument(IllegalArgumentException ex) {
        return ResponseEntity
                .badRequest()
                .body(ex.getMessage());
    }
}
