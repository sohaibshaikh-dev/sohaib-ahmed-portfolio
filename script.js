// === MODERN LOADING + POPUP + PAGE TURN + MOBILE SLIDER (FINAL CLEAN VERSION) ===

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

  /* ===========================
        LOADING → POPUP
  ============================ */
  setTimeout(() => {
    loadingScreen.style.opacity = "0";
    setTimeout(() => {
      loadingScreen.style.display = "none";
      popup.classList.add("active");
    }, 600);
  }, 2000);

  /* ===========================
        OPEN PORTFOLIO CLICK
  ============================ */
  openBtn.addEventListener("click", () => {
    popup.classList.remove("active");
    setTimeout(() => openBookIntro(), 300);
  });

  /* ===========================
        PAGE TURN BUTTONS
  ============================ */
  pageTurnBtn.forEach((el, index) => {
    el.onclick = () => {
      const pageTurnId = el.getAttribute("data-page");
      const pageTurn = document.getElementById(pageTurnId);
      if (!pageTurn) return;

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

  /* ===========================
        OPEN / CLOSE BOOK
  ============================ */
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

  /* ===========================
        CONTACT ME BUTTON
  ============================ */
  if (ContactMeBtn) {
    ContactMeBtn.onclick = () => {
      pages.forEach((page, index) => {
        setTimeout(() => {
          page.classList.add("turn");
          page.style.zIndex = 20 + index;
        }, (index + 1) * 200 + 100);
      });

      setTimeout(closeBook, pages.length * 250 + 1000);

      // Auto return to profile after 5 sec
      setTimeout(() => {
        openBook();
        pages.forEach((page) => {
          page.classList.remove("turn");
          page.style.zIndex = "";
        });
      }, 5000);
    };
  }

  /* ===========================
        BACK TO PROFILE
  ============================ */
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

  /* ===========================
        BOOK INTRO ANIMATION
  ============================ */
  function openBookIntro() {
    coverRight.style.transform = "rotateY(-180deg)";
    coverLeft.style.transform = "rotateY(0deg)";

    pages.forEach(page => {
      page.classList.add("turn");
      page.style.zIndex = 10;
    });

    setTimeout(() => {
      openBook();
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

  /* ===========================
       MOBILE VIEW HANDLING
  ============================ */
  function handleMobileView() {
    if (window.innerWidth <= 768) {
      // Hide desktop book
      document.querySelector(".desktop-view")?.style.setProperty("display", "none", "important");
      document.querySelector(".mobile-view")?.style.setProperty("display", "block", "important");

      // Show loading & popup
      loadingScreen.style.display = "flex";
      popup.style.display = "flex";

      // Re-run loading → popup
      setTimeout(() => {
        loadingScreen.style.opacity = "0";
        setTimeout(() => {
          loadingScreen.style.display = "none";
          popup.classList.add("active");
        }, 600);
      }, 2000);

      // Mobile slider
      const mobilePages = document.querySelectorAll('.mobile-page');
      const nextBtn = document.getElementById('mobileNext');
      const backBtn = document.getElementById('mobileBack');
      const contactBtn = document.querySelector('.contact-me-mobile');
      const pageNumber = document.querySelector('.mobile-page-number');
      let current = 0;

      const showPage = (i) => {
        mobilePages.forEach((p, idx) => {
          p.classList.toggle('active', idx === i);
          p.classList.toggle('prev', idx < i);
        });
        if (pageNumber) pageNumber.textContent = `${i + 1} / ${mobilePages.length}`;
      };

      nextBtn.onclick = () => { if (current < mobilePages.length - 1) { current++; showPage(current); } };
      backBtn.onclick = () => { if (current > 0) { current--; showPage(current); } };
      if (contactBtn) contactBtn.onclick = () => { current = mobilePages.length - 1; showPage(current); };

      showPage(0);
    }
  }

  // Run on load & resize
  handleMobileView();
  window.addEventListener("resize", handleMobileView);
});