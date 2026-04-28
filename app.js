// ── Configuration ──────────────────────────────────────────────
// Your Google Maps short link - customers will be taken here to post their review
const GOOGLE_MAPS_REVIEW_URL = "https://maps.app.goo.gl/4zawPkmMTUpPvFSM7";

// ── Review Templates by Rating ──────────────────────────────────
const reviewsByRating = {
  5: [
    "Absolutely the best pharmacy I've ever visited! The staff is incredibly knowledgeable, friendly, and always takes the time to explain medications thoroughly. My prescriptions are always ready on time. Highly recommend!",
    "Outstanding service every single time. The pharmacists here genuinely care about your health. They caught a potential drug interaction I wasn't aware of — that level of attention is priceless. Five stars all the way!",
    "This pharmacy is a gem. Fast service, a warm and welcoming team, and they always go the extra mile for their customers. The pharmacist even called my doctor to clarify a dosage. Truly exceptional!",
    "I've been a loyal customer for years and the quality of service has never dropped. They know my name, my prescriptions, and always have helpful advice. It feels like being cared for by family.",
    "Incredible pharmacy! Always stocked, super fast to fill prescriptions, and the staff is so friendly. The pharmacist took time to explain my new medication in detail. I won't go anywhere else!",
    "Top-notch pharmacy experience! The team is professional, efficient, and genuinely caring. I had an urgent prescription need and they handled it within minutes. Absolutely fantastic — 5 stars!",
    "I love this pharmacy! Clean, organized, and the pharmacists are amazing. They always double-check everything and make me feel like my health actually matters to them. 100% recommend to everyone.",
    "Best pharmacy in town — hands down! Speedy service, very knowledgeable staff, and extremely helpful. They helped me find an affordable alternative when my medication was out of stock. Real community heroes!",
    "Every visit here is a pleasure. The staff remembers your name and history, the wait times are minimal, and the pharmacists give excellent, personalized advice. Couldn't ask for a better pharmacy!",
    "Wonderful experience from start to finish. The pharmacist was patient, answered all my questions, and made sure I understood how to take my medications correctly. This is what great healthcare feels like!",
  ],
  4: [
    "Really great pharmacy with a friendly and helpful team. Prescriptions are usually ready quickly and the staff is always willing to answer my questions. Very satisfied with the service overall!",
    "Good pharmacy experience — professional staff, clean environment, and fast service. The pharmacist gave me useful advice about my medication. Slight wait times during busy hours but overall highly recommended.",
    "A reliable and trustworthy pharmacy. The staff is knowledgeable and courteous. They've always been helpful when I've had questions about dosages or interactions. Very happy with the service here.",
    "Great local pharmacy! The team is friendly and efficient. I appreciate that the pharmacists take time to counsel patients rather than just handing over pills. Minor parking issues but the service makes up for it.",
    "Very pleased with this pharmacy. My prescriptions are always ready on time, staff is professional and friendly, and they handle everything smoothly. A solid four-star experience every visit!",
    "This pharmacy does a great job overall. The pharmacists are attentive and informative, and the shop is always clean and well-stocked. Occasionally a short wait, but the quality of service makes it worthwhile.",
    "Dependable pharmacy with a caring team. They're quick, accurate, and always ready to help. I trust them with all my family's prescriptions. Definitely recommend to anyone looking for a quality pharmacy.",
    "Really happy with this pharmacy. Efficient service, friendly staff, and the pharmacist always checks in to see if I have any questions. Highly recommended for the whole community!",
    "Great service and knowledgeable pharmacists. They are always helpful and make sure you understand your medications. The only minor hiccup is occasional wait times, but the quality keeps me coming back.",
    "Very good pharmacy. The staff is courteous and professional, prescriptions are filled accurately and promptly, and they offer good health advice. A trustworthy place for all your medication needs.",
  ],
  3: [
    "Decent pharmacy with a friendly enough staff. Service is usually okay but can be slow during peak hours. The pharmacists are knowledgeable when you can get their attention. Room for improvement in wait times.",
    "Average experience overall. The team is generally helpful and the medication is always accurate, but wait times can be frustrating. The location is convenient though, and the staff are polite.",
    "It's an okay pharmacy. The medications are always right and the staff is friendly, but the wait can be long and things sometimes feel rushed. With some improvements to efficiency it could be great.",
    "Satisfactory service. Nothing really stands out as exceptional, but nothing was bad either. The pharmacists are competent and helpful when available. A solid, dependable option if you're nearby.",
    "Fair pharmacy experience. Staff are friendly and prescriptions are accurate, but the wait times are a bit long and could be improved. Overall a reasonable choice for local needs.",
  ],
  2: [
    "Unfortunately not a great experience. Wait times were very long and I had to chase staff for an update on my prescription. The medication was correct but the service needs significant improvement.",
    "Disappointed with my visits here. The staff didn't seem very attentive and I waited a long time despite having a straightforward prescription. I hope management takes steps to improve the customer experience.",
    "Service was below expectations. Prescription wasn't ready at the promised time and staff seemed overwhelmed. The pharmacist was knowledgeable but the overall experience needs improvement in terms of efficiency.",
  ],
  1: [
    "Very poor experience. Prescription was not ready on time, staff were dismissive when I asked for an update, and communication was lacking throughout. I hope the management addresses these serious service issues.",
    "Regrettably, this was a disappointing visit. Long waits, inaccurate information given about my medication pick-up time, and unhelpful staff when I raised concerns. Much needs to improve here.",
  ],
};

