import './style.css'

const API_BASE = 'http://localhost:8080/api'

/**
 * Hlavní frontend logika PC Servis rezervačního systému.
 * - vykreslení layoutu aplikace
 * - přepínání stránek (Rezervace, Ceník, O nás, Kontakt, Admin)
 * - komunikace s backend REST API
 * - správa stavu (admin, editace, potvrzení)
 */






//                                 ---- LAYOUT STRÁNKY ----

document.querySelector('#app').innerHTML = `
<div class="page">
  <header class="topbar">
    <div class="brand">PC Servis</div>
    <div class="topRight">
      Nonstop linka: <strong>+420 604 75 76 77</strong>
    </div>
  </header>

  <nav class="topNav">
    <button data-page="pricing">Ceník</button>
    <button data-page="book">Rezervace</button>
    <button data-page="about">O nás</button>
    <button data-page="contact">Kontakt</button>
    <button data-page="admin" id="adminNav" style="display:none">Admin</button>
  </nav>

  <main class="grid">
    <section class="left">
      <h1 id="pageTitle">Vyberte službu</h1>
      <p id="pageLead" class="lead">Zvolte službu vpravo – informace a FAQ se přepnou podle výběru.</p>

      <div class="cards">
        <article class="card">
          <h2 id="howTitle">Jak to probíhá</h2>
          <ol id="howList"></ol>
        </article>

        <article class="card" id="includesBlock">
          <h2 id="includesTitle">Co služba zahrnuje</h2>
          <ul id="includesList"></ul>
        </article>

        <article class="card">
          <h2>Ochrana dat</h2>
          <p id="dataText" class="muted"></p>
        </article>
      </div>

      <section class="faq">
        <h2>Nejčastější dotazy</h2>
        <div id="faqBox" class="faqBox"></div>
      </section>
    </section>

    <aside class="right" id="bookingPanel">
      <div class="stickyCard">
        <h2>Objednat servis</h2>

        <form id="createForm" class="form">
          <label>Jméno</label>
          <input id="name" placeholder="Jméno" required />

          <label>Telefon</label>
          <input id="phone" placeholder="+420..." required />

          <label>Služba</label>
          <select id="service" required>
            <option value="">Vyber službu</option>
          </select>
          <small id="serviceMeta" class="muted"></small>

          <div class="row2">
            <div>
              <label>Datum</label>
              <input id="date" type="date" required />
            </div>
            <div>
              <label>Čas</label>
              <input id="time" type="time" required />
            </div>
          </div>

          <label>Popis problému</label>
          <input id="desc" placeholder="Např. vyskakují okna, PC je pomalé…" />

          <p id="message" class="msg"></p>

          <div class="btnRow">
            <button id="submitBtn" type="submit">Objednat</button>
            <button id="cancelBtn" type="button" style="display:none;" class="ghost">Zrušit</button>
          </div>
        </form>



        <div id="confirmCard" class="confirmCard hidden">
          <h3>Rezervace přijata</h3>
          <ul class="confirmList">
            <li><strong>Služba:</strong> <span id="cService"></span></li>
            <li><strong>Datum:</strong> <span id="cDate"></span></li>
            <li><strong>Čas:</strong> <span id="cTime"></span></li>
            <li><strong>Jméno:</strong> <span id="cName"></span></li>
            <li><strong>Telefon:</strong> <span id="cPhone"></span></li>
            <li><strong>Cena:</strong> <span id="cPrice"></span></li>
          </ul>

          <div class="confirmActions">
            <button id="newReservation" type="button">Nová rezervace</button>
            <button id="editLast" type="button" class="ghost">Upravit poslední</button>
          </div>
        </div>
      </div>
    </aside>
  </main>

  <section id="page-admin" style="display:none; border:1px solid #444; padding:16px; margin-top:20px;">
    <h2>Admin</h2>
    <div id="adminLoginBox">
      <label>Heslo</label>
      <input id="adminPass" type="password" placeholder="Zadej admin heslo" />
      <button id="adminLogin" type="button">Přihlásit</button>
      <p id="adminError" class="error hidden"></p>
    </div>

    <div id="adminLogoutBox" style="display:none;">
      <p class="muted">Jsi přihlášen jako admin.</p>
      <button id="adminLogout" type="button" class="ghost">Odhlásit</button>
    </div>
  </section>

  <div id="bottomPanel" class="bottomPanel">
    <div class="bottomHeader">
      <strong>Rezervace</strong>
      <button id="testApiBottom" type="button" class="ghost">Načíst rezervace</button>
    </div>
    <pre id="output" class="tableBox"></pre>
  </div>

   <!-- MODAL – potvrzení smazání -->
   <div id="deleteModal" class="modalOverlay">
     <div class="modalCard">
       <h3>Smazat rezervaci</h3>
       <p id="deleteModalText">Opravdu si přeješ smazat tuto rezervaci?</p>
       <div class="modalActions">
         <button id="deleteConfirmBtn" type="button" class="danger">
           Ano, smazat
         </button>
         <button id="deleteCancelBtn" type="button" class="ghost">
           Zrušit
         </button>
       </div>
     </div>
   </div>
</div>
`








