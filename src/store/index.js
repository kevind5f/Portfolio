import { createStore } from 'vuex'


export default createStore({
  state: {
    skills: [
      {category: 'Frontend', items: ['HTML', 'CSS', 'Javascript', 'Vue.js', 'Nuxt.js', 'Bootstrap', 'Tailwind CSS', 'Jquery', 'Ajax', 'Materialize', 'Bootstrap', 'SASS', 'Grid Layout', 'Flexbox', 'Responsive Design', 'HoudiniCSS']},
      {category: 'Backend', items: ['C#', 'SQL', 'SQL Server', 'MySQL', 'SQL Lite', 'MongoDB', 'PHP', 'Node.js', 'Express.js','Python', 'Flask', 'Nuxt.js', 'Laravel', '.NET']},
      {category: 'Control de Versiones', items: ['Git', 'GitHub', 'GitLabs', 'GitKraken']},
      {category: 'Gestion', items: ['Scrum', 'Notion', 'Obsidian', 'PowerBI']},
      {category: 'Microsoft', items: ['MS Project', 'PowerPoint', 'Excel', 'Word', 'Visio']},
      {category: 'Idiomas', items: ['Ingles (B1)', 'Español (Nativo)']}
    ],
    projects: [
      {
        name: 'Note of the day', 
        description: 'Aplicación web moderna e interactiva que destaca por su diseño estilizado y efectos visuales 3D. Presenta una tarjeta flotante que reacciona dinámicamente al movimiento del cursor, creando una experiencia envolvente y atractiva para el usuario.',
        link: '/NoteOfTheDay/index.html', 
        img: '/assets/NoteOfTheDay.png',
        technologies: ['HTML', 'CSS', 'Javascript']
      },
      {
        name: 'Skyline New York',
        description: 'Sitio web minimalista que resalta un encabezado animado con imágenes de skylines y un efecto de desplazamiento dinámico. El diseño limpio y elegante permite que los elementos visuales sean los protagonistas.',
        link: '/NewYork/index.html',
        img: '/assets/NewYork.png',
        technologies: [' HTML', 'CSS', 'Javascript']
      },
      {
        name: 'Online Technology Store',
        description: 'Página de productos tecnológicos con un diseño moderno y minimalista. Destaca las principales características de la empresa y productos, priorizando la claridad, la navegación intuitiva y una experiencia visual atractiva.',
        link: '/tiendaOnline/index.html',
        img: '/assets/Online.png',
        technologies: [' HTML', 'CSS', 'Javascript', 'Bootstrap']
      },
      {
        name: 'Cards',
        description: 'Diseño de tarjetas con transiciones suaves y efecto blur, ideal para mostrar perfiles, proyectos o servicios de manera elegante y profesional. La experiencia visual es inmersiva y sofisticada.',
        link: '/Cards/index.html',
        img: '/assets/Cards.png',
        technologies: [' HTML', 'CSS', 'Javascript']
      },
      {
        name: 'Video Games',
        description: 'Web interactiva y visualmente atractiva para explorar contenido relacionado con videojuegos. Ofrece una experiencia dinámica, adaptada a dispositivos móviles y fácil de navegar.',
        link: '/BlogVideoJuegos/index.html',
        img: '/assets/VideoGames.png',
        technologies: [' HTML', 'CSS', 'Javascript']
      },
      {
        name: 'Galery',
        description: 'Galería de imágenes interactiva, sencilla y visualmente llamativa. Las imágenes destacan al pasar el cursor, brindando una experiencia de usuario clara y agradable.',
        link: '/Galery/index.html',
        img: '/assets/Galery.png',
        technologies: [' HTML', 'CSS', 'Javascript']
      },
      {
        name: 'Testimonials',
        description: 'Sección de testimonios moderna y fácil de usar, donde los usuarios pueden leer reseñas destacadas. El diseño se centra en la experiencia del usuario, con transiciones suaves e interactividad.',
        link: '/Testimonials/index.html',
        img: '/assets/Testi.png',
        technologies: [' HTML', 'CSS', 'Javascript']
      },
      {
        name: 'Apple',
        description: 'Landing page enfocada en la presentación visual de productos Apple. Utiliza un estilo limpio y atractivo, con imágenes grandes y textos breves para captar la atención del visitante.',
        link: '/apple/index.html',
        img: '/assets/Apple.png',
        technologies: [' HTML', 'CSS', 'Javascript']
      },
      {
        name: 'Ice Cream',
        description: 'Diseño web fresco, moderno y amigable, con imágenes de alta calidad y botones de llamada a la acción bien definidos. La estructura limpia facilita la navegación y resalta los productos.',
        link: '/helados/index.html',
        img: '/assets/IceCream.png',
        technologies: [' HTML', 'CSS', 'Javascript']
      },
      {
        name: 'Restaurant',
        description: 'Página de hamburguesas con un estilo audaz y moderno. Imágenes vibrantes y botones destacados crean una experiencia visual impactante y una navegación sencilla para el usuario.',
        link: '/retaurant/index.html',
        img: '/assets/Hamburguer.png',
        technologies: [' HTML', 'CSS', 'Javascript']
      },
      {
        name: 'Mini Paint',
        description: 'Aplicación de dibujo tipo Paint con interfaz simple e intuitiva. Herramientas accesibles, lienzo amplio y botones bien definidos para una experiencia de usuario fluida y organizada.',
        link: '/MiniPaint/index.html',
        img: '/assets/MiniPaint.png',
        technologies: [' HTML', 'CSS', 'Javascript']
      },
      {
        name: 'Calculator',
        description: 'Calculadora elegante y fácil de usar, capaz de realizar operaciones básicas y avanzadas. Diseño responsivo, historial de cálculos y funciones científicas para una experiencia completa en cualquier dispositivo.',
        link: '/Calculator/index.html',
        img: '/assets/Calculator.png',
        technologies: [' HTML', 'CSS', 'Javascript']
      },
      {
        name: 'Notes App',
        description: 'Aplicación de notas minimalista y eficiente para capturar, organizar y gestionar ideas o tareas. Incluye edición en tiempo real, búsqueda, notas codificadas por color y guardado automático.',
        link: '/NotesApp/index.html',
        img: '/assets/NotesApp.png',
        technologies: [' HTML', 'CSS', 'Javascript']
      },
      {
        name: 'Tetris',
        description: 'Versión moderna del clásico Tetris, con controles suaves, visuales vibrantes y jugabilidad responsiva. Ideal para disfrutar en cualquier dispositivo, combinando nostalgia y diseño contemporáneo.',
        link: '/Tetris/index.html',
        img: '/assets/Tetris.png',
        technologies: [' HTML', 'CSS', 'Javascript']
      },
      {
        name: 'Finance app',
        description: 'Aplicacion de registro financiero, con un diseño moderno y sencillo. Permite registrar ingresos y gastos, con un historial de transacciones y un resumen de balances.',
        link: 'https://github.com/kevind5f/personal-finance-app',
        img: '/assets/FinanceApp.png',
        technologies: [' HTML', 'CSS', 'Javascript', 'Tailwind CSS', 'Vue.js', 'Nuxt.js', 'TypeScript']
      }
    ],
    contact: [
      {
        type: 'Redes Sociales',
        items: [
          {name: 'WhastApp', link: 'https://wa.me/+51995094630'},
          {name: 'Instagram', link: 'https://www.instagram.com/omegalull.1/'},
          {name: 'Facebook', link: 'https://www.facebook.com/profile.php?id=100068875626308'}
        ]
      } ,
      {
        type: 'Profesional',
        items: [
          {name: 'GitHub', link: 'https://github.com/kevind5f'},
          {name: 'CodePen', link: 'https://codepen.io/kevin-felices-ledesma/pens/public'},
          {name: 'LinkedIn', link: 'https://www.linkedin.com/in/kevin-felices-ledesma-3210991bb/'}]
      }
    ]
  }
})
