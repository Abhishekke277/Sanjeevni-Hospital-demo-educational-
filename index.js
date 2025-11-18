 AOS.init({ duration: 900, once: true });

      // Fetch dummy doctors using Random User API
      async function loadDoctors() {
        try {
          const res = await fetch(
            "https://randomuser.me/api/?results=6&nat=in,in&inc=name,location,picture"
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
              <div style="color:var(--muted);font-size:13px">${spec} • ${
              d.location.city
            }</div>
              <div style="margin-top:8px;color:var(--muted);font-size:13px"><i class="fa-solid fa-star" style="color:gold"></i> ${(
                Math.random() * 1.5 +
                3.8
              ).toFixed(1)} rating</div>
            </div>
          `;
            list.appendChild(card);
          });
        } catch (err) {
          console.error(err);
        }
      }

      // Fetch dummy news from JSONPlaceholder
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
            item.innerHTML = `<h4 style="margin:0">${n.title.slice(
              0,
              50
            )}</h4><p style="color:var(--muted);font-size:14px">${n.body.slice(
              0,
              110
            )}...</p>`;
            news.appendChild(item);
          });
        } catch (err) {
          console.error(err);
        }
      }

      loadDoctors();
      loadNews();

      // Simple contact form handler (dummy)
      function submitForm(e) {
        e.preventDefault();
        const email = document.getElementById("email").value;
        const phone = document.getElementById("phone").value;
        alert("Thanks! We will contact you at " + (email || phone));
        e.target.reset();
      }

      // Smooth link scrolling for nav anchors
      document.querySelectorAll("nav a").forEach((a) => {
        a.addEventListener("click", (ev) => {
          ev.preventDefault();
          const id = a.getAttribute("href").slice(1);
          const el = document.getElementById(id);
          if (el) el.scrollIntoView({ behavior: "smooth" });
        });
      });