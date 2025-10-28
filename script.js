// === MODERN LOADING + POPUP + PAGE TURN FIXED ===
window.addEventListener("load", () => {
    const loadingScreen = document.querySelector(".loading-screen");
    const popup = document.querySelector(".welcome-popup");
    const openBtn = document.getElementById("openPortfolio");
  
    const pageTurnBtn = document.querySelectorAll(".nextprev-btn");
    const pages = document.querySelectorAll(".book-page.page-right");
    const ContactMeBtn = document.querySelector(".btn.contact-me");
    const backprofileBtn = document.querySelector(".back-profile");
    const coverRight = document.querySelector(".cover.cover-right");
    const coverLeft = document.querySelector(".cover.cover-left");
  
    // ======== LOADING → POPUP SEQUENCE ========
    setTimeout(() => {
      loadingScreen.style.opacity = "0";
      setTimeout(() => {
        loadingScreen.style.display = "none";
        popup.classList.add("active");
      }, 600);
    }, 2000);
  
    // ======== OPEN PORTFOLIO CLICK ========
    openBtn.addEventListener("click", () => {
      popup.classList.remove("active");
  
      // start open-book intro once popup closes
      setTimeout(() => openBookIntro(), 300);
    });
  
    // ======== PAGE TURN BUTTONS ========
    pageTurnBtn.forEach((el, index) => {
      el.onclick = () => {
        const pageTurnId = el.getAttribute("data-page");
        const pageTurn = document.getElementById(pageTurnId);
  
        if (pageTurn.classList.contains("turn")) {
          pageTurn.classList.remove("turn");
          setTimeout(() => {
            pageTurn.style.zIndex = 20 - index;
          }, 500);
        } else {
          pageTurn.classList.add("turn");
          setTimeout(() => {
            pageTurn.style.zIndex = 20 + index;
          }, 500);
        }
      };
    });
  
    // ======== OPEN & CLOSE BOOK ========
    const closeBook = () => {
      coverRight.style.transform = "rotateY(-180deg)";
      setTimeout(() => {
        coverLeft.style.transform = "rotateY(0deg)";
      }, 600);
    };
  
    const openBook = () => {
      coverLeft.style.transform = "rotateY(180deg)";
      setTimeout(() => {
        coverRight.style.transform = "rotateY(0deg)";
      }, 600);
    };
  
    // ======== CONTACT ME BUTTON ========
    if (ContactMeBtn) {
      ContactMeBtn.onclick = () => {
        pages.forEach((page, index) => {
          setTimeout(() => {
            page.classList.add("turn");
            page.style.zIndex = 20 + index;
          }, (index + 1) * 200 + 100);
        });
  
        setTimeout(closeBook, pages.length * 250 + 1000);
  
        // Auto return to profile
        setTimeout(() => {
          openBook();
          pages.forEach((page) => {
            page.classList.remove("turn");
            page.style.zIndex = "";
          });
        }, 5000);
      };
    }
  
    // ======== BACK TO PROFILE ========
    if (backprofileBtn) {
      backprofileBtn.onclick = () => {
        openBook();
        pages.forEach((page, index) => {
          setTimeout(() => {
            page.classList.remove("turn");
            page.style.zIndex = 10 + index;
          }, (index + 1) * 200);
        });
      };
    }
  
    // ======== OPEN BOOK INTRO ANIMATION ========
    function openBookIntro() {
      // Start closed
      coverRight.style.transform = "rotateY(-180deg)";
      coverLeft.style.transform = "rotateY(0deg)";
  
      // All pages closed initially
      pages.forEach((page) => {
        page.classList.add("turn");
        page.style.zIndex = 10;
      });
  
      // Open covers
      setTimeout(() => {
        openBook();
  
        // Flip pages one-by-one
        setTimeout(() => {
          const pagesArray = Array.from(pages).reverse();
          pagesArray.forEach((page, index) => {
            setTimeout(() => {
              page.classList.remove("turn");
              setTimeout(() => {
                const originalIndex = pagesArray.length - index;
                page.style.zIndex = 20 - originalIndex;
              }, 100);
            }, (index + 1) * 300);
          });
        }, 800);
      }, 600);
    }
  });