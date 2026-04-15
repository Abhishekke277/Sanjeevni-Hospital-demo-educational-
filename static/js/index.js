// ✅ Init AOS animation
AOS.init({ duration: 900, once: true });


// ===============================
// 🧑‍⚕️ Load Doctors (API)
// ===============================
async function loadDoctors() {
  try {
    const res = await fetch(
      "https://randomuser.me/api/?results=6&nat=in&inc=name,location,picture"
    );
    const data = await res.json();

    const list = document.getElementById("doctors-list");
    list.innerHTML = "";

    data.results.forEach((d, i) => {
      const name = `${d.name.title} ${d.name.first} ${d.name.last}`;

      const spec = [
        "Cardiologist",
        "Neurologist",
        "General Physician",
        "Orthopedic",
        "Pediatrician",
        "Oncologist",
      ][i % 6];

      const card = document.createElement("div");
      card.className = "doc";
      card.setAttribute("data-aos", "zoom-in");

      card.innerHTML = `
        <img src="${d.picture.large}" alt="doctor">
        <div>
          <div style="font-weight:700">${name}</div>
          <div style="color:var(--muted);font-size:13px">
            ${spec} • ${d.location.city}
          </div>
          <div style="margin-top:8px;color:var(--muted);font-size:13px">
            <i class="fa-solid fa-star" style="color:gold"></i>
            ${(Math.random() * 1.5 + 3.8).toFixed(1)} rating
          </div>
        </div>
      `;

      list.appendChild(card);
    });
  } catch (err) {
    console.error("Doctors API Error:", err);
  }
}


// ===============================
// 📰 Load News (API)
// ===============================
async function loadNews() {
  try {
    const res = await fetch(
      "https://jsonplaceholder.typicode.com/posts?_limit=3"
    );
    const data = await res.json();

    const news = document.getElementById("news");
    news.innerHTML = "";

    data.forEach((n) => {
      const item = document.createElement("div");
      item.className = "card";
      item.setAttribute("data-aos", "fade-up");

      item.innerHTML = `
        <h4 style="margin:0">${n.title.slice(0, 50)}</h4>
        <p style="color:var(--muted);font-size:14px">
          ${n.body.slice(0, 110)}...
        </p>
      `;

      news.appendChild(item);
    });
  } catch (err) {
    console.error("News API Error:", err);
  }
}


// ===============================
// 📩 Contact Form (AJAX)
// ===============================
function submitForm(e) {
  e.preventDefault();

  const form = e.target;
  const formData = new FormData(form);

  // Optional validation
  const email = formData.get("email");
  const phone = formData.get("phone");

  if (!email && !phone) {
    alert("⚠️ Please enter email or phone");
    return;
  }

  fetch("/submit", {
    method: "POST",
    body: formData,
  })
    .then((res) => res.text())
    .then((data) => {
      alert("✅ " + data);
      form.reset();
    })
    .catch((err) => {
      console.error("Form Error:", err);
      alert("❌ Something went wrong!");
    });
}


// ===============================
// 🔗 Smooth Scroll
// ===============================
document.querySelectorAll("nav a").forEach((a) => {
  a.addEventListener("click", (ev) => {
    ev.preventDefault();

    const id = a.getAttribute("href").slice(1);
    const el = document.getElementById(id);

    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  });
});


// ===============================
// 🚀 Initial Load
// ===============================
loadDoctors();
loadNews();