//                           ---- TEXTOVÝ OBSAH PRO LEVÝ PANEL ----

const contentByKey = {
  MALWARE: {
    title: 'Odvirování a vyčištění systému',
    lead: 'Odstraníme malware, vyčistíme systém a nastavíme základní zabezpečení zařízení.',
    how: [
      'Diagnostika a posouzení stavu',
      'Odstranění malwaru / čištění systému',
      'Předání zařízení a doporučení zabezpečení'
    ],
    includes: [
      'Kontrola běžných typů škodlivého softwaru',
      'Vyčištění prohlížečů a systémových nastavení',
      'Doporučení antiviru a základní ochrany'
    ],
    data: 'Data považujeme za důvěrná a po dokončení zakázky nic nezálohujeme bez domluvy.',
    faq: [
      { q: 'Zachováte mi data?', a: 'Ano. Pokud by byla nutná reinstalace, domluvíme se předem na záloze a postupu.' },
      { q: 'Jak dlouho to trvá?', a: 'Obvykle 60–90 minut podle stavu zařízení.' },
      { q: 'Co když nejde malware odstranit?', a: 'Navrhneme bezpečný postup (záloha + reinstalace) a řekneme dopady předem.' }
    ]
  },
  WINDOWS: {
    title: 'Instalace Windows a nastavení systému',
    lead: 'Provedeme čistou instalaci Windows, aktualizace a základní nastavení včetně ovladačů.',
    how: [
      'Záloha dat (pokud je potřeba)',
      'Čistá instalace Windows',
      'Instalace ovladačů a aktualizací'
    ],
    includes: [
      'Instalace Windows',
      'Základní programy',
      'Aktualizace systému'
    ],
    data: 'Před instalací se vždy domlouváme na záloze dat.',
    faq: [
      { q: 'Přijdu o data?', a: 'Jen pokud se nedomluvíme na záloze. Vždy to řešíme dopředu.' },
      { q: 'Jak dlouho trvá instalace?', a: 'Obvykle 60–120 minut (podle rychlosti disku a aktualizací).' }
    ]
  },
  HARDWARE: {
    title: 'Výměna disku / RAM (práce)',
    lead: 'Vyměníme disk nebo RAM, zrychlíme PC a nastavíme vše tak, aby to běželo stabilně.',
    how: [
      'Kontrola kompatibility',
      'Výměna komponenty',
      'Test stability a výkonu'
    ],
    includes: [
      'Montáž a test',
      'Základní diagnostika',
      'Doporučení pro další zrychlení'
    ],
    data: 'Pokud je potřeba kopírování dat, řešíme to předem a transparentně.',
    faq: [
      { q: 'Zrychlí se PC po výměně disku?', a: 'Ve většině případů výrazně. SSD je největší upgrade pro starší PC.' },
      { q: 'Potřebuju přeinstalovat Windows?', a: 'Ne vždy. Umíme klonovat disk nebo udělat čistou instalaci dle domluvy.' },
      { q: 'Jak dlouho trvá výměna?', a: 'Typicky 30–60 minut + případné kopírování dat.' }
    ]
  },
  DATA: {
    title: 'Záloha dat',
    lead: 'Zálohujeme data bezpečně – fotky, dokumenty, pracovní soubory. Po domluvě i migrace na nový disk.',
    how: [
      'Kontrola rozsahu dat',
      'Záloha na domluvené médium',
      'Ověření a předání'
    ],
    includes: [
      'Záloha dokumentů a fotek',
      'Ověření čitelnosti zálohy',
      'Doporučení prevence (cloud / externí disk)'
    ],
    data: 'S daty pracujeme citlivě. Bez souhlasu nic neotevíráme mimo nezbytné minimum.',
    faq: [
      { q: 'Kolik dat zvládnete zálohovat?', a: 'Podle kapacity média. Domluvíme se dopředu.' },
      { q: 'Jak dlouho to trvá?', a: 'Záleží na objemu dat a rychlosti disku – typicky 30–180 minut.' }
    ]
  },
  SUPPORT: {
    title: 'Diagnostika a rychlá pomoc',
    lead: 'Nejsi si jistý, co je špatně? Uděláme diagnostiku, navrhneme řešení a řekneme cenu i čas předem.',
    how: [
      'Rychlá kontrola problému',
      'Návrh řešení a cenový odhad',
      'Realizace po odsouhlasení'
    ],
    includes: [
      'Základní diagnostika',
      'Doporučení řešení',
      'Konzultace k dalším krokům'
    ],
    data: 'Data bereme jako citlivá. Bez domluvy nic nekopírujeme ani nezálohujeme.',
    faq: [
      { q: 'Kolik stojí diagnostika?', a: 'Záleží na rozsahu, obvykle v rozmezí uvedeném u služby.' },
      { q: 'Jak dlouho trvá diagnostika?', a: 'Většinou 20–40 minut.' }
    ]
  }
}