const ratingLabels = {
  1: "😞 We're sorry to hear that",
  2: "😕 Thanks for the feedback",
  3: "😊 Glad you visited us!",
  4: "😄 Great to hear!",
  5: "🤩 You made our day!",
};

// ── State ─────────────────────────────────────────────────────
let selectedRating = 0;
let selectedReviewIndex = -1;
let currentSlide = 0;
let reviews = [];

// ── DOM refs ──────────────────────────────────────────────────
const starsRow       = document.getElementById("starsRow");
const ratingHint     = document.getElementById("ratingHint");
const stepRating     = document.getElementById("step-rating");
const stepReviews    = document.getElementById("step-reviews");
const stepSuccess    = document.getElementById("step-success");
const carouselTrack  = document.getElementById("carouselTrack");
const carouselDots   = document.getElementById("carouselDots");
const arrowLeft      = document.getElementById("arrowLeft");
const arrowRight     = document.getElementById("arrowRight");
const customText     = document.getElementById("customText");
const submitBtn      = document.getElementById("submitBtn");
const resetBtn       = document.getElementById("resetBtn");
const toast          = document.getElementById("toast");
const starBtns       = Array.from(starsRow.querySelectorAll(".star-btn"));

// ── Stars interaction ─────────────────────────────────────────
starBtns.forEach(btn => {
  btn.addEventListener("mouseenter", () => highlightStars(+btn.dataset.val, "hovered"));
  btn.addEventListener("mouseleave", () => highlightStars(selectedRating, "selected"));
  btn.addEventListener("click", () => selectRating(+btn.dataset.val));
});

function highlightStars(val, cls) {
  starBtns.forEach((b, i) => {
    b.classList.remove("hovered", "selected");
    if (i < val) b.classList.add(cls);
  });
}

function selectRating(val) {
  selectedRating = val;
  highlightStars(val, "selected");
  ratingHint.textContent = ratingLabels[val] || "";
  setTimeout(() => buildCarousel(val), 280);
}

// ── Carousel ──────────────────────────────────────────────────
function buildCarousel(rating) {
  reviews = reviewsByRating[rating] || reviewsByRating[5];
  selectedReviewIndex = -1;
  currentSlide = 0;
  carouselTrack.innerHTML = "";
  carouselDots.innerHTML = "";

  reviews.forEach((text, i) => {
    // Card
    const card = document.createElement("div");
    card.className = "review-card";
    card.innerHTML = `
      <div class="review-stars">${"★".repeat(rating)}${"☆".repeat(5 - rating)}</div>
      <p class="review-text">${text}</p>
    `;
    card.addEventListener("click", () => selectReview(i, card));
    carouselTrack.appendChild(card);

    // Dot
    const dot = document.createElement("button");
    dot.className = "dot" + (i === 0 ? " active" : "");
    dot.setAttribute("aria-label", `Review ${i + 1}`);
    dot.addEventListener("click", () => goToSlide(i));
    carouselDots.appendChild(dot);
  });

  updateCarousel();

  // Show step 2
  stepReviews.classList.remove("hidden");
  customText.value = "";
  stepReviews.scrollIntoView({ behavior: "smooth", block: "start" });
}

