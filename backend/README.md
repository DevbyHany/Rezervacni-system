# Rezervační systém – Booking System (Spring Boot + Vite)

Fullstack webová aplikace pro správu rezervací servisních zásahů.
Zákazníci si mohou rezervovat termín, administrátor spravuje rezervace a služby.

---

## Funkce

### Zákazník
- Výběr služby z ceníku
- Rezervace termínu s validací (nelze rezervovat minulost, obsazený termín)
- Vyplnění kontaktních údajů a popisu problému

### Administrátor
- Přehled všech rezervací
- Úprava a mazání rezervací
- Správa nabízených služeb

### Backend
- REST API s vrstvená architekturou
- Validace vstupních dat
- Globální zpracování výjimek
- Kontrola duplicitních termínů
- H2 in-memory databáze


## Ukázky obrazovek

### Rezervace – výběr služby
![Výběr služby](backend/docs/images/Rezervace%20-%20výběr%20služby.png)

### Rezervace – karta
![Rezervace karta](backend/docs/images/Rezervace%20-%20karta.png)

### Rezervace – hlavní stránka
![Rezervace](backend/docs/images/Rezervace.png)

### Rezervace – instalace Windows
![Instalace Windows](backend/docs/images/Rezervace%20-%20instalace%20Windows.png)

### Rezervace – výměna disku
![Výměna disku](backend/docs/images/Rezervace%20-%20výměna%20disku.png)

### Rezervace – odvirování
![Odvirování](backend/docs/images/Rezervace%20-%20odvirování.png)

### Rezervace – záloha dat
![Záloha dat](backend/docs/images/Rezervace%20-%20záloha%20dat.png)

### Rezervace – Q&A
![Q&A](backend/docs/images/Rezervace%20-%20Q&A.png)

### Ceník
![Ceník](backend/docs/images/Ceník.png)

### O nás
![O nás](backend/docs/images/O%20nás.png)

### Kontakt
![Kontakt](backend/docs/images/Kontakt.png)

### Admin – přihlášení
![Admin přihlášení](backend/docs/images/ADMIN%20-%20přihlášení.png)

### Admin – přehled rezervací
![Admin rezervace](backend/docs/images/ADMIN%20-%20rezervace.png)

### Admin – úprava rezervace
![Admin úprava](backend/docs/images/ADMIN%20-%20úprava%20rezervace%20.png)

### Admin – smazání rezervace
![Admin smazání](backend/docs/images/ADMIN%20-%20smazání%20rezervace.png)

### Admin – validační chybová zpráva
![Admin validace](backend/docs/images/ADMIN%20-%20validační%20chybová%20zpráva%20.png)

---

## Použité technologie

**Backend:** Java, Spring Boot, Spring Data JPA, Hibernate, H2, Maven

**Frontend:** JavaScript, Vite, CSS

---

## Spuštění projektu

### Backend
1. Otevři složku `backend` v IntelliJ IDEA
2. Spusť třídu `ReservationApplication`
3. Backend běží na `http://localhost:8080`

### Frontend
1. Otevři terminál ve složce `frontend`
2. Zadej `npm install`
3. Zadej `npm run dev`
4. Aplikace běží na `http://localhost:5173`

---

## Testy

Projekt obsahuje unit testy pro servisní vrstvu (`ReservationServiceTest`).

Spuštění testů:
```
.\mvnw test
```

Testované scénáře:
- Vytvoření rezervace
- Validace chybějícího data/času
- Zamítnutí rezervace v minulosti
- Zamítnutí obsazeného termínu
- Smazání neexistující rezervace
- Úspěšné smazání rezervace
