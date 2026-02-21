/* ─────────────────────────────────────────────────
   AUTH GUARD — runs first, before everything else
   Protects Index.html and questionnaire.html
───────────────────────────────────────────────── */
(function () {
  const protectedPages = ['Index.html', 'questionnaire.html', 'welcome.html'];

  // Works for both file:// and http:// protocols
  const fullPath    = window.location.pathname;
  const filename    = fullPath.split('/').pop() || fullPath.split('\').pop(); // Handle Windows backslash paths
  const currentPage = filename || '';

  const isLoggedIn  = sessionStorage.getItem('userName');

  if (protectedPages.some(function(p) { return currentPage.includes(p); }) && !isLoggedIn) {
    window.location.replace('login.html');
  }
})();


/* ═══════════════════════════════════════════════════
   HEALTH COMPANION — app.js
   Sections:
   1. SOS Emergency Button
   2. Prescription Toggle (Collapse / Expand)
   3. Mark as Taken
   4. Questionnaire Form Submission
═══════════════════════════════════════════════════ */


/* ─────────────────────────────────────────────────
   1. SOS EMERGENCY BUTTON
   - Click SOS → modal appears asking to confirm
   - Confirm → status message shows, button turns green
   - Cancel or click backdrop → modal closes
   - Escape key → modal closes
───────────────────────────────────────────────── */

const sosBtn       = document.getElementById('sosBtn');
const modalOverlay = document.getElementById('modalOverlay');
const confirmBtn   = document.getElementById('confirmBtn');
const cancelBtn    = document.getElementById('cancelBtn');
const sosStatus    = document.getElementById('sos-status');

// Only run SOS logic if these elements exist on the page
if (sosBtn && modalOverlay) {

  // Open modal when SOS is clicked
  sosBtn.addEventListener('click', function () {
    modalOverlay.classList.add('active');
  });

  // Close modal on Cancel
  cancelBtn.addEventListener('click', function () {
    modalOverlay.classList.remove('active');
  });

  // Close modal when clicking the dark backdrop
  modalOverlay.addEventListener('click', function (e) {
    if (e.target === modalOverlay) {
      modalOverlay.classList.remove('active');
    }
  });

  // Close modal on Escape key
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      modalOverlay.classList.remove('active');
    }
  });

  // Confirm alert — get location then send emergency alert
  confirmBtn.addEventListener('click', function () {
    modalOverlay.classList.remove('active');
    getLocationAndSendAlert();
  });

}


/* ─────────────────────────────────────────────────
   2. PRESCRIPTION TOGGLE — COLLAPSE / EXPAND
   - Button toggles the prescription list visibility
   - Arrow icon and label flip with each click
───────────────────────────────────────────────── */

const toggleBtn      = document.getElementById('togglePrescriptions');
const prescriptionList = document.getElementById('prescriptionList');

if (toggleBtn && prescriptionList) {

  toggleBtn.addEventListener('click', function () {
    const isCollapsed = prescriptionList.classList.contains('collapsed');

    if (isCollapsed) {
      // Expand
      prescriptionList.classList.remove('collapsed');
      toggleBtn.innerHTML = '&#9650; Collapse';
    } else {
      // Collapse
      prescriptionList.classList.add('collapsed');
      toggleBtn.innerHTML = '&#9660; Expand';
    }
  });

}


/* ─────────────────────────────────────────────────
   3. MARK AS TAKEN
   - Each prescription card has a "Mark as Taken" button
   - Clicking it marks the card as done visually
   - Button becomes disabled so it can't be clicked twice
───────────────────────────────────────────────── */

const markTakenBtns = document.querySelectorAll('.mark-taken-btn');

markTakenBtns.forEach(function (btn) {
  btn.addEventListener('click', function () {
    const card = btn.closest('.prescription-card');

    // Visual feedback on the card
    card.style.borderLeft  = '4px solid #2d9e5f';
    card.style.background  = '#f0fdf4';

    // Update button
    btn.textContent  = '✓ Taken';
    btn.disabled     = true;
    btn.style.background = '#2d9e5f';
    btn.style.cursor = 'default';
  });
});


