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
   1. Klikni na zelené tlačítko CODE zde na githubu
   2. Zvol Download ZIP
   3. Stažený ZIP rozbal například do složky 'Rezervacni system'
   4. Otevři IntelliJ IDEA
   5. Zvol File -> Open a zvol složku 'backend'
   6. Najdi třídu ReservationApplication a spusť aplikaci
   
## Spuštění frontendu (Vite)
   1. Otevři terminál ve složce 'frontend'
   2. Zadej 'npm install'
   3. Poté 'npm run dev'
   4. Do prohlížeče zadej 'http://localhost:5173' a užij si aplikaci :)