function selectReview(index, cardEl) {
  selectedReviewIndex = index;
  customText.value = "";
  document.querySelectorAll(".review-card").forEach(c => c.classList.remove("active"));
  cardEl.classList.add("active");
}

function goToSlide(i) {
  currentSlide = Math.max(0, Math.min(i, reviews.length - 1));
  updateCarousel();
}

function updateCarousel() {
  carouselTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
  const dots = carouselDots.querySelectorAll(".dot");
  dots.forEach((d, i) => d.classList.toggle("active", i === currentSlide));
  arrowLeft.disabled  = currentSlide === 0;
  arrowRight.disabled = currentSlide === reviews.length - 1;
}

arrowLeft.addEventListener("click",  () => { if (currentSlide > 0) goToSlide(currentSlide - 1); });
arrowRight.addEventListener("click", () => { if (currentSlide < reviews.length - 1) goToSlide(currentSlide + 1); });

// Touch/swipe
let touchStartX = 0;
carouselTrack.addEventListener("touchstart", e => { touchStartX = e.changedTouches[0].clientX; }, { passive: true });
carouselTrack.addEventListener("touchend", e => {
  const dx = e.changedTouches[0].clientX - touchStartX;
  if (Math.abs(dx) > 40) goToSlide(currentSlide + (dx < 0 ? 1 : -1));
});

// Custom text clears review selection
customText.addEventListener("input", () => {
  if (customText.value.trim()) {
    selectedReviewIndex = -1;
    document.querySelectorAll(".review-card").forEach(c => c.classList.remove("active"));
  }
});

// ── Submit ────────────────────────────────────────────────────
submitBtn.addEventListener("click", () => {
  const reviewText = customText.value.trim() ||
    (selectedReviewIndex >= 0 ? reviews[selectedReviewIndex] : "");

  if (!selectedRating) {
    alert("Please select a star rating first!");
    stepRating.scrollIntoView({ behavior: "smooth" });
    return;
  }
  if (!reviewText) {
    alert("Please select or write a review before submitting!");
    return;
  }

  // Copy review text to clipboard
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(reviewText).then(() => showToast()).catch(() => legacyCopy(reviewText));
  } else {
    legacyCopy(reviewText);
  }

  // Open Google Maps review page
  setTimeout(() => {
    window.open(GOOGLE_MAPS_REVIEW_URL, "_blank");
  }, 300);

  // Show success
  stepRating.classList.add("hidden");
  stepReviews.classList.add("hidden");
  stepSuccess.classList.remove("hidden");
  stepSuccess.scrollIntoView({ behavior: "smooth", block: "start" });
});

function legacyCopy(text) {
  const ta = document.createElement("textarea");
  ta.value = text;
  ta.style.position = "fixed";
  ta.style.opacity = "0";
  document.body.appendChild(ta);
  ta.select();
  try { document.execCommand("copy"); } catch (_) {}
  document.body.removeChild(ta);
  showToast();
}

function showToast() {
  toast.classList.remove("hidden");
  requestAnimationFrame(() => {
    toast.classList.add("show");
    setTimeout(() => {
      toast.classList.remove("show");
      setTimeout(() => toast.classList.add("hidden"), 400);
    }, 3000);
  });
}

// ── Reset ─────────────────────────────────────────────────────
resetBtn.addEventListener("click", () => {
  selectedRating = 0;
  selectedReviewIndex = -1;
  currentSlide = 0;
  reviews = [];
  highlightStars(0, "selected");
  ratingHint.textContent = "Tap a star to begin";
  carouselTrack.innerHTML = "";
  carouselDots.innerHTML = "";
  customText.value = "";
  stepSuccess.classList.add("hidden");
  stepReviews.classList.add("hidden");
  stepRating.classList.remove("hidden");
  stepRating.scrollIntoView({ behavior: "smooth", block: "start" });
});
