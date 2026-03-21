/* =====================================================
   NERO — firebase.js
   Single module: initialises Firebase, loads live
   fuel prices + news on every public page that needs them.
   Collection paths match exactly what admin.js writes to.
===================================================== */
import { initializeApp, getApps } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
import {
  getFirestore,
  doc,
  getDoc,
  collection,
  query,
  orderBy,
  limit,
  getDocs,
  onSnapshot          // real-time listener for prices
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

/* ── Init (guard against double-init) ── */
const FIREBASE_CONFIG = {
  apiKey:            "AIzaSyB-Q-MFZDCgHnaVgMRrgxEL9YPrIqZwUrU",
  authDomain:        "redfuel-a2152.firebaseapp.com",
  projectId:         "redfuel-a2152",
  storageBucket:     "redfuel-a2152.firebasestorage.app",
  messagingSenderId: "782154176195",
  appId:             "1:782154176195:web:46af20e4252e415ba77476"
};

const app = getApps().length ? getApps()[0] : initializeApp(FIREBASE_CONFIG);
export const db = getFirestore(app);

/* ══════════════════════════════════════
   LIVE FUEL PRICES
   Reads from: fuel_prices/current
   Admin writes to the same path.
   Uses onSnapshot so price updates appear
   on the page in real-time without refresh.
══════════════════════════════════════ */
function loadLivePrices() {
  const petrolEls = document.querySelectorAll(
    "#petrolPrice, #tickerPetrol, #tickerPetrol2"
  );
  const dieselEls = document.querySelectorAll(
    "#dieselPrice, #tickerDiesel, #tickerDiesel2"
  );

  if (!petrolEls.length && !dieselEls.length) return;

  const priceRef = doc(db, "fuel_prices", "current");

  onSnapshot(priceRef, snap => {
    if (!snap.exists()) return;
    const { petrol, diesel } = snap.data();

    petrolEls.forEach(el => {
      if (el) el.textContent = petrol ? `$${parseFloat(petrol).toFixed(2)}` : el.textContent;
    });
    dieselEls.forEach(el => {
      if (el) el.textContent = diesel ? `$${parseFloat(diesel).toFixed(2)}` : el.textContent;
    });
  }, err => console.warn("Price listener error:", err));
}

/* ══════════════════════════════════════
   NEWS / STATION UPDATES
   Reads from: updates collection
   Admin writes to the same collection.
══════════════════════════════════════ */
async function loadNews() {
  const container = document.getElementById("newsContainer");
  if (!container) return;

  try {
    const q = query(
      collection(db, "updates"),
      orderBy("date", "desc"),
      limit(3)
    );
    const snapshot = await getDocs(q);

    container.innerHTML = ""; // clear skeletons

    if (snapshot.empty) {
      container.innerHTML = `
        <div style="grid-column:1/-1;text-align:center;padding:3rem;color:var(--muted);">
          <p style="margin:0;">No updates yet. Check back soon.</p>
        </div>`;
      return;
    }

    snapshot.forEach(docSnap => {
      const data = docSnap.data();
      const date = data.date?.toDate?.() || new Date();
      const formatted = date.toLocaleDateString("en-GB", {
        day: "numeric", month: "short", year: "numeric"
      });

      const card = document.createElement("div");
      card.className = "news-card";
      card.innerHTML = `
        ${data.image
          ? `<img src="${data.image}" alt="${data.title || ''}" loading="lazy" onerror="this.style.display='none'">`
          : ""}
        <div class="news-card-body">
          <div class="news-card-date">${formatted}</div>
          <h3>${data.title || "Station Update"}</h3>
          <p>${data.text || ""}</p>
        </div>`;
      container.appendChild(card);
    });

  } catch (err) {
    console.error("News load error:", err);
    // Graceful fallback — keep skeleton cards visible
    container.innerHTML = `
      <div class="news-card">
        <div class="news-card-body">
          <div class="news-card-date">Mar 2026</div>
          <h3>New Pump Lane Open</h3>
          <p>NERO North Hub has opened 2 additional pump lanes to reduce wait times during peak hours.</p>
        </div>
      </div>
      <div class="news-card">
        <div class="news-card-body">
          <div class="news-card-date">Feb 2026</div>
          <h3>Car Wash Upgrade</h3>
          <p>All three stations now feature the latest touchless wash technology with ceramic coating option.</p>
        </div>
      </div>
      <div class="news-card">
        <div class="news-card-body">
          <div class="news-card-date">Jan 2026</div>
          <h3>Loyalty App Launching Soon</h3>
          <p>Track your points, book car washes and check live fuel prices — all from the NERO app.</p>
        </div>
      </div>`;
  }
}

/* ══════════════════════════════════════
   HERO SLIDESHOW IMAGES
   If admin has uploaded custom slides,
   swap them in dynamically.
══════════════════════════════════════ */
async function loadHeroImages() {
  const slides = document.querySelectorAll(".hero-slide");
  if (!slides.length) return;

  try {
    const snap = await getDoc(doc(db, "site_images", "hero"));
    if (!snap.exists()) return;
    const data = snap.data();
    ["slide0", "slide1", "slide2"].forEach((key, i) => {
      if (data[key] && slides[i]) {
        slides[i].style.backgroundImage = `url('${data[key]}')`;
      }
    });
  } catch (err) {
    console.warn("Hero image load:", err);
  }
}

/* ── Run everything on DOMContentLoaded ── */
document.addEventListener("DOMContentLoaded", () => {
  loadLivePrices();
  loadNews();
  loadHeroImages();
});