/* ─────────────────────────────────────────────────
   4. QUESTIONNAIRE FORM SUBMISSION
   - Validates that all questions are answered
   - Shows inline error if something is missed
   - On success: hides form, shows success message
───────────────────────────────────────────────── */

const healthForm = document.getElementById('healthForm');
const successMsg = document.getElementById('successMsg');

if (healthForm && successMsg) {

  healthForm.addEventListener('submit', function (e) {
    e.preventDefault(); // Stop page from reloading

    // Clear any previous error messages
    clearErrors();

    // Grab all values
    const pain       = document.querySelector('input[name="pain"]:checked');
    const mood       = document.querySelector('input[name="mood"]:checked');
    const sleep      = document.querySelector('input[name="sleep"]:checked');
    const energy     = document.querySelector('input[name="energy"]:checked');
    const symptoms   = document.getElementById('symptoms').value.trim();
    const medication = document.querySelector('input[name="medication"]:checked');

    // Validate — all fields required
    let hasError = false;

    if (!pain)       { showError('pain-error',       'Please select a pain level.');         hasError = true; }
    if (!mood)       { showError('mood-error',        'Please select your mood.');            hasError = true; }
    if (!sleep)      { showError('sleep-error',       'Please select your sleep quality.');   hasError = true; }
    if (!energy)     { showError('energy-error',      'Please select your energy level.');    hasError = true; }
    if (!symptoms)   { showError('symptoms-error',    'Please describe any symptoms or type "none".');  hasError = true; }
    if (!medication) { showError('medication-error',  'Please select a medication option.');  hasError = true; }

    if (hasError) return; // Stop here if validation failed

    // All good — simulate form submission
    const submitBtn = document.getElementById('submitBtn');
    submitBtn.textContent = 'Submitting...';
    submitBtn.disabled = true;

    setTimeout(function () {
      // Hide form, show success message
      healthForm.style.display = 'none';
      successMsg.style.display = 'block';

      // Scroll to top of success message
      successMsg.scrollIntoView({ behavior: 'smooth' });
    }, 1200);

  });

}

// Helper: show an error message below a form group
function showError(id, message) {
  // Check if error element already exists
  let existing = document.getElementById(id);
  if (existing) return;

  const error = document.createElement('p');
  error.id = id;
  error.className = 'form-error';
  error.textContent = message;

  // Find the right form group to append it to
  // The id prefix matches the input name e.g. 'pain-error' → name="pain"
  const fieldName = id.replace('-error', '');
  const field = document.querySelector(
    `input[name="${fieldName}"], textarea[name="${fieldName}"]`
  );

  if (field) {
    // Walk up to the .form-group and append error there
    const group = field.closest('.form-group');
    if (group) group.appendChild(error);
  }
}

// Helper: remove all error messages
function clearErrors() {
  document.querySelectorAll('.form-error').forEach(function (el) {
    el.remove();
  });
}


/* ─────────────────────────────────────────────────
   5. HAMBURGER MENU (mobile nav toggle)
───────────────────────────────────────────────── */
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');

if (hamburger && navLinks) {
  hamburger.addEventListener('click', function () {
    hamburger.classList.toggle('open');
    navLinks.classList.toggle('open');
  });

  // Close menu when a nav link is clicked
  navLinks.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      hamburger.classList.remove('open');
      navLinks.classList.remove('open');
    });
  });
}


/* ═══════════════════════════════════════════════════
   AUTH — Login, Signup, Welcome
═══════════════════════════════════════════════════ */

/* ─────────────────────────────────────────────────
   POPULATE AGE DROPDOWN (18 to 110)
───────────────────────────────────────────────── */
const ageSelect = document.getElementById('signupAge');
if (ageSelect) {
  for (let i = 1; i <= 110; i++) {
    const option = document.createElement('option');
    option.value = i;
    option.textContent = i + ' years old';
    ageSelect.appendChild(option);
  }
}


/* ─────────────────────────────────────────────────
   SHOW / HIDE PASSWORD TOGGLE
───────────────────────────────────────────────── */
document.querySelectorAll('.toggle-password').forEach(function (btn) {
  btn.addEventListener('click', function () {
    const targetId = btn.getAttribute('data-target');
    const input    = document.getElementById(targetId);
    if (!input) return;

    if (input.type === 'password') {
      input.type = 'text';
      btn.textContent = '🙈';
    } else {
      input.type = 'password';
      btn.textContent = '👁';
    }
  });
});


