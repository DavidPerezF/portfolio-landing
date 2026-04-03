document.addEventListener("DOMContentLoaded", () => {
    // 1. Seleccionamos los elementos que queremos animar
    const sections = document.querySelectorAll("#sobre-mi, #proyectos, #contacto");
    const cards = document.querySelectorAll(".project-card");

    // 2. Configuramos las opciones del observador
    const observerOptions = {
        root: null, // Observa en relación al viewport de la pantalla
        rootMargin: "0px",
        threshold: 0.15 // El evento se dispara cuando al menos el 15% del elemento es visible
    };

    // 3. Creamos el IntersectionObserver para las secciones principales
    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            // Si el elemento entra en la pantalla, le añadimos la clase que hace la animación
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target); // Dejamos de observarlo para que ocurra solo una vez
            }
        });
    }, observerOptions);

    // 4. Creamos un IntersectionObserver específico para las tarjetas de proyectos
    const cardObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Añadimos un pequeño retraso en cadena para cada tarjeta visible
                setTimeout(() => {
                    entry.target.classList.add("visible");
                }, index * 150); // 150ms de diferencia entre tarjeta y tarjeta
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // 5. Preparamos las secciones añadiendo su clase inicial invisible y las observamos
    sections.forEach(section => {
        section.classList.add("fade-in-section");
        sectionObserver.observe(section);
    });

    // 6. Preparamos las tarjetas de proyecto de la misma forma
    cards.forEach(card => {
        card.classList.add("fade-in-section");
        cardObserver.observe(card);
    });

    // ==========================================
    // FASE 2: Animación de texto con Typed.js
    // ==========================================
    // Verificamos que Typed esté definido para no romper el código si falla la carga del CDN
    if (typeof Typed !== 'undefined') {
        const typed = new Typed('.typed-text', {
            strings: [
                "Desarrollador Web Creativo.",
                "Apasionado por el Diseño Frontend.",
                "Creador de Experiencias Increíbles."
            ], // Las 3 frases que van a ir rotando
            typeSpeed: 50,    // Velocidad de escritura en ms
            backSpeed: 50,    // Velocidad de borrado en ms
            backDelay: 2000,  // Tiempo de espera antes de empezar a borrar
            loop: true,       // Hace que la animación se repita infinitamente
            showCursor: true, // Muestra el cursor parpadeando
            cursorChar: '|',  // El carácter que actúa como cursor
        });
    }
    // ==========================================
    // FASE 3: Parallax y Contadores Animados
    // ==========================================

    // 1. Efecto Parallax en la Imagen Hero
    const heroImage = document.querySelector('.hero-image');
    if (heroImage) {
        window.addEventListener('scroll', () => {
            const scrolled = window.scrollY; // Cuántos píxeles hemos bajado
            // Aplicamos un translate en el eje Y. Al multiplicar por 0.15, se mueve más lento que el resto de la página
            heroImage.style.transform = `translateY(${scrolled * 0.15}px)`;
        });
    }

    // 2. Efecto de Contador Animado
    const counters = document.querySelectorAll('.counter');
    const animationSpeed = 200; // Constante para regular la suavidad de la animación

    // Usamos otra instancia de IntersectionObserver para monitorear los contadores
    const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counterElement = entry.target;
                
                // Función recursiva que actualiza los números hasta llegar al objetivo
                const updateCount = () => {
                    // Obtenemos el objetivo del dataset de HTML (data-target)
                    const target = parseInt(counterElement.getAttribute('data-target')); 
                    // Obtenemos el número actual (empieza en 0)
                    const count = parseInt(counterElement.innerText);                   
                    
                    // Calculamos a qué ritmo incrementar los números
                    const increment = target / animationSpeed;

                    if (count < target) {
                        // Math.ceil redondea hacia arriba para no tener decimales
                        counterElement.innerText = Math.ceil(count + increment);
                        // Repetiremos esto cada 15 milisegundos para dar ilusión de movimiento
                        setTimeout(updateCount, 15);
                    } else {
                        // Terminamos asignando el objetivo exacto para evitar descadres
                        counterElement.innerText = target; 
                    }
                };

                updateCount(); // Iniciamos la secuencia
                observer.unobserve(counterElement); // Dejamos de observar (cuenta solo 1 vez)
            }
        });
    }, { threshold: 0.5 }); // Inicia cuando vemos al menos la mitad del contador

    counters.forEach(counter => {
        counterObserver.observe(counter);
    });

});
