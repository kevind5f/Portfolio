import { createStore } from 'vuex'


export default createStore({
  state: {
    skills: [
      {category: 'Frontend', items: ['HTML', 'CSS', 'Javascript', 'Vue.js', 'Nuxt.js', 'Bootstrap', 'Tailwind CSS', 'Jquery', 'Ajax', 'Materialize', 'Bootstrap', 'SASS', 'Grid Layout', 'Flexbox', 'Responsive Design', 'HoudiniCSS']},
      {category: 'Backend', items: ['C#', 'SQL', 'SQL Server', 'MySQL', 'SQL Lite', 'MongoDB', 'PHP', 'Node.js', 'Express.js','Python', 'Flask', 'Nuxt.js']},
      {category: 'Control de Versiones', items: ['Git', 'GitHub', 'GitLabs', 'GitKraken']},
      {category: 'Gestion', items: ['Scrum', 'Notion', 'Obsidian', 'PowerBI']},
      {category: 'Microsoft', items: ['MS Project', 'PowerPoint', 'Excel', 'Word', 'Visio']},
      {category: 'Idiomas', items: ['Ingles (B1)', 'Español (Nativo)']}
    ],
    projects: [
      {
        name: 'Note of the day', 
        description: 'This page features a modern, interactive web design that combines stylistic elements and 3D visual effects to create an engaging and dynamic experience. The design includes a floating card that reacts to the hover of the cursor.',
        link: '/NoteOfTheDay/index.html', 
        img: '/assets/NoteOfTheDay.png',
        technologies: ['HTML', 'CSS', 'Javascript']
      },
      {
        name: 'Skyline New York',
        description: 'This website uses a clean, minimalist design to highlight an animated header that integrates images of skylines and a dynamic scrolling effect.',
        link: '/NewYork/index.html',
        img: '/assets/NewYork.png',
        technologies: [' HTML', 'CSS', 'Javascript']
      },
      {
        name: 'Online Technology Store',
        description: 'This technology product page features a clean, modern design that highlights the company`s main features. Its minimalist approach allows key information and products to stand out clearly, providing an attractive and easy-to-navigate visual experience for users.',
        link: '/tiendaOnline/index.html',
        img: '/assets/Online.png',
        technologies: [' HTML', 'CSS', 'Javascript', 'Bootstrap']
      },
      {
        name: 'Cards',
        description: 'The design uses smooth transitions and a blur effect on the content to create an immersive visual experience. It is ideal for showcasing profiles, projects or services in a stylish and professional manner.',
        link: '/Cards/index.html',
        img: '/assets/Cards.png',
        technologies: [' HTML', 'CSS', 'Javascript']
      },
      {
        name: 'Video Games',
        description: 'Visually appealing and easy to navigate website that provides users with an interactive experience while exploring video game related content. The project is fully functional and adapts to different devices, providing an accessible and friendly design.',
        link: '/BlogVideoJuegos/index.html',
        img: '/assets/VideoGames.png',
        technologies: [' HTML', 'CSS', 'Javascript']
      },
      {
        name: 'Galery',
        description: 'Interactive image gallery, simple but visually appealing, where images are clearly visible and stand out when hovering over them.',
        link: '/Galery/index.html',
        img: '/assets/Galery.png',
        technologies: [' HTML', 'CSS', 'Javascript']
      },
      {
        name: 'Testimonials',
        description: 'Visually appealing and user-friendly testimonials section, where users can read featured reviews from other customers or employees. This design focuses on enhancing the user experience through interactivity and smooth transitions.',
        link: '/Testimonials/index.html',
        img: '/assets/Testi.png',
        technologies: [' HTML', 'CSS', 'Javascript']
      },
      {
        name: 'Apple',
        description: 'This design is simple and focused on the visual presentation of the products, with a clean and attractive style that uses large images and brief texts to capture the visitor`s attention.',
        link: '/apple/index.html',
        img: '/assets/Apple.png',
        technologies: [' HTML', 'CSS', 'Javascript']
      },
      {
        name: 'Ice Cream',
        description: 'This web design stands out for its fresh, modern and friendly style. With an attractive visual approach thanks to large images of products and environments, the site is fully adapted to be visually appealing, with quality images, well-defined call-to-action buttons and a clean and organized approach that facilitates navigation.',
        link: '/helados/index.html',
        img: '/assets/IceCream.png',
        technologies: [' HTML', 'CSS', 'Javascript']
      },
      {
        name: 'Restaurant',
        description: 'Burger Page stands out for its bold, modern and appetizing style. The site offers a striking visual experience with vibrant images of the burgers and the restaurant environment, while its design is fully optimized to engage the user, with high-quality photos, prominent call-to-action buttons and an organized structure that makes navigation easy.',
        link: '/retaurant/index.html',
        img: '/assets/Hamburguer.png',
        technologies: [' HTML', 'CSS', 'Javascript']
      },
      {
        name: 'Mini Paint',
        description: 'Paint-style drawing application features a simple, intuitive and easy-to-use interface. The site is optimized to offer a smooth experience, with accessible drawing tools, a large canvas to work on and well-defined action buttons, all in a clean and organized environment that makes it easy to navigate and use.',
        link: '/MiniPaint/index.html',
        img: '/assets/MiniPaint.png',
        technologies: [' HTML', 'CSS', 'Javascript']
      },
      {
        name: 'Calculator',
        description: 'This Calculator Page is a sleek, user-friendly tool designed to handle both basic and advanced mathematical operations with precision. Built with a responsive layout, it supports addition, subtraction, multiplication, division, and scientific functions like trigonometry and logarithms. It features a clean interface, memory storage, calculation history, and customizable settings for a personalized experience. Whether for academic, professional, or everyday use, this calculator offers a reliable and intuitive solution across all devices.',
        link: '/Calculator/index.html',
        img: '/assets/Calculator.png',
        technologies: [' HTML', 'CSS', 'Javascript']
      },
      {
        name: 'Notes App',
        description: 'This Notes App is a clean, minimalistic tool designed to help users quickly capture, organize, and manage their thoughts, tasks, and ideas. With features like real-time editing, search functionality, color-coded notes, and automatic saving, it provides a smooth and intuitive user experience. Fully responsive and accessible across devices, the app ensures your notes are always within reach, whether you`re planning your day or brainstorming new projects.',
        link: '/NotesApp/index.html',
        img: '/assets/NotesApp.png',
        technologies: [' HTML', 'CSS', 'Javascript']
      },
      {
        name: 'Tetris',
        description: 'This Tetris App is a modern take on the classic puzzle game, designed with smooth controls, vibrant visuals, and responsive gameplay. Players can enjoy the timeless challenge of rotating and stacking falling blocks to clear lines and score points, with increasing difficulty to keep things exciting. Built for all devices, the app offers a seamless experience whether you`re playing casually or chasing high scores, combining nostalgia with a clean, contemporary interface.',
        link: '/Tetris/index.html',
        img: '/assets/Tetris.png',
        technologies: [' HTML', 'CSS', 'Javascript']
      }
    ],
    contact: [
      {
        type: 'Redes Sociales',
        items: [
          {name: 'WhastApp', link: 'https://wa.me/+51930110963'},
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
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
