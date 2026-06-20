// Birthday page scripts

// ===========================================================
// SOFT CONFETTI/BUBBLE PARTICLE BACKGROUND
// ===========================================================
(function initParticles() {
  const canvas = document.getElementById('particle-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let w, h;
  const particles = [];
  const particleCount = 45;

  function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  const colors = [
    '255, 105, 180',  // hot pink
    '255, 182, 193',  // light pink
    '186, 85, 211',   // medium orchid
    '127, 206, 248',  // sky blue
    '255, 223, 186'   // warm yellow
  ];

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * w,
      y: Math.random() * h,
      radius: 2 + Math.random() * 4,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      alpha: 0.15 + Math.random() * 0.35,
      color: colors[Math.floor(Math.random() * colors.length)]
    });
  }

  function drawParticles() {
    ctx.clearRect(0, 0, w, h);

    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < -10) p.x = w + 10;
      if (p.x > w + 10) p.x = -10;
      if (p.y < -10) p.y = h + 10;
      if (p.y > h + 10) p.y = -10;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${p.color}, ${p.alpha})`;
      ctx.fill();
    });

    requestAnimationFrame(drawParticles);
  }

  drawParticles();
})();

// ===========================================================
// MUSIC & TIMELINE TRIGGER
// ===========================================================
window.addEventListener("load", () => {
  Swal.fire({
    title: "Do you want to play music in the background?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes",
    cancelButtonText: "No",
  }).then((result) => {
    if (result.isConfirmed) {
      document.querySelector(".song").play().catch(() => {});
      animationTimeline();
    } else {
      animationTimeline();
    }
  });
});

// ===========================================================
// ANIMATION TIMELINE
// ===========================================================
const animationTimeline = () => {
  // split chars that needs to be animated individually
  const textBoxChars = document.getElementsByClassName("hbd-chatbox")[0];
  const hbd = document.getElementsByClassName("wish-hbd")[0];

  textBoxChars.innerHTML = `<span>${textBoxChars.innerHTML
    .split("")
    .join("</span><span>")}</span>`;

  hbd.innerHTML = `<span>${hbd.innerHTML
    .split("")
    .join("</span><span>")}</span>`;

  const ideaTextTrans = {
    opacity: 0,
    y: -20,
    rotationX: 5,
    skewX: "15deg",
  };

  const ideaTextTransLeave = {
    opacity: 0,
    y: 20,
    rotationY: 5,
    skewY: "-15deg",
  };

  // GSAP Timeline Max Compatibility
  const tl = gsap.timeline();

  // Pre-initialize balloons off-screen so they are hidden at the start
  gsap.set(".ballons img", { opacity: 0, y: 1400 });

  tl.to(".container", {
    duration: 0.6,
    visibility: "visible",
  })
    .from(".one", {
      duration: 0.8,
      opacity: 0,
      y: 20,
      ease: "power2.out"
    })
    .from(".two", {
      duration: 0.5,
      opacity: 0,
      y: 15,
      ease: "power2.out"
    }, "-=0.2")
    .to(".one", {
      duration: 0.7,
      opacity: 0,
      y: -20,
      ease: "power2.in"
    }, "+=3.5")
    .to(".two", {
      duration: 0.7,
      opacity: 0,
      y: -20,
      ease: "power2.in"
    }, "-=0.7")
    .from(".three", {
      duration: 0.8,
      opacity: 0,
      y: 20,
      ease: "power2.out"
    })
    .to(".three", {
      duration: 0.7,
      opacity: 0,
      y: -20,
      ease: "power2.in"
    }, "+=3")
    .from(".four", {
      duration: 0.8,
      scale: 0.8,
      opacity: 0,
      ease: "back.out(1.5)"
    })
    .from(".fake-btn", {
      duration: 0.4,
      scale: 0.8,
      opacity: 0,
      ease: "back.out(1.5)"
    }, "-=0.2")
    .to(".hbd-chatbox span", {
      duration: 0.05,
      visibility: "visible",
      stagger: 0.03
    })
    .to(".fake-btn", {
      duration: 0.2,
      backgroundColor: "rgb(127, 206, 248)",
    }, "+=4")
    .to(".four", {
      duration: 0.6,
      scale: 0.9,
      opacity: 0,
      y: -100,
      ease: "power2.in"
    }, "+=1.5")
    .from(".idea-1", { duration: 0.7, ...ideaTextTrans, ease: "power2.out" })
    .to(".idea-1", { duration: 0.7, ...ideaTextTransLeave, ease: "power2.in" }, "+=2.5")
    .from(".idea-2", { duration: 0.7, ...ideaTextTrans, ease: "power2.out" })
    .to(".idea-2", { duration: 0.7, ...ideaTextTransLeave, ease: "power2.in" }, "+=2.5")
    .from(".idea-3", { duration: 0.7, ...ideaTextTrans, ease: "power2.out" })
    .to(".idea-3 strong", {
      duration: 0.5,
      scale: 1.1,
      x: 10,
      backgroundColor: "rgb(21, 161, 237)",
      color: "#fff",
      ease: "back.out(1.5)"
    })
    .to(".idea-3", { duration: 0.7, ...ideaTextTransLeave, ease: "power2.in" }, "+=2.5")
    .from(".idea-4", { duration: 0.7, ...ideaTextTrans, ease: "power2.out" })
    .to(".idea-4", { duration: 0.7, ...ideaTextTransLeave, ease: "power2.in" }, "+=2.5")
    .from(".idea-5", {
      duration: 0.8,
      rotationX: 15,
      rotationZ: -10,
      skewY: "-5deg",
      y: 50,
      z: 10,
      opacity: 0,
      ease: "back.out(1.5)"
    }, "+=1.5")
    .to(".idea-5 span", {
      duration: 0.7,
      rotation: 90,
      x: 8,
      ease: "power2.out"
    }, "+=1.4")
    .to(".idea-5", {
      duration: 0.7,
      scale: 0.2,
      opacity: 0,
      ease: "power2.in"
    }, "+=2")
    .from(".idea-6 span", {
      duration: 0.8,
      scale: 3,
      opacity: 0,
      rotation: 15,
      stagger: 0.2,
      ease: "power3.out"
    })
    .to(".idea-6 span", {
      duration: 0.8,
      scale: 3,
      opacity: 0,
      rotation: -15,
      stagger: 0.2,
      ease: "power3.in"
    }, "+=1.5")
    .to(".ballons img", {
      duration: 3,
      opacity: 1,
      y: -1200,
      stagger: 0.15,
      ease: "power1.inOut"
    })
    .from(".profile-picture", {
      duration: 0.8,
      scale: 2,
      opacity: 0,
      x: 25,
      y: -25,
      rotationZ: -45,
      ease: "back.out(1.5)"
    }, "-=2")
    .from(".hat", {
      duration: 0.8,
      x: -100,
      y: 350,
      rotation: -180,
      opacity: 0,
      ease: "back.out(1.2)"
    }, "-=1.2")
    .from(".wish-hbd span", {
      duration: 0.7,
      opacity: 0,
      y: -50,
      rotation: 150,
      skewX: "30deg",
      stagger: 0.08,
      ease: "back.out(1.7)"
    })
    .to(".wish-hbd span", {
      duration: 0.7,
      scale: 1,
      rotationY: 0,
      color: "#3b82f6", // Changed pink to beautiful blue
      stagger: 0.08,
      ease: "power2.out"
    }, "party")
    .from(".wish h5", {
      duration: 0.6,
      opacity: 0,
      y: 15,
      skewX: "-15deg",
      ease: "power2.out"
    }, "party")
    .to(".eight svg", {
      duration: 1.5,
      visibility: "visible",
      opacity: 0,
      scale: 80,
      repeat: 3,
      repeatDelay: 1.4,
      stagger: 0.3
    })
    .to(".six", {
      duration: 0.6,
      opacity: 0,
      y: 30,
      zIndex: "-1",
      ease: "power2.in"
    })
    .from(".nine p", {
      duration: 0.8,
      opacity: 0,
      y: 20,
      stagger: 1,
      ease: "power2.out"
    })
    .to(".last-smile", {
      duration: 0.6,
      rotation: 90,
      ease: "back.out(2)"
    }, "+=1");

  // restart animation on click
  const replyBtn = document.getElementById("replay");
  replyBtn.addEventListener("click", () => {
    tl.restart();
  });
};
