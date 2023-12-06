const main = document.querySelector("main");
const osu = document.getElementById("osu");
const coding = document.getElementById("coding");
const about = document.getElementById("about");

const mainTitle = document.querySelector(".main-title");

// 나이 계산
document.getElementById("age").innerText = new Date().getFullYear() - 2009;

const pages = {
    osu,
    coding,
    about
};

// 애니메이션 키프레임
// 첫번째는 페이지, 두번째는 메인 페이지 키프레임
const keyframes = {
    osu: [
        [{ left: "-70svw" }, { left: 0 }],
        [{ left: 0 }, { left: "70svw" }]
    ],
    coding: [
        [{ left: "70svw" }, { left: 0 }],
        [{ left: 0 }, { left: "-70svw" }]
    ],
    about: [
        [{ top: "70svh" }, { top: 0 }],
        [{ top: 0 }, { top: "-70svh" }]
    ]
};

// 키프레임에 투명도 옵션 추가
for (let page in keyframes) {
    const pageKeyframes = keyframes[page];

    pageKeyframes[0][0].opacity = pageKeyframes[1][1].opacity = 0;
    pageKeyframes[0][1].opacity = pageKeyframes[1][0].opacity = 1;
}

// 애니메이션 옵션
const options = {
    fill: "forwards",
    duration: 800,
    easing: "cubic-bezier(.1,.65,.35,1)"
};

let activePage, activePageName;

document.querySelectorAll(".page-link").forEach((link) =>
    link.addEventListener("click", () => {
        if (activePage) return;

        activePageName = link.dataset.page;
        activePage = pages[activePageName];

        activePage.style.display = "block";

        activePage.animate(keyframes[activePageName][0], options);
        main.animate(keyframes[activePageName][1], options);

        setTimeout(() => {
            main.style.display = "none";
        }, options.duration);
    })
);

document.querySelectorAll("button").forEach((button) =>
    button.addEventListener("click", () => {
        main.style.display = "flex";

        activePage.animate(keyframes[activePageName][0].toReversed(), options);
        main.animate(keyframes[activePageName][1].toReversed(), options);

        const previousPage = activePage;
        setTimeout(() => (previousPage.style.display = "none"), options.duration);

        activePage = undefined;
        activePageName = undefined;
    })
);

function isTouchDevice() {
    return "ontouchstart" in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
}

if (!isTouchDevice()) {
    window.addEventListener("mousemove", (e) => {
        // 3D rotate effect
        const rotateXAxis = (window.innerHeight / 2 - e.clientY) * (6 / (window.innerHeight / 2));
        const rotateYAxis = (window.innerWidth / 2 - e.clientX) * (-3 / (window.innerWidth / 2));
        (activePage
            ? activePage.querySelector(".content")
            : main.querySelector(".content")
        ).style.transform = `perspective(700px) rotateX(${rotateXAxis}deg) rotateY(${rotateYAxis}deg)`;
    });
}
