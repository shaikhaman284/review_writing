/* =============================================
   Life Pharmacy — Review App
   Place ID: 0x3bd6a5007b718797:0xa7bcf3229361a486
   ============================================= */

const PLACE_ID = "ChIJl4dxewCl1jsRhqRhkyLzvKc";
// Google write-review deep link
const REVIEW_BASE = `https://search.google.com/local/writereview?placeid=${PLACE_ID}`;

// Pre-written reviews per star rating
const REVIEWS = {
  5: [
    "Life Pharmacy is my go-to store! The staff is incredibly knowledgeable and always ready to help. The medicines are always available and the service is super fast. Highly recommended!",
    "Excellent pharmacy with a wide range of medicines. The pharmacist gave me great advice about my medication. Very professional and caring staff.",
    "I've been visiting Life Pharmacy for years and it never disappoints. Genuine medicines, fair prices, and the staff always goes above and beyond to help customers.",
    "Best pharmacy in Amravati! They always have everything in stock and the team is so friendly. The guidance I received about my prescription was truly helpful.",
    "Outstanding service! The pharmacist was very patient in explaining the dosage and side effects of my medicine. Clean store, great stock, and very helpful staff.",
    "Life Pharmacy deserves every star. They helped me find the right medicine quickly when I was in an emergency. Genuinely caring and professional team.",
    "Absolutely love this pharmacy! Competitive prices, genuine products, and a staff that treats you like family. Will always recommend Life Pharmacy to everyone.",
    "Visited Life Pharmacy today and was impressed by the neat arrangement and knowledgeable staff. They suggested a great alternative when my medicine was out of stock elsewhere.",
    "The pharmacist at Life Pharmacy is a gem! So well-informed and helpful. The store is always clean and well-stocked. Truly the best pharmacy experience I've had.",
    "5 stars is not enough for Life Pharmacy! Great service, helpful staff, and very reasonable prices. My entire family relies on this pharmacy for all our medical needs.",
    "Wonderful experience every single time. The staff remembers regular customers and provides personalized service. Life Pharmacy is truly a community treasure.",
    "Quick service, genuine products, and very knowledgeable staff. Life Pharmacy is the best in town — I always feel confident about the medicines I buy here.",
  ],
  4: [
    "Very good pharmacy with helpful staff and a wide selection of medicines. Prices are reasonable and the service is quick. Will definitely come back!",
    "Life Pharmacy has been reliable for my medical needs. Good stock, polite staff, and the pharmacist is knowledgeable. Slightly better waiting times would make it perfect.",
    "Nice pharmacy overall. Staff is friendly and the medicines are always available. The pharmacist gave good advice about my prescription. Recommended!",
    "Good experience at Life Pharmacy. They had everything I needed and the staff was helpful. Will keep coming back for my regular medicines.",
    "Solid pharmacy with good stock and professional staff. The pharmacist was helpful in explaining the dosage. A little more seating would be a nice addition.",
    "Life Pharmacy is dependable and trustworthy. Good prices and genuine medicines. The staff is always polite and ready to assist customers.",
    "Generally very happy with Life Pharmacy. They consistently have the medicines I need and the team is professional. One of the better pharmacies in the area.",
    "Pretty good pharmacy — knowledgeable staff, fair prices, and usually quick service. Would rate 5 stars once the queue management improves a bit.",
    "Life Pharmacy is a reliable option for all medical needs. Good range of products, helpful staff, and competitive pricing. Happy with my experience overall.",
    "Good pharmacy with a friendly team. They take time to answer questions and provide useful advice. Stock is usually good and prices are fair.",
  ],
  3: [
    "Life Pharmacy is decent — medicines are usually available and staff is polite. Sometimes a bit of a wait during busy hours but overall satisfactory.",
    "Average experience at Life Pharmacy. The staff is helpful when available but could improve on response time. Product range is okay for general needs.",
    "Okay pharmacy. They have most common medicines in stock. The pharmacist can be more proactive in providing guidance. Prices are reasonable.",
    "Life Pharmacy is a convenient option for basic medical needs. Stock could be better for specialized medicines but for regular needs it works well.",
    "Decent place overall. Staff is polite and the common medicines are always available. Hope to see improvements in customer service and wait times.",
    "Life Pharmacy serves its purpose for routine needs. Staff is generally helpful. A wider range of products and faster service would enhance the experience.",
    "Satisfactory visit. Got what I needed without too much trouble. The pharmacist was helpful when I asked questions. Could improve on the queuing system.",
    "Reasonable pharmacy for everyday needs. Prices are okay and most medicines are in stock. Customer interaction could be a bit warmer and more proactive.",
    "Life Pharmacy is a reliable enough option nearby. Nothing extraordinary but consistently meets basic requirements. Would appreciate faster service.",
    "Average visit to Life Pharmacy. Got my medicines without issues. Staff is polite. Hoping to see more product variety and improved service speed going forward.",
  ],
  2: [
    "Had a mixed experience at Life Pharmacy. Some medicines were out of stock and the wait was a bit long. Hope the management addresses these issues soon.",
    "A bit disappointed with my recent visit to Life Pharmacy. Stock was limited and the staff seemed overwhelmed. Expect better as a regular customer.",
    "Life Pharmacy needs to work on their inventory management. Couldn't find a common medicine and had to go elsewhere. Staff was polite though.",
    "Not the best experience this time. Long wait times and incomplete stock. Hope this was a one-off situation as the pharmacy has been reliable before.",
    "Somewhat disappointed. Had to wait quite a while and the medicine I needed was not available. The pharmacist was apologetic but availability needs to improve.",
    "Below average experience on my last visit. Limited stock and slow service. I hope the team takes feedback seriously and improves going forward.",
    "Expected better from Life Pharmacy. Medicines out of stock, had to wait too long. Will give another chance hoping it was just a bad day.",
    "Felt let down during my visit. Had to visit another pharmacy to complete my purchase. Staff was okay but inventory and speed need improvement.",
    "Not quite satisfied with my recent experience. Limited availability and long queues were frustrating. Hope to see this improve in the future.",
    "Mediocre visit overall. The stock was insufficient and there were some delays. Life Pharmacy should pay more attention to customer experience.",
  ],
  1: [
    "Very disappointed with my visit to Life Pharmacy. Poor stock management, long wait, and staff didn't seem attentive. Needs significant improvement.",
    "Unfortunately had a bad experience. Couldn't find the medicine I urgently needed and the service was unresponsive. Hope the management takes notice.",
    "Not satisfied at all. Long wait times, out-of-stock medicines, and unhelpful responses from staff. Will think twice before visiting again.",
    "Poor experience. Needed urgent medicine but it was unavailable and staff offered no alternative or guidance. Very disappointing service.",
    "Had a frustrating visit. Stock was low, wait was long, and I left without what I came for. Life Pharmacy needs to seriously review operations.",
    "Really bad service this time. No one was available to help and the medicine wasn't in stock. Felt completely let down. Needs urgent attention.",
    "Worst pharmacy visit I've had. Unhelpful staff, disorganized shelves, and medicine unavailability. Would not recommend until things improve significantly.",
    "Very unhappy with my experience. Had to wait a long time and ultimately couldn't get what I needed. The management needs to address these issues urgently.",
    "Disappointed and frustrated. Basic medicines not available, staff not helpful. Came back without any medicine. Hoping for serious improvement.",
    "Unfortunate experience at Life Pharmacy today. Poor inventory, slow service, and inadequate staff attention. Really expected much better from a pharmacy.",
  ],
};

