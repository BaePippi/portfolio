(function () {
  ("use strict");

  let mainSwiper = new Swiper(".mainSwiper", {
    direction: "vertical",
    slidesPerView: 1,
    mousewheel: {
      sensitivity: 90,
    },
    pagination: {
      el: ".main-swiper-pagination",
      clickable: true,
    },
  });

  const $header = document.querySelector(".header");
  const $skill = document.querySelector(".skill");
  const $count = document.querySelectorAll(".count");
  const max = [98, 90, 90, 70, 85, 95, 90, 85];
  const $possibility = document.querySelector(".possibility");
  const ctx = document.getElementById("myChart");
  // marker
  const $marker = document.querySelector(".marker");

  function setMarker(e) {
    $marker.style.left = e.offsetLeft + "px";
    $marker.style.width = e.offsetWidth + "px";
  }

  // header-nav
  const $section = document.querySelectorAll("section");
  const $headerNavItem = document.querySelectorAll(".header-nav-item");
  let current = "";
  mainSwiper.on("slideChange", function () {
    current = mainSwiper.realIndex;
    $headerNavItem.forEach((menu) => {
      const index = parseInt(menu.getAttribute("id"));
      menu.classList.remove("text-orange");
      if (current === index) {
        console.log(index);
        menu.classList.add("text-orange");
        setMarker(menu);
      }
    });
    // nav 애니메이션
    if (current === 0) {
      $header.classList.remove("active");
      $headerNavItem.forEach((item) => {
        item.classList.remove("active");
      });
    } else {
      $header.classList.add("active");
      $headerNavItem.forEach((item) => {
        item.classList.add("active");
      });
    }
    //   skill countUp animation
    if (current === 2) {
      for (let i = 0; i < 8; i++) {
        counter($count[i], max[i]);
      }

      function counter($count, max) {
        let now = max;
        const handle = setInterval(() => {
          $count.innerHTML = Math.ceil(max - now);
          if (now < 1) {
            clearInterval(handle);
          }
          const step = now / 10;

          now -= step;
        }, 50);
      }
    }
    //   possibility 차트
    if (current === 3) {
      new Chart(ctx, {
        type: "radar",
        data: {
          labels: [
            "창의성",
            "전문역량",
            "열정&도전정신",
            "책임감&성실성",
            "커뮤니케이션",
            "팀워크",
          ],
          datasets: [
            {
              label: "",
              data: [80, 85, 100, 95, 95, 95],
              borderWidth: 5,
              fill: true,
              backgroundColor: "#ff7d203f",
              borderColor: "#ff7e20",
              pointBackgroundColor: "#ff7e20",
              pointBorderColor: "#ff7d203f",
              pointHoverBackgroundColor: "#fff",
              pointHoverBorderColor: "#ff7e20",
            },
          ],
        },
        options: {
          plugins: {
            datalabels: {
              align: "top",
            },
            legend: {
              display: false,
            },
          },
          scales: {
            r: {
              ticks: {
                display: false,
              },
              beginAtZero: true,
              pointLabels: {
                font: {
                  size: 20,
                  weight: "700",
                },
              },
            },
          },
          animation: {
            duration: 2000,
            easing: "easeInOutCubic",
          },
        },
      });
    }
  });

  //  portfolio 스와이퍼
  let swiper = new Swiper(".portfolioSwiper", {
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: "auto",
    coverflowEffect: {
      rotate: 50,
      stretch: 0,
      depth: 100,
      modifier: 1,
      slideShadows: true,
    },
    pagination: {
      el: ".swiper-pagination",
    },
  });
})();