const staticPages = {
  pricing: {
    title: 'Ceník služeb',
    lead: 'Níže najdeš orientační ceny jednotlivých úkonů. Přesnou cenu vždy řekneme předem podle konkrétního problému.',
    how: [
      'Cena se odvíjí od typu problému a náročnosti řešení.',
      'Před zahájením opravy vždy sdělíme orientační cenu.',
      'Pokud se během opravy objeví další komplikace, vše s vámi řešíme předem.',
      'Nikdy neprovádíme opravy bez souhlasu zákazníka.'
    ],
    includes: [
      'Diagnostika základního problému od 300 Kč',
      'Odvirování a čištění systému 600–1200 Kč',
      'Instalace Windows včetně ovladačů 800–1500 Kč',
      'Výměna disku / RAM (práce) 400–800 Kč'
    ],
    data: 'Konečnou cenu vždy potvrdíme předem. Nic neopravujeme „za zády“ bez schválení.',
    faq: [
      { q: 'Je diagnostika placená vždy?', a: 'Pokud si necháš zařízení opravit u nás, často diagnostiku započítáme do ceny opravy.' },
      { q: 'Jsou ceny pevné?', a: 'Ne, jsou orientační. Vždy záleží na náročnosti a náhradních dílech.' }
    ]
  },
  about: {
    title: 'O PC servisu',
    lead: 'Jsme malý, ale poctivý servis se zaměřením na osobní přístup. Žádné korporátní call centrum, ale konkrétní člověk na telefonu.',
    how: [
      'PC servis vznikl jako malý lokální projekt se zaměřením na pomoc lidem,',
      'kteří se nechtějí ztrácet v technických pojmech a složitých řešeních.',

      'Začínali jsme s opravami počítačů pro známé a rodinu, postupně se servis',
      'rozšířil i na další zákazníky v okolí. Cílem vždy bylo jedno –',
      'vysvětlit problém srozumitelně a nabídnout férové řešení.'

    ],
    includes: [
      'Opravy stolních PC a notebooků',
      'Poradenství při výběru nového zařízení',
      'Převod dat ze starého počítače'
    ],
    data: 'K technice přistupujeme tak, jako by byla naše vlastní. Data bereme jako to nejcennější, co v PC je.',
    faq: [
      { q: 'Kde sídlíte?', a: 'Turnov Antonína Dvořáka 335 511 01.' },
      { q: 'Jak funguje objednání?', a: 'Nejlépe přes tento formulář, případně telefonicky.' }
    ]
  },
  contact: {
    title: 'Kontakt',
    lead: 'Potřebuješ poradit nebo si nejsi jistý, co vybrat? Ozvi se, domluvíme konkrétní postup.',
    how: [
      'Telefon: +420 604 75 76 77 (nonstop linka)',
      'E-mail: PCservis@email.cz',
      'Adresa servisu: Turnov Antonína Dvořáka 335 511 01'
    ],
    includes: [
      'Možnost domluvy mimo běžnou pracovní dobu',
      'Jednoduché vysvětlení stavu bez zbytečného „IT žargonu“',
      'Rozumné doporučení: opravit vs. koupit nové'
    ],
    data: 'Do e-mailu ani telefonu neposíláme marketing. Kontaktní údaje slouží jen k domluvě ohledně zakázky.',
    faq: [
      { q: 'Musím se objednávat předem?', a: 'Ideálně ano, ať se nepotkáš s tím, že zrovna nejsme na provozovně.' },
      { q: 'Děláte i výjezdy k zákazníkovi?', a: 'Možné po domluvě, podle vzdálenosti a typu problému.' }
    ]
  }
}










//                                      ---- STATE ----
let isAdmin = false
let editingId = null
let lastReservation = null
let messageTimeout = null
let services = []
let currentPage = 'book'
let confirmTimeout = null
let deletePendingId = null
let deletePendingButton = null










//                                        ---- DOM ----

const navButtons = Array.from(document.querySelectorAll('nav.topNav button'))
const form = document.getElementById('createForm')
const output = document.getElementById('output')

const serviceSelect = document.getElementById('service')
const serviceMeta = document.getElementById('serviceMeta')
const dateInput = document.getElementById('date')

const message = document.getElementById('message')
const submitBtn = document.getElementById('submitBtn')
const cancelBtn = document.getElementById('cancelBtn')