const RATING_LABELS = {
  1: "😞 Sorry to hear that",
  2: "😕 Could be better",
  3: "😊 Pretty good",
  4: "😄 Really good!",
  5: "🤩 Amazing!",
};

// ---- State ----
let currentRating = 0;
let selectedReviewText = "";
let currentCardIndex = 0;

// ---- DOM refs ----
const stepRating   = document.getElementById("step-rating");
const stepReview   = document.getElementById("step-review");
const stepSubmit   = document.getElementById("step-submit");
const stepSuccess  = document.getElementById("step-success");
const starsRow     = document.getElementById("starsRow");
const ratingLabel  = document.getElementById("ratingLabel");
const carousel     = document.getElementById("carousel");
const carouselDots = document.getElementById("carouselDots");
const customReview = document.getElementById("customReview");
const reviewPreview= document.getElementById("reviewPreview");
const btnBack      = document.getElementById("btnBack");
const btnNext      = document.getElementById("btnNext");
const btnSubmit    = document.getElementById("btnSubmit");
const btnAnother   = document.getElementById("btnAnother");
const navBtns      = document.getElementById("navBtns");

// ---- Steps ----
let currentStep = 1; // 1: rating, 2: review, 3: submit

function showStep(step) {
  currentStep = step;
  stepRating.classList.toggle("hidden", step !== 1);
  stepReview.classList.toggle("hidden", step !== 2);
  stepSubmit.classList.toggle("hidden", step !== 3);
  stepSuccess.classList.toggle("hidden", step !== 4);

  btnBack.classList.toggle("hidden", step <= 1 || step === 4);
  btnNext.classList.toggle("hidden", step >= 3 || step === 4);
  navBtns.style.display = (step === 4) ? "none" : "flex";

  // Update next btn label
  if (step === 2) btnNext.textContent = "Review Ready →";
  if (step === 1) btnNext.textContent = "Continue →";

  // Scroll to top
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// ---- Star rating ----
starsRow.querySelectorAll(".star").forEach(star => {
  star.addEventListener("click", () => {
    const val = parseInt(star.dataset.val);
    setRating(val);
    star.classList.add("pulse");
    setTimeout(() => star.classList.remove("pulse"), 400);

    // Auto-advance after short delay
    setTimeout(() => {
      buildCarousel(val);
      showStep(2);
    }, 500);
  });
});

function setRating(val) {
  currentRating = val;
  starsRow.querySelectorAll(".star").forEach(s => {
    s.classList.toggle("active", parseInt(s.dataset.val) <= val);
  });
  ratingLabel.textContent = RATING_LABELS[val] || "—";
}

// ---- Carousel ----
function buildCarousel(rating) {
  const reviews = REVIEWS[rating] || REVIEWS[5];
  carousel.innerHTML = "";
  carouselDots.innerHTML = "";
  selectedReviewText = "";
  currentCardIndex = 0;

  reviews.forEach((text, i) => {
    // Card
    const card = document.createElement("div");
    card.className = "review-card";
    card.innerHTML = `
      <div class="rc-stars">${"★".repeat(rating)}${"☆".repeat(5 - rating)}</div>
      <p>${text}</p>
      <div class="check-badge">✓</div>
    `;
    card.addEventListener("click", () => selectReview(card, text));
    carousel.appendChild(card);

    // Dot
    const dot = document.createElement("div");
    dot.className = "dot" + (i === 0 ? " active" : "");
    carouselDots.appendChild(dot);
  });

  // Track scroll for dots
  carousel.addEventListener("scroll", onCarouselScroll, { passive: true });
}

function onCarouselScroll() {
  const cards = carousel.querySelectorAll(".review-card");
  const scrollLeft = carousel.scrollLeft;
  const cardWidth = cards[0]?.offsetWidth + 12 || 1;
  const index = Math.round(scrollLeft / cardWidth);
  if (index !== currentCardIndex) {
    currentCardIndex = index;
    carouselDots.querySelectorAll(".dot").forEach((d, i) => {
      d.classList.toggle("active", i === index);
    });
  }
}

function selectReview(card, text) {
  carousel.querySelectorAll(".review-card").forEach(c => c.classList.remove("selected"));
  card.classList.add("selected");
  selectedReviewText = text;
  customReview.value = "";
}

// ---- Nav ----
btnNext.addEventListener("click", () => {
  if (currentStep === 1) {
    if (!currentRating) { showToast("Please select a star rating first!"); return; }
    buildCarousel(currentRating);
    showStep(2);
  } else if (currentStep === 2) {
    const finalText = customReview.value.trim() || selectedReviewText;
    if (!finalText) { showToast("Please select or write a review!"); return; }
    selectedReviewText = finalText;
    buildSubmitStep();
    showStep(3);
  }
});

btnBack.addEventListener("click", () => {
  if (currentStep === 2) showStep(1);
  else if (currentStep === 3) showStep(2);
});

// ---- Submit ----
function buildSubmitStep() {
  reviewPreview.textContent = selectedReviewText;
}

btnSubmit.addEventListener("click", async () => {
  const text = selectedReviewText;
  if (!text) return;

  // Copy to clipboard
  try {
    await navigator.clipboard.writeText(text);
    showToast("✓ Review copied! Paste it on Google.");
  } catch {
    // Fallback
    fallbackCopy(text);
  }

  // Change button state
  btnSubmit.classList.add("copied");
  btnSubmit.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M9 12l2 2 4-4"/><circle cx="12" cy="12" r="10"/></svg> Opening Google Maps…`;
  btnSubmit.disabled = true;

  // Open Google review page after short delay
  setTimeout(() => {
    window.open(REVIEW_BASE, "_blank");
    showStep(4);
    // Reset button for potential next use
    setTimeout(() => {
      btnSubmit.classList.remove("copied");
      btnSubmit.disabled = false;
      btnSubmit.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M9 12l2 2 4-4"/><circle cx="12" cy="12" r="10"/></svg> Copy & Open Google Maps`;
    }, 2000);
  }, 800);
});

function fallbackCopy(text) {
  const ta = document.createElement("textarea");
  ta.value = text;
  ta.style.cssText = "position:fixed;opacity:0;pointer-events:none";
  document.body.appendChild(ta);
  ta.select();
  try { document.execCommand("copy"); showToast("✓ Review copied!"); }
  catch { showToast("Please copy the review text manually."); }
  document.body.removeChild(ta);
}

// ---- Reset ----
btnAnother.addEventListener("click", () => {
  currentRating = 0;
  selectedReviewText = "";
  starsRow.querySelectorAll(".star").forEach(s => s.classList.remove("active"));
  ratingLabel.textContent = "—";
  customReview.value = "";
  showStep(1);
});

// ---- Toast ----
let toastTimer;
function showToast(msg) {
  let toast = document.getElementById("appToast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "appToast";
    toast.className = "toast";
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2800);
}

// ---- Init ----
showStep(1);
