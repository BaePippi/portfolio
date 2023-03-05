(function () {
  ("use strict");

  // marker
  const $marker = document.querySelector(".marker");

  function setMarker(e) {
    $marker.style.left = e.offsetLeft + "px";
    $marker.style.width = e.offsetWidth + "px";
  }

  // header-nav
  const $section = document.querySelectorAll("section");
  const $headerNavItem = document.querySelectorAll(".header-nav-item");

  window.addEventListener("scroll", () => {
    let current = "";

    $section.forEach((section) => {
      const sectionTop =
        window.pageYOffset + section.getBoundingClientRect().top;
      if (window.pageYOffset >= sectionTop) {
        current = section.getAttribute("id");
      }

      $headerNavItem.forEach((menu) => {
        menu.classList.remove("text-orange");
        const href = menu.getAttribute("href").substring(1);
        if (href === current) {
          menu.classList.add("text-orange");
          setMarker(menu);
        }
      });
    });
  });

  const $header = document.querySelector(".header");
  // window 스크롤 처리
  window.addEventListener("scroll", () => {
    let scT = window.document.documentElement.scrollTop;
    // 조금이라도 스크롤을 했다면 처리한다.
    if (scT > 100) {
      $header.classList.add("active");
      $headerNavItem.forEach((item) => {
        item.classList.add("active");
      });
      //   $mbBtSpan.forEach((item) => {
      //     item.classList.add("active");
      //   });
    } else {
      $header.classList.remove("active");
      $headerNavItem.forEach((item) => {
        item.classList.remove("active");
      });
      //   $mbBtSpan.forEach((item) => {
      //     item.classList.remove("active");
      //   });
    }
  });

  // 화면 reload 시 처리
  let scT = window.document.documentElement.scrollTop;
  if (scT > 100) {
    $header.classList.add("active");
    $headerNavItem.forEach((item) => {
      item.classList.add("active");
    });
    // $mbBtSpan.forEach((item) => {
    //   item.classList.add("active");
    // });
  }

  //   skill countUp animation
  const $skill = document.querySelector(".skill");
  const $count = document.querySelectorAll(".count");
  const max = [98, 90, 90, 70, 85, 95, 90, 85];

  new Waypoint({
    element: $skill,
    handler: function (dir) {
      for (let i = 0; i < 8; i++) {
        counter($count[i], max[i]);
      }
    },
    offset: "50%",
  });

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

  //   possibility 차트
  const $possibility = document.querySelector(".possibility");
  const ctx = document.getElementById("myChart");

  new Waypoint({
    element: $possibility,
    handler:  function(dir){
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
                labels: {
                  fontSize: 60,
                },
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
                    size: 30,
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
    },
    offset: "30%"
  });

 
})();
