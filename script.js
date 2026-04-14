document.addEventListener('DOMContentLoaded', () => {
    // Animación inicial en secciones y tarjetas
    const sections = document.querySelectorAll('section, .card');
    sections.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.animation = `fadeInUp 0.6s ease-in-out ${index * 0.1}s forwards`;
    });

    // Hover effects en imágenes y botones
    document.querySelectorAll('img, button').forEach(el => {
        el.addEventListener('mouseover', () => {
            el.style.transform = 'scale(1.05)';
        });
        el.addEventListener('mouseout', () => {
            el.style.transform = 'scale(1)';
        });
    });

    // Scroll-triggered animations con IntersectionObserver
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'slideIn 0.8s ease-out forwards';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.project, .content').forEach(el => {
        el.style.opacity = '0';
        observer.observe(el);
    });

    // Loader dependiente de carga real
    window.addEventListener('load', () => {
        showLoader();
    });

    function showLoader() {
        const loader = document.createElement('div');
        loader.className = 'loader';
        loader.innerHTML = '<span></span>';
        document.body.appendChild(loader);
        setTimeout(() => loader.remove(), 2000);
    }

    // Scroll suave en navegación
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(link.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
            // efecto de transición de opacidad
            document.body.style.opacity = '0.7';
            setTimeout(() => {
                document.body.style.opacity = '1';
            }, 300);
        });
    });
});

// Animaciones CSS (puedes mover esto a style.css)
const styles = `
    @keyframes fadeInUp {
        from { opacity: 0; transform: translateY(30px); }
        to { opacity: 1; transform: translateY(0); }
    }
    
    @keyframes slideIn {
        from { opacity: 0; transform: translateY(30px); }
        to { opacity: 1; transform: translateY(0); }
    }
    
    img, button {
        transition: transform 0.3s ease-out;
    }
    
    .loader {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        border: 4px solid #f3f3f3;
        border-top: 4px solid #3498db;
        border-radius: 50%;
        width: 40px;
        height: 40px;
        animation: spin 1s linear infinite;
        z-index: 9999;
    }
    
    @keyframes spin {
        0% { transform: translate(-50%, -50%) rotate(0deg); }
        100% { transform: translate(-50%, -50%) rotate(360deg); }
    }
`;

// Inyecta estilos en el documento
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);

// Animación de partículas en el header

document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('headerCanvas');
  const ctx = canvas.getContext('2d');

  function resizeCanvas() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 3 + 1;
    this.speedX = Math.random() * 1.5 - 0.75;
    this.speedY = Math.random() * 1.5 - 0.75;
    // Array de colores para el degradado dinámico
    this.colors = ['#667eea', '#764ba2', '#6db33f'];
    this.color = this.colors[Math.floor(Math.random() * this.colors.length)];
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
    if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
  }
  draw() {
    // Usamos el color dinámico
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}


  let particles = [];
  const numParticles = 50;
  for (let i = 0; i < numParticles; i++) {
    particles.push(new Particle());
  }

  function connectParticles() {
    for (let a = 0; a < particles.length; a++) {
      for (let b = a; b < particles.length; b++) {
        const dx = particles[a].x - particles[b].x;
        const dy = particles[a].y - particles[b].y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < 120) {
          ctx.fillStyle = 'rgba(102,126,234,0.8)'; // partículas violeta
          ctx.strokeStyle = 'rgba(118,75,162,0.3)'; // líneas violeta suave
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(particles[a].x, particles[a].y);
          ctx.lineTo(particles[b].x, particles[b].y);
          ctx.stroke();
        }
      }
    }
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      p.update();
      p.draw();
    });
    connectParticles();
    requestAnimationFrame(animate);
  }

  animate();
});