/* ─────────────────────────────────────────────────
   HELPER — set / clear field errors
───────────────────────────────────────────────── */
function setAuthError(id, message) {
  const el = document.getElementById(id);
  if (el) el.textContent = message;
}

function clearAuthErrors(ids) {
  ids.forEach(function (id) { setAuthError(id, ''); });
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}


/* ─────────────────────────────────────────────────
   LOGIN FORM
───────────────────────────────────────────────── */
const loginForm = document.getElementById('loginForm');

if (loginForm) {
  loginForm.addEventListener('submit', function (e) {
    e.preventDefault();

    clearAuthErrors(['loginEmailError', 'loginPasswordError']);

    const email    = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value;
    let   valid    = true;

    if (!email) {
      setAuthError('loginEmailError', 'Email is required.');
      valid = false;
    } else if (!isValidEmail(email)) {
      setAuthError('loginEmailError', 'Please enter a valid email address.');
      valid = false;
    }

    if (!password) {
      setAuthError('loginPasswordError', 'Password is required.');
      valid = false;
    }

    if (!valid) return;

    // Simulate login — replace with real API call later
    const btn = document.getElementById('loginBtn');
    btn.textContent = 'Logging in...';
    btn.disabled    = true;

    setTimeout(function () {
      // Store name for welcome page (using sessionStorage)
      sessionStorage.setItem('userName', email.split('@')[0]);
      window.location.href = 'welcome.html';
    }, 1500);
  });
}


/* ─────────────────────────────────────────────────
   SIGNUP FORM
───────────────────────────────────────────────── */
const signupForm = document.getElementById('signupForm');

if (signupForm) {
  signupForm.addEventListener('submit', function (e) {
    e.preventDefault();

    clearAuthErrors([
      'signupNameError', 'signupEmailError', 'signupPhoneError',
      'signupAgeError',  'signupGenderError', 'signupAddressError',
      'signupPasswordError', 'signupConfirmError'
    ]);

    const name     = document.getElementById('signupName').value.trim();
    const email    = document.getElementById('signupEmail').value.trim();
    const phone    = document.getElementById('signupPhone').value.trim();
    const age      = document.getElementById('signupAge').value;
    const gender   = document.getElementById('signupGender').value;
    const address  = document.getElementById('signupAddress').value.trim();
    const password = document.getElementById('signupPassword').value;
    const confirm  = document.getElementById('signupConfirm').value;
    let   valid    = true;

    if (!name) {
      setAuthError('signupNameError', 'Full name is required.'); valid = false;
    }

    if (!email) {
      setAuthError('signupEmailError', 'Email is required.'); valid = false;
    } else if (!isValidEmail(email)) {
      setAuthError('signupEmailError', 'Please enter a valid email address.'); valid = false;
    }

    if (!phone) {
      setAuthError('signupPhoneError', 'Phone number is required.'); valid = false;
    } else if (!/^\d{6,15}$/.test(phone.replace(/\s/g, ''))) {
      setAuthError('signupPhoneError', 'Please enter a valid phone number.'); valid = false;
    }

    if (!age) {
      setAuthError('signupAgeError', 'Please select your age.'); valid = false;
    }

    if (!gender) {
      setAuthError('signupGenderError', 'Please select your gender.'); valid = false;
    }

    if (!address) {
      setAuthError('signupAddressError', 'Address is required.'); valid = false;
    }

    if (!password) {
      setAuthError('signupPasswordError', 'Password is required.'); valid = false;
    } else if (password.length < 8) {
      setAuthError('signupPasswordError', 'Password must be at least 8 characters.'); valid = false;
    }

    if (!confirm) {
      setAuthError('signupConfirmError', 'Please confirm your password.'); valid = false;
    } else if (password !== confirm) {
      setAuthError('signupConfirmError', 'Passwords do not match.'); valid = false;
    }

    if (!valid) return;

    // Simulate account creation — replace with real API call later
    const btn = document.getElementById('signupBtn');
    btn.textContent = 'Creating account...';
    btn.disabled    = true;

    setTimeout(function () {
      // Store first name for welcome page
      sessionStorage.setItem('userName', name.split(' ')[0]);
      window.location.href = 'welcome.html';
    }, 1500);
  });
}


