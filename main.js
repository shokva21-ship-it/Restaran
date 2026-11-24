
const header = document.querySelector("header");

window.addEventListener("scroll", () => {
    header.classList.toggle("sticky", window.scrollY > 50);
});

const cards = document.querySelectorAll(".card");
let cart = [];

cards.forEach((card, index) => {
    const plus = card.querySelector(".fa-plus");
    const name = card.querySelector("h3").textContent;
    const price = card.querySelector("b").textContent;
    const image = card.querySelector("img").src;

    plus.style.cursor = "pointer";

    plus.addEventListener("click", () => {
        cart.push({ name, price, image });

        plus.classList.replace("fa-plus", "fa-check");
        plus.style.color = "green";

        updateCart();

        setTimeout(() => {
            plus.classList.replace("fa-check", "fa-plus");
            plus.style.color = "";
        }, 1000);
    });
});

function updateCart() {
    let old = document.querySelector(".cart-count");

    if (old) old.remove();

    const count = document.createElement("span");
    count.className = "cart-count";
    count.textContent = cart.length;

    const button = document.querySelector(".btn");
    if (button) button.appendChild(count);
}

const bookingForm = document.querySelector(".booking-box form");

bookingForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = bookingForm.querySelector('input[type="text"]').value;
    const email = bookingForm.querySelector('input[type="email"]').value;
    const phone = bookingForm.querySelector('input[type="tel"]').value;
    const date = bookingForm.querySelector('input[type="date"]').value;
    const guests = bookingForm.querySelector("select").value;

    if (!name || !email || !phone || !date || guests === "Number of Guests") {
        alert("Please fill in all fields!");
        return;
    }

    alert(`Thank you ${name}! Your reservation request has been received.`);

    bookingForm.reset();
});

const bookingButton = bookingForm.querySelector("button");

bookingButton.type = "submit";

const subscribe = document.querySelector(".subscribe");
const subscribeButton = subscribe.querySelector("button");
const subscribeInput = subscribe.querySelector("input");

subscribeButton.addEventListener("click", () => {
    const email = subscribeInput.value.trim();

    if (!email || !email.includes("@")) {
        alert("Please enter a valid email address!");
        return;
    }

    alert("Thank you for subscribing!");
    subscribeInput.value = "";
});

const galleryImages = document.querySelectorAll(".gallery-grid img");

galleryImages.forEach(img => {
    img.style.cursor = "pointer";

    img.addEventListener("click", () => {
        const popup = document.createElement("div");
        popup.className = "image-popup";

        const bigImage = document.createElement("img");
        bigImage.src = img.src;

        const close = document.createElement("span");
        close.textContent = "×";

        popup.append(bigImage, close);
        document.body.appendChild(popup);

        close.addEventListener("click", () => popup.remove());

        popup.addEventListener("click", e => {
            if (e.target === popup) popup.remove();
        });
    });
});

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        }
    });
}, { threshold: 0.15 });

document.querySelectorAll(".section, .feature, .chef, .review, .contact-card, .card").forEach(item => {
    item.classList.add("reveal");
    observer.observe(item);
});

const today = new Date().toISOString().split("T")[0];
const dateInput = document.querySelector('input[type="date"]');
dateInput.min = today;