const testApiBottom = document.getElementById('testApiBottom')

const confirmCard = document.getElementById('confirmCard')
const newReservationBtn = document.getElementById('newReservation')
const editLastBtn = document.getElementById('editLast')
const bottomPanel = document.getElementById('bottomPanel')
const bookingPanel = document.getElementById('bookingPanel')
const includesBlock = document.getElementById('includesBlock')
const howTitle = document.getElementById('howTitle')
const grid = document.querySelector('main.grid')
const leftSection = document.querySelector('main.grid .left')
const btnPricing = navButtons.find(b => b.dataset.page === 'pricing')
const btnAbout   = navButtons.find(b => b.dataset.page === 'about')
const btnContact = navButtons.find(b => b.dataset.page === 'contact')
const btnBook    = navButtons.find(b => b.dataset.page === 'book')

const adminLoginBtn = document.getElementById("adminLogin")
const adminSection = document.getElementById('page-admin')
const btnAdmin   = navButtons.find(b => b.dataset.page === 'admin')
const adminLoginBox = document.getElementById('adminLoginBox')
const adminLogoutBox = document.getElementById('adminLogoutBox')
const adminPass = document.getElementById('adminPass')
const adminError = document.getElementById('adminError')
const adminLogoutBtn = document.getElementById('adminLogout')

const deleteModal       = document.getElementById('deleteModal')
const deleteModalText   = document.getElementById('deleteModalText')
const deleteConfirmBtn  = document.getElementById('deleteConfirmBtn')
const deleteCancelBtn   = document.getElementById('deleteCancelBtn')









//                                  ---- HELPER FUNKCE ----

function updateIncludesTitle() {
  const h = document.getElementById('includesTitle')
  if (!h) return

  switch (currentPage) {
    case 'pricing':
      h.textContent = 'Orientační ceny služeb'
      break
    case 'about':
      h.textContent = 'Co nabízíme'
      break
    case 'contact':
      h.textContent = 'Jak se s námi domluvit'
      break
    default:
      // Rezervace + Admin + všechno ostatní
      h.textContent = 'Co služba zahrnuje'
  }
}

function updateHowTitle(pageKey) {
  if (!howTitle) return

  if (pageKey === 'pricing') {
    howTitle.textContent = 'Jak ceny určujeme'
  } else if (pageKey === 'about') {
    howTitle.textContent = 'Naše historie'
  } else if (pageKey === 'contact') {
    howTitle.textContent = 'Jak nás kontaktovat'
  } else {
    // výchozí stav – Rezervace, Admin atd.
    howTitle.textContent = 'Jak to probíhá'
  }
}

function normalize(s) {
  return String(s ?? '').toLowerCase().trim()
}


/**
 * Slouží k mapování služby na textový obsah v levém panelu.
 */
function getContentKeyForService(service) {
  const name = normalize(service?.name)
  if (name.includes('odvirov') || name.includes('vyčištění systému') || name.includes('vycisteni systemu')) return 'MALWARE'
  if (name.includes('instalace windows')) return 'WINDOWS'
  if (name.includes('záloha') || name.includes('zaloha')) return 'DATA'
  if (name.includes('disk') || name.includes('ram')) return 'HARDWARE'
  if (name.includes('diagnostika')) return 'SUPPORT'

  const cat = normalize(service?.category).toUpperCase()
  if (cat === 'HARDWARE') return 'HARDWARE'
  if (cat === 'DATA') return 'DATA'
  if (cat === 'SUPPORT') return 'SUPPORT'

  return 'SUPPORT'
}

function clearMessage() {
  if (messageTimeout) {
    clearTimeout(messageTimeout)
    messageTimeout = null
  }
  message.textContent = ''
  message.classList.remove('err', 'ok')
}

function scheduleClearMessage() {
  if (messageTimeout) clearTimeout(messageTimeout)
  messageTimeout = setTimeout(() => clearMessage(), 3500)
}

function showError(text) {
  if (!message) return alert(text)
  message.classList.remove('ok')
  message.classList.add('err')
  message.textContent = text
  scheduleClearMessage()
}

function showSuccess(text) {
  if (!message) return
  message.classList.remove('err')
  message.classList.add('ok')
  message.textContent = text
  scheduleClearMessage()
}

function setSubmitting(isSubmitting) {
  submitBtn.disabled = isSubmitting
  cancelBtn.disabled = isSubmitting
  submitBtn.textContent = isSubmitting ? 'Ukládám…' : (editingId ? 'Uložit změny' : 'Objednat')
}

function hideConfirm() {
  if (confirmTimeout) {
    clearTimeout(confirmTimeout)
    confirmTimeout = null
  }
  confirmCard.classList.add('hidden')
}

