import { db } from "./firebase.js";
import {
  collection,
  getDocs,
  orderBy,
  query,
  limit
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

document.addEventListener("DOMContentLoaded", async () => {
  const container = document.getElementById("newsContainer");
  if (!container) return;

  try {
    const q = query(
      collection(db, "updates"),
      orderBy("date", "desc"),
      limit(3)
    );
    const snapshot = await getDocs(q);

    // Clear skeletons
    container.innerHTML = "";

    if (snapshot.empty) {
      container.innerHTML = `
        <div style="grid-column:1/-1; text-align:center; padding:3rem; color:var(--muted);">
          <p>No updates yet. Check back soon.</p>
        </div>`;
      return;
    }

    snapshot.forEach(doc => {
      const data = doc.data();
      const date = data.date?.toDate?.() || new Date();
      const formatted = date.toLocaleDateString("en-GB", {
        day: "numeric", month: "short", year: "numeric"
      });

      const card = document.createElement("div");
      card.className = "news-card";
      card.innerHTML = `
        ${data.image ? `<img src="${data.image}" alt="${data.title}" onerror="this.style.display='none'">` : ""}
        <div class="news-card-body">
          <div class="news-card-date">${formatted}</div>
          <h3>${data.title || "Station Update"}</h3>
          <p>${data.text || ""}</p>
        </div>`;
      container.appendChild(card);
    });

  } catch (err) {
    console.error("News load error:", err);
    // Fallback: show static placeholder cards
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
});
