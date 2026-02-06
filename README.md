# PC Servis – Rezervační systém (Spring Boot + Vite)

Jednoduchá webová aplikace pro správu rezervací servisních služeb (PC servis).  
Projekt umožňuje zákazníkům vytvořit rezervaci a administrátorovi je přehledně spravovat.  

Aplikace slouží jako demonstrační projekt pro práci s:
- REST API
- frontendem odděleným od backendu
- validací formulářů
- administračním rozhraním

---

# Funkce:

## Zákaznická část
- Vytvoření nové rezervace (jméno, kontakt, služba, datum, čas, poznámka)
- Přehled vybrané služby a orientační informace
- Potvrzovací karta po odeslání rezervace
- Možnost upravit poslední rezervaci

## Admin část
- Jednoduchý admin režim (demo přihlášení)
- Výpis všech rezervací v tabulce
- Smazání rezervace (s potvrzením v modalu)
- Načítání dat přes REST API
- Úprava rezervace

## Backend
- REST API pro práci se službami a rezervacemi
- Validace vstupních dat
- Chybové odpovědi a jednotné zpracování výjimek
- H2 databáze pro jednoduchý běh projektu

---

# Spuštění projektu

## Předpoklady:
- Java 17+  
- Maven  
- Node.js + npm  

## Spuštění backendu
   1.Otevři terminál ve složce `backend`
   2.zadej 'cd backend'
   3. ./mvnw spring-boot:run
   4.Backend poběží na adrese http://localhost:8080
   
## Spuštění frontendu (Vite)
   1.Otevři terminál ve složce 'frontend'
   2.Zadej 'cd frontend'
   3.Zadej 'npm install'
   4.Zadej 'npm run dev'
   5.Frontend poběží na adrese http://localhost:5173