function showConfirm(reservation) {
  const service = services.find(s => Number(s.id) === Number(reservation?.service?.id))
  const serviceName = service?.name ?? '—'
  const price = service ? `${service.priceFrom}–${service.priceTo} Kč` : '—'

  document.getElementById('cService').textContent = serviceName
  document.getElementById('cDate').textContent = reservation.reservationDate ?? '—'
  document.getElementById('cTime').textContent = reservation.reservationTime ?? '—'
  document.getElementById('cName').textContent = reservation.customerName ?? '—'
  document.getElementById('cPhone').textContent = reservation.customerPhone ?? '—'
  document.getElementById('cPrice').textContent = price

  if (confirmTimeout) {
    clearTimeout(confirmTimeout)
    confirmTimeout = null
  }

  confirmCard.classList.remove('hidden')

  // automaticky skrýt po 10 sekundách
  confirmTimeout = setTimeout(() => {
    hideConfirm()
  }, 10000)
}










//                                  ---- RENDER FUNKCE ----

function renderTable(reservations) {
  if (!reservations || reservations.length === 0) {
    output.innerHTML = `<p class="muted">Zatím žádné rezervace.</p>`
    return
  }

  let rows = ''
  for (const r of reservations) {
    const isEditing = String(editingId) === String(r.id)
    const price = r.service
      ? `<span class="price">${r.service.priceFrom}–${r.service.priceTo} Kč</span>`
      : `<span class="muted">—</span>`

    rows += `
      <tr class="${isEditing ? 'editing-row' : ''}">
        <td>${r.id}</td>
        <td>${r.customerName ?? ''}</td>
        <td>${r.customerPhone ?? ''}</td>
        <td>${r.reservationDate ?? ''}</td>
        <td>${r.reservationTime ?? ''}</td>
        <td>${r.service?.name ?? '-'}</td>
        <td>${price}</td>
        <td class="actions">
            <div class="actionsWrap">
                <button class="delete-btn" data-id="${r.id}">Smazat</button>
                <button class="edit-btn" data-id="${r.id}">Upravit</button>
            </div>
        </td>
      </tr>
    `
  }

  output.innerHTML = `
    <table class="tbl">
      <colgroup>
        <col style="width: 40px;">   <!-- ID -->
        <col style="width: 160px;">  <!-- Jméno -->
        <col style="width: 150px;">  <!-- Telefon -->
        <col style="width: 110px;">  <!-- Datum -->
        <col style="width: 80px;">   <!-- Čas -->
        <col style="width: 220px;">  <!-- Služba -->
        <col style="width: 110px;">  <!-- Cena -->
        <col style="width: 130px;">  <!-- Akce -->
      </colgroup>
      <thead>
        <tr>
          <th>ID</th>
          <th>Jméno</th>
          <th>Telefon</th>
          <th>Datum</th>
          <th>Čas</th>
          <th>Služba</th>
          <th>Cena</th>
          <th>Akce</th>
        </tr>
      </thead>
      <tbody>${rows}</tbody>
    </table>
  `
}

function renderLeftPanelByService(service) {
  const key = getContentKeyForService(service)
  const cfg = contentByKey[key] ?? contentByKey.SUPPORT

  document.getElementById('pageTitle').textContent = cfg.title
  document.getElementById('pageLead').textContent = cfg.lead

  const howList = document.getElementById('howList')
  howList.innerHTML = cfg.how.map(x => `<li>${x}</li>`).join('')

  const includesList = document.getElementById('includesList')
  includesList.innerHTML = cfg.includes.map(x => `<li>${x}</li>`).join('')

  document.getElementById('dataText').textContent = cfg.data

  const faqBox = document.getElementById('faqBox')
  faqBox.innerHTML = cfg.faq.map((it, idx) => `
    <details ${idx === 0 ? '' : ''}>
      <summary>${it.q}</summary>
      <div class="faqA">${it.a}</div>
    </details>
  `).join('')
}

function renderStaticPage(pageKey) {
  const cfg = staticPages[pageKey]
  if (!cfg) return

  if (includesBlock) {
    includesBlock.style.display = 'none'
  }

  document.getElementById('pageTitle').textContent = cfg.title
  document.getElementById('pageLead').textContent = cfg.lead

  const howList = document.getElementById('howList')
  howList.innerHTML = cfg.how.map(x => `<li>${x}</li>`).join('')

  document.getElementById('dataText').textContent = cfg.data

  const faqBox = document.getElementById('faqBox')
  faqBox.innerHTML = cfg.faq.map((it, idx) => `
    <details ${idx === 0 ? '' : ''}>
      <summary>${it.q}</summary>
      <div class="faqA">${it.a}</div>
    </details>
  `).join('')
}









//                              ---- LOGIKA NAVIGACE/ADMIN ----

