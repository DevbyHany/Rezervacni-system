package cz.dominik.reservation.entity;

import jakarta.persistence.*;

@Entity
public class Service {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    public Service() {}

    private String name;
    private int priceFrom;
    private int priceTo;
    private int durationMinutes;
    private String category;


    public Service(String name, int priceFrom, int priceTo, int durationMinutes, String category) {
        this.name = name;
        this.priceFrom = priceFrom;
        this.priceTo = priceTo;
        this.durationMinutes = durationMinutes;
        this.category = category;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getPriceFrom() {
        return priceFrom;
    }

    public void setPriceFrom(int priceFrom) {
        this.priceFrom = priceFrom;
    }

    public int getPriceTo() {
        return priceTo;
    }

    public void setPriceTo(int priceTo) {
        this.priceTo = priceTo;
    }

    public int getDurationMinutes() {
        return durationMinutes;
    }

    public void setDurationMinutes(int durationMinutes) {
        this.durationMinutes = durationMinutes;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }
}
