document.addEventListener('DOMContentLoaded', () => {
  const follower = document.getElementById('mcir');

  document.addEventListener('mousemove', (e) => {
      const x = e.clientX;
      const y = e.clientY;

      follower.style.top = `${y}px`;
      follower.style.left = `${x}px`;
  });
});

function circleChaptaKaro() {
  
  var xscale = 1;
  var yscale = 1;

  var xprev = 0;
  var yprev = 0;

  window.addEventListener("mousemove", function (dets) {
    clearTimeout(timeout);

    xscale = gsap.utils.clamp(0.8, 1.2, dets.clientX - xprev);
    yscale = gsap.utils.clamp(0.8, 1.2, dets.clientY - yprev);

    xprev = dets.clientX;
    yprev = dets.clientY;

    circleMouseFollower(xscale, yscale);

    timeout = setTimeout(function () {
      document.querySelector(
        "#mcir"
      ).style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(1, 1)`;
    }, 100);
  });
}

function circleMouseFollower(xscale, yscale) {
  window.addEventListener("mousemove", function (dets) {
    document.querySelector(
      "#mcir"
    ).style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(${xscale}, ${yscale})`;
  });
}

circleChaptaKaro();
circleMouseFollower();

function anmi(){
  var t1=gsap.timeline();
  t1.from("#nav",{
      y:'-10',
      opacity:0,
      duration:1.5,
      ease: Expo.easeInOut
  })
  
 
  t1.to(".ni",{
    y: 0,
    opacity: 100,
    duration: 1.5,
    delay: -1,
    ease: Expo.easeInOut,
  })
  .from("#herofoot",{
      y:-10,
      opacity: 0,
      duration: 1.5,
      delay: -1,
      ease: Expo.easeInOut,
  });
  
}


// function anmi2(){
//   var t1=gsap.timeline();
//   t1.from("#hrading",{
//       y:'-10',
//       opacity:0,
//       duration:0.5,
//       ease: Expo
//   })
  
  
//   .to("#heading",{
//       y:0,
//       ease:Expo.easeInOut,
//       duration:2
//   })
  
// }

anmi();
anmi2();

document.querySelectorAll(".elem").forEach(function (elem) {
var rotate = 0;
var diffrot = 0;

elem.addEventListener("mouseleave", function (dets) {
  gsap.to(elem.querySelector("img"), {
    opacity: 0,
    ease: Power3,
    duration: 0.5,
  });
});

elem.addEventListener("mousemove", function (dets) {
  var diff = dets.clientY - elem.getBoundingClientRect().top;
  diffrot = dets.clientX - rotate;
  rotate = dets.clientX;
  gsap.to(elem.querySelector("img"), {
    opacity: 1,
    ease: Power3,
    top: diff,
    left: dets.clientX,
    rotate: gsap.utils.clamp(-20, 20, diffrot * 0.5),
  });
});
});





document.getElementById('menuButton').addEventListener('click', function() {
const sidebar = document.getElementById('sidebar');
const sidebarWidth = sidebar.clientWidth;

if (sidebar.style.left === '0px') {
    sidebar.style.left = `-${sidebarWidth}px`;
} else {
    sidebar.style.left = '0px';
}
});