function applyRoleNav() {
  if (isAdmin) {
    btnPricing && (btnPricing.style.display = 'none')
    btnAbout   && (btnAbout.style.display = 'none')
    btnContact && (btnContact.style.display = 'none')

    btnBook  && (btnBook.style.display = 'inline-flex')
    btnAdmin && (btnAdmin.style.display = 'inline-flex')
  } else {
    btnPricing && (btnPricing.style.display = 'inline-flex')
    btnAbout   && (btnAbout.style.display = 'inline-flex')
    btnContact && (btnContact.style.display = 'inline-flex')
    btnBook    && (btnBook.style.display = 'inline-flex')

    btnAdmin && (btnAdmin.style.display = 'inline-flex')
  }
}

navButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const pageKey = btn.dataset.page
    currentPage = pageKey

    // Zvýrazníme aktivní tlačítko
    navButtons.forEach(b => {
      b.classList.toggle('active', b === btn)
    })

    // Přepneme text nadpisu "Jak to probíhá / Jak ceny určujeme / ..."
    updateHowTitle(pageKey)
    updateIncludesTitle()

    // ADMIN stránka – jen přihlášení/odhlášení, žádné rezervace
    if (pageKey === 'admin') {
      grid.style.display = 'none'
      adminSection.style.display = 'block'
      bookingPanel.style.display = 'none'
      bottomPanel.style.display = 'none'
      bottomPanel.classList.remove('bottomPanelTop')
      renderAdminAuthUI()
      return
    }

    // Ostatní stránky (Ceník / O nás / Kontakt / Rezervace)
    adminSection.style.display = 'none'
    grid.style.display = 'grid'

    if (pageKey === 'book') {
      // REZERVACE
      if (includesBlock) {
        includesBlock.style.display = 'block'
      }

      if (isAdmin) {
        // ADMIN – jen tabulka rezervací (nahoře)
        grid.style.display = 'none'
        leftSection.style.display = 'none'
        bookingPanel.style.display = 'none'
        bottomPanel.style.display = 'block'
        bottomPanel.classList.add('bottomPanelTop')
      } else {
        // BĚŽNÝ UŽIVATEL – formulář + info, žádná tabulka
        grid.style.display = 'grid'
        leftSection.style.display = ''
        bookingPanel.style.display = 'block'
        bottomPanel.style.display = 'none'
        bottomPanel.classList.remove('bottomPanelTop')
        leftSection.classList.remove('full-width')

        const s = services.find(x => Number(x.id) === Number(serviceSelect.value))
        renderLeftPanelByService(s || null)
      }
    } else {
      // CENÍK / O NÁS / KONTAKT
      grid.style.display = 'grid'
      leftSection.style.display = ''
      bookingPanel.style.display = 'none'
      bottomPanel.style.display = 'none'
      bottomPanel.classList.remove('bottomPanelTop')
      leftSection.classList.add('full-width')
      renderStaticPage(pageKey)
    }
  })
})

function renderAdminAuthUI() {
  if (!adminLoginBox || !adminLogoutBox) return

  if (isAdmin) {
    adminLoginBox.style.display = 'none'
    adminLogoutBox.style.display = 'block'
  } else {
    adminLoginBox.style.display = 'block'
    adminLogoutBox.style.display = 'none'
  }
}









//                                  ---- API FUNKCE ----

async function loadServices() {
  const res = await fetch(`${API_BASE}/services`)
  if (!res.ok) throw new Error(`Services: ${res.status}`)
  services = await res.json()

  serviceSelect.innerHTML = '<option value="">Vyber službu</option>'
  for (const s of services) {
    const opt = document.createElement('option')
    opt.value = String(s.id)
    opt.textContent = `${s.name} (${s.priceFrom}–${s.priceTo} Kč, ${s.durationMinutes} min)`
    serviceSelect.appendChild(opt)
  }

  if (services.length > 0) {
    serviceSelect.value = String(services[0].id)
    serviceSelect.dispatchEvent(new Event('change'))
  }
}

async function refreshTable() {
  const res = await fetch(`${API_BASE}/reservations`)
  const data = await res.json()
  renderTable(data)
}









//                          ---- EVENT LISTENERY / FORMULÁŘE / TABULKY ----

adminLoginBtn?.addEventListener('click', () => {
  if (!adminPass || !adminError) return

  const pass = adminPass.value.trim()

  if (pass !== 'admin123') {
    adminError.textContent = 'Nesprávné heslo'
    adminError.classList.remove('hidden')
    return
  }
  adminError.classList.add('hidden')
  adminError.textContent = ''
  adminPass.value = ''

  isAdmin = true

  applyRoleNav()
  renderAdminAuthUI()
  btnAdmin?.click()

  currentPage = 'admin'
  navButtons.forEach(b => {
    b.classList.toggle('active', b.dataset.page === 'admin')
  })

  grid.style.display = 'none'
  adminSection.style.display = 'block'
  bookingPanel.style.display = 'none'

  // NESMÍME zobrazit tabulku na admin stránce:
  bottomPanel.style.display = 'none'
  bottomPanel.classList.remove('bottomPanelTop')
})