/* ─────────────────────────────────────────────────
   WELCOME PAGE — personalise greeting
───────────────────────────────────────────────── */
const welcomeName = document.getElementById('welcomeName');

if (welcomeName) {
  const name = sessionStorage.getItem('userName');
  if (name) {
    welcomeName.textContent = ', ' + name;
  }
}



/* ─────────────────────────────────────────────────
   GEOLOCATION — SOS LOCATION TRACKING
   - Only triggers when SOS confirm button is pressed
   - Grabs coordinates and reverse geocodes to address
   - Includes location in the emergency alert
───────────────────────────────────────────────── */

function getLocationAndSendAlert() {
  const sosStatus = document.getElementById('sos-status');
  const sosBtn    = document.getElementById('sosBtn');

  // Step 1 — update UI to show we're working
  sosStatus.textContent = '📍 Getting your location...';
  sosBtn.disabled       = true;
  sosBtn.style.background = '#999';
  sosBtn.style.animation  = 'none';
  sosBtn.textContent      = '...';

  // Step 2 — check if browser supports geolocation
  if (!navigator.geolocation) {
    sendAlertWithLocation('Location unavailable');
    return;
  }

  // Step 3 — request location from browser
  navigator.geolocation.getCurrentPosition(
    // SUCCESS — got coordinates
    function (position) {
      const lat = position.coords.latitude.toFixed(5);
      const lng = position.coords.longitude.toFixed(5);

      sosStatus.textContent = '📍 Location found. Sending alert...';

      // Try to reverse geocode using a free API
      fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`)
        .then(function (res) { return res.json(); })
        .then(function (data) {
          const address = data.display_name || `${lat}, ${lng}`;
          sendAlertWithLocation(address, lat, lng);
        })
        .catch(function () {
          // If reverse geocode fails, just use raw coordinates
          sendAlertWithLocation(`${lat}, ${lng}`, lat, lng);
        });
    },

    // ERROR — user denied or location unavailable
    function (error) {
      let reason = 'Location unavailable';
      if (error.code === error.PERMISSION_DENIED) {
        reason = 'Location access denied by user';
      } else if (error.code === error.POSITION_UNAVAILABLE) {
        reason = 'Location signal unavailable';
      } else if (error.code === error.TIMEOUT) {
        reason = 'Location request timed out';
      }
      sendAlertWithLocation(reason);
    },

    // OPTIONS
    {
      enableHighAccuracy: true,   // use GPS if available
      timeout: 8000,              // give up after 8 seconds
      maximumAge: 0               // always get fresh location
    }
  );
}


function sendAlertWithLocation(locationString, lat, lng) {
  const sosStatus = document.getElementById('sos-status');
  const sosBtn    = document.getElementById('sosBtn');

  // Build the alert payload (would go to a real API later)
  const alertPayload = {
    timestamp:  new Date().toISOString(),
    user:       sessionStorage.getItem('userName') || 'Unknown user',
    location:   locationString,
    latitude:   lat  || null,
    longitude:  lng  || null,
    message:    'EMERGENCY — immediate medical assistance required'
  };

  // Log to console so you can see it working during development
  console.log('🚨 Emergency Alert Payload:', alertPayload);

  // Simulate sending to backend (replace with real fetch/API call)
  setTimeout(function () {
    sosStatus.innerHTML =
      '✅ Alert sent. Help is on the way.<br/>' +
      '<small style="color:var(--text-muted)">📍 ' + locationString + '</small>';

    sosBtn.style.background = '#2d9e5f';
    sosBtn.style.animation  = 'none';
    sosBtn.textContent      = '✓';

    // Reset after 8 seconds
    setTimeout(function () {
      sosBtn.disabled         = false;
      sosBtn.style.background = '';
      sosBtn.style.animation  = '';
      sosBtn.textContent      = 'SOS';
      sosStatus.textContent   = '';
    }, 8000);

  }, 1000);
}