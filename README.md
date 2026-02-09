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
Heslo pro přihlášení admina: admin123
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

# Ukázky obrazovek

## Rezervace
<img width="1901" height="1248" alt="Rezervace" src="https://github.com/user-attachments/assets/7b802304-8571-41b1-8fb9-32664dbf8b67" />

## Rezervace - záloha dat
<img width="1903" height="1247" alt="Rezervace - záloha dat" src="https://github.com/user-attachments/assets/43368cba-a858-4f2a-b5b1-5f8d01317320" />

## Rezervace - výměna disku
<img width="1891" height="1319" alt="Rezervace - výměna disku" src="https://github.com/user-attachments/assets/1d4ec680-a70b-46ad-b416-0ef71cb7dd65" />

## Rezervace - výběr služby
<img width="1902" height="1219" alt="Rezervace - výběr služby" src="https://github.com/user-attachments/assets/d8c18b2e-6c36-4b16-960f-23e7667dab1a" />

## Rezervace - Q&A
<img width="1900" height="1440" alt="Rezervace - Q A" src="https://github.com/user-attachments/assets/b160b503-2fe9-406c-95b2-f370d34e26be" />

## Rezervace - odvirování
<img width="1877" height="1390" alt="Rezervace - odvirování" src="https://github.com/user-attachments/assets/6697eac0-8b3b-43f9-b397-7d80a047522a" />

## Rezervace - karta
<img width="1887" height="1566" alt="Rezervace - karta" src="https://github.com/user-attachments/assets/af25062c-3621-41cf-97ab-a9dcd5fa7374" />

## Rezervace - instalace Windows
<img width="1899" height="1261" alt="Rezervace - instalace Windows" src="https://github.com/user-attachments/assets/7111092f-0ca7-409c-babc-d3c220a8477c" />

## O nás
<img width="1905" height="1172" alt="O nás" src="https://github.com/user-attachments/assets/9a010924-3446-4d0e-b0c7-61bd81db7eca" />

## Kontakt
<img width="1900" height="975" alt="Kontakt" src="https://github.com/user-attachments/assets/295d3df6-788a-4bfd-9c9e-67d5651bf48a" />

## Ceník
<img width="1887" height="1010" alt="Ceník" src="https://github.com/user-attachments/assets/f3b4c80e-d575-4c09-8dee-9f909115cb46" />

## ADMIN - validační chybová zpráva
<img width="1906" height="689" alt="ADMIN - validační chybová zpráva " src="https://github.com/user-attachments/assets/a69fe540-3a84-4456-b936-4869f17a8a3a" />

## ADMIN - úprava rezervace
<img width="1902" height="1073" alt="ADMIN - úprava rezervace " src="https://github.com/user-attachments/assets/7f6a6faf-2437-4d2e-a1ce-8d452c035d6a" />

## ADMIN - smazání rezervace
<img width="1908" height="1160" alt="ADMIN - smazání rezervace" src="https://github.com/user-attachments/assets/e1b1d8d2-e3fe-4efa-8ed1-3e1880eeeb10" />

## ADMIN - rezervace
<img width="1902" height="670" alt="ADMIN - rezervace" src="https://github.com/user-attachments/assets/2f91c739-e385-4f76-a9f6-4dea5f9c91cd" />

## ADMIN - přihlášení
<img width="1907" height="724" alt="ADMIN - přihlášení" src="https://github.com/user-attachments/assets/a2334e9a-0aee-42c9-8992-aab7501a95d6" />

# Další rozvoj:
- Lepší validace a zpracování chyb
- Stránkování, řazení a filtrování dat
- Testování aplikace, doplnění unit a integračních testů pro zvýšení stability a kvality kódu