adminLogoutBtn?.addEventListener('click', () => {
  isAdmin = false
  showSuccess('Odhlášen.')

  applyRoleNav()
  renderAdminAuthUI()

  if (bottomPanel) {
    bottomPanel.style.display = 'none'
    bottomPanel.classList.remove('bottomPanelTop')
  }

  btnBook?.click()
})


/**
 * Ukončí režim editace rezervace.
 * Obnoví formulář do výchozího stavu a přepne UI podle role uživatele.
 */
function exitEditMode() {
  editingId = null
  form.reset()
  cancelBtn.style.display = 'none'
  submitBtn.textContent = 'Objednat'
  clearMessage()
  hideConfirm()

  // ADMIN → po zrušení/uložení zpátky na tabulku
  if (isAdmin) {
    leftSection.style.display = 'none'
    bookingPanel.style.display = 'none'
    grid.style.display = 'none'
    bottomPanel.style.display = 'block'
    bottomPanel.classList.add('bottomPanelTop')
  }
}

form.addEventListener('submit', async (e) => {
  e.preventDefault()

  const phoneValue = document.getElementById('phone').value.trim()
  const digitsOnly = phoneValue.replace(/\D/g, '')

  if (digitsOnly.length < 9) {
    showError('Zadej prosím platné telefonní číslo (min. 9 číslic).')
    setSubmitting(false)
    return
  }

  if (submitBtn.disabled) return

  clearMessage()
  setSubmitting(true)

  try {
    const serviceIdRaw = serviceSelect.value
    const serviceId = Number(serviceIdRaw)
    if (!serviceIdRaw || Number.isNaN(serviceId)) {
      showError('Vyber prosím službu.')
      return
    }

    const reservation = {
      customerName: document.getElementById('name').value.trim(),
      customerPhone: phoneValue,
      reservationDate: document.getElementById('date').value,
      reservationTime: document.getElementById('time').value,
      problemDescription: document.getElementById('desc').value.trim(),
      service: { id: Number(serviceSelect.value) }
    }

    const isEdit = editingId !== null
    const url = isEdit ? `${API_BASE}/reservations/${editingId}` : `${API_BASE}/reservations`
    const method = isEdit ? 'PUT' : 'POST'

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(reservation)
    })

    if (!res.ok) {
      const text = await res.text()
      showError(text || `Chyba: ${res.status}`)
      return
    }

    const saved = await res.json()
    lastReservation = saved

    await refreshTable()

    if (isEdit) {
      exitEditMode()
      showSuccess('Rezervace byla upravena.')
    } else {
      form.reset()
      showSuccess('Rezervace byla vytvořena.')
      showConfirm(saved)
    }
  } finally {
    setSubmitting(false)
  }
})

testApiBottom.addEventListener('click', async () => {
  await refreshTable()
})

output.addEventListener('click', async (e) => {
  const del = e.target.closest('.delete-btn')
  if (del) {
    const id = del.dataset.id
    openDeleteModal(id, del)
    return
  }

  const edit = e.target.closest('.edit-btn')
  if (edit) {
    clearMessage()
    hideConfirm()

    const id = edit.dataset.id
    const res = await fetch(`${API_BASE}/reservations/${id}`)
    if (!res.ok) {
      const t = await res.text()
      showError(t || `Nepodařilo se načíst rezervaci #${id}. Status: ${res.status}`)
      return
    }
    const r = await res.json()

    document.getElementById('name').value = r.customerName ?? ''
    document.getElementById('phone').value = r.customerPhone ?? ''
    document.getElementById('date').value = r.reservationDate ?? ''
    document.getElementById('time').value = r.reservationTime ?? ''
    document.getElementById('desc').value = r.problemDescription ?? ''

    serviceSelect.value = r.service?.id ? String(r.service.id) : ''
    serviceSelect.dispatchEvent(new Event('change'))

    if (isAdmin) {
      grid.style.display = 'grid'        // ukážeme hlavní grid
      leftSection.style.display = 'none' // schováme textový sloupek
      bookingPanel.style.display = 'block'
      bottomPanel.style.display = 'none' // schováme tabulku
      bottomPanel.classList.remove('bottomPanelTop')
    }

    editingId = r.id
    submitBtn.textContent = 'Uložit změny'
    cancelBtn.style.display = 'inline-block'
  }
})

deleteCancelBtn?.addEventListener('click', () => {
  closeDeleteModal()
})

