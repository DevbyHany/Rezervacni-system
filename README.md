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

