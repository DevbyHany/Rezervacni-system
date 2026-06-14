# Rezervační systém – Booking System (Spring Boot + Vite)

Fullstack webová aplikace pro správu rezervací servisních zásahů.
Zákazníci si mohou rezervovat termín, administrátor spravuje rezervace a služby.

# 🌐 **Live ukázka:** 
[extraordinary-playfulness-production-10c2.up.railway.app](https://extraordinary-playfulness-production-10c2.up.railway.app/)

Přihlašovací heslo admina: admin123

---

## Screenshoty

### Rezervace
![Rezervace](backend/docs/images/Rezervace.png)

### Výběr služby
![Výběr služby](backend/docs/images/Rezervace%20-%20výběr%20služby.png)

### Rezervační karta
![Karta](backend/docs/images/Rezervace%20-%20karta.png)

### Admin – přihlášení
![Admin přihlášení](backend/docs/images/ADMIN%20-%20přihlášení.png)

### Admin – správa rezervací
![Admin rezervace](backend/docs/images/ADMIN%20-%20rezervace.png)

### Ceník
![Ceník](backend/docs/images/Ceník.png)

---

## Funkce

### Zákazník
- Výběr služby
- Rezervace termínu s validací (nelze rezervovat minulost, obsazený termín)
- Vyplnění kontaktních údajů a popisu problému

### Administrátor
- Přehled všech rezervací
- Úprava a mazání rezervací
- Správa služeb

### Backend
- REST API s vrstvenou architekturou
- Validace vstupních dat
- Globální zpracování výjimek
- Kontrola duplicitních termínů
- H2 databáze

---

## Použité technologie

**Backend:** Java, Spring Boot, Spring Data JPA, Hibernate, H2, Maven  
**Frontend:** JavaScript, Vite, CSS

---

## Manuální spuštění projektu

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

Projekt obsahuje unit testy pro servisní vrstvu (`ReservationServiceTest`)
- Vytvoření rezervace
- Validace chybějícího data/času
- Zamítnutí rezervace v minulosti
- Zamítnutí obsazeného termínu
- Smazání neexistující rezervace
- Úspěšné smazání rezervace