deleteConfirmBtn?.addEventListener('click', () => {
  if (!deletePendingId || !deletePendingButton) {
    closeDeleteModal()
    return
  }
  deleteReservation(deletePendingId, deletePendingButton)
})

// Zavření kliknutím mimo kartu
deleteModal?.addEventListener('click', (e) => {
  if (e.target === deleteModal) {
    closeDeleteModal()
  }
})

cancelBtn.addEventListener('click', () => {
  exitEditMode()
})

newReservationBtn.addEventListener('click', () => {
  exitEditMode()
  showSuccess('Můžeš vytvořit novou rezervaci.')
})

editLastBtn.addEventListener('click', async () => {
  clearMessage()

  if (!lastReservation?.id) {
    showError('Není co upravit – nejdřív vytvoř rezervaci.')
    return
  }

  const id = lastReservation.id
  const res = await fetch(`${API_BASE}/reservations/${id}`)

  if (!res.ok) {
    const text = await res.text()
    showError(text || `Nepodařilo se načíst rezervaci. Status: ${res.status}`)
    return
  }

  const r = await res.json()

  document.getElementById('name').value = r.customerName ?? ''
  document.getElementById('phone').value = r.customerPhone ?? ''
  document.getElementById('date').value = r.reservationDate ?? ''
  document.getElementById('time').value = (r.reservationTime ?? '').toString().slice(0, 5)
  document.getElementById('desc').value = r.problemDescription ?? ''

  serviceSelect.value = r.service?.id ?? ''
  serviceSelect.dispatchEvent(new Event('change'))

  editingId = r.id
  submitBtn.textContent = 'Uložit změny'
  cancelBtn.style.display = 'inline-block'
})

serviceSelect.addEventListener('change', () => {
  const s = services.find(x => Number(x.id) === Number(serviceSelect.value))

  // pokud nejsme na stránce "Rezervace", jen přepíšeme meta, ale nešaháme na levý panel
  serviceMeta.textContent = s
    ? `${s.category} • ${s.durationMinutes} min • ${s.priceFrom}–${s.priceTo} Kč`
    : ''

  if (currentPage !== 'book') {
    return
  }

  if (!s) {
    renderLeftPanelByService(null)
    return
  }

  renderLeftPanelByService(s)
  clearMessage()
})

if (dateInput) {
  const today = new Date()
  const yyyy = today.getFullYear()
  const mm = String(today.getMonth() + 1).padStart(2, '0')
  const dd = String(today.getDate()).padStart(2, '0')
  dateInput.min = `${yyyy}-${mm}-${dd}`
}

if (!isAdmin && bottomPanel) {
  bottomPanel.style.display = 'none'
}

// Kontrola zda něco nechybí, pokud ano vypíšeme do konzole
if (!form || !output || !serviceSelect || !submitBtn || !testApiBottom) {
  console.warn('Některé prvky v šabloně chybí – zkontroluj HTML/Vite template.')
}

// výchozí stav – Rezervace = 2 sloupce
const defaultBtn = document.querySelector('nav.topNav button[data-page="book"]')
if (defaultBtn) {
  defaultBtn.classList.add('active')
}
currentPage = 'book'
bookingPanel.style.display = 'block'
leftSection.classList.remove('full-width')

function openDeleteModal(id, button) {
  if (!deleteModal) return

  deletePendingId = id
  deletePendingButton = button

  if (deleteModalText) {
    deleteModalText.textContent = `Opravdu si přeješ smazat tuto rezervaci #${id}?`
  }

  // otevřít modal
  deleteModal.classList.add('is-open')
}

function closeDeleteModal() {
  if (!deleteModal) return

  deletePendingId = null
  deletePendingButton = null

  // zavřít modal
  deleteModal.classList.remove('is-open')
}

async function deleteReservation(id, delButton) {
  delButton.disabled = true
  const old = delButton.textContent
  delButton.textContent = 'Mažu…'

  try {
    const res = await fetch(`${API_BASE}/reservations/${id}`, { method: 'DELETE' })
    if (!res.ok) {
      const t = await res.text()
      showError(t || `Chyba: ${res.status}`)
      return
    }
    await refreshTable()
    showSuccess('Rezervace byla smazána.')
  } finally {
    delButton.disabled = false
    delButton.textContent = old
    closeDeleteModal()
  }
}










//                                      ---- INIT ----

/**
 * Inicializace aplikace:
 * - načtení služeb a rezervací
 * - nastavení výchozí stránky
 * - aplikace role uživatele
 */
;(async function init() {
  try {
    await loadServices()
    await refreshTable()
  } catch (e) {
    console.error(e)
    showError('Nepodařilo se načíst data. Zkontroluj, že běží backend na :8080.')
  }
  currentPage = 'book'
  updateIncludesTitle()
  applyRoleNav()
  renderAdminAuthUI()
  updateHowTitle('book')
})()

