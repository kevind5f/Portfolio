document.addEventListener('DOMContentLoaded', function() {
    // Referencias a elementos del DOM
    const notasLista = document.getElementById('notasLista');
    const notaEditor = document.getElementById('notaEditor');
    const mensajesContainer = document.getElementById('mensajes');
    const searchInput = document.getElementById('searchInput');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const toggleThemeBtn = document.getElementById('toggleTheme');
    const exportNotesBtn = document.getElementById('exportNotes');
    const shortcutsHelp = document.getElementById('shortcutsHelp');
    const closeShortcutsBtn = document.getElementById('closeShortcuts');
    const confirmModal = document.getElementById('confirmModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalMessage = document.getElementById('modalMessage');
    const confirmActionBtn = document.getElementById('confirmAction');
    const cancelActionBtn = document.getElementById('cancelAction');
    
    // Variables de estado
    let notas = JSON.parse(localStorage.getItem('notas')) || [];
    let notaActualId = null;
    let currentFilter = 'all';
    let searchTerm = '';
    let autoSaveTimeout = null;
    let isDarkTheme = localStorage.getItem('darkTheme') === 'true';
    
    // Inicializar la aplicación
    inicializar();
    
    // Función para inicializar la aplicación
    function inicializar() {
        aplicarTema();
        renderizarNotas();
        setupEventListeners();
        setupKeyboardShortcuts();
        
        // Si hay notas, seleccionar la primera
        if (notas.length > 0) {
            seleccionarNota(notas[0].id);
        } else {
            mostrarEstadoVacio();
        }
        
        actualizarContadorPalabras();
        actualizarUltimoGuardado();
    }
    
    // Configurar event listeners
    function setupEventListeners() {
        // Botones principales
        document.getElementById('nuevaNota').addEventListener('click', crearNuevaNota);
        document.getElementById('guardarNota').addEventListener('click', guardarNota);
        document.getElementById('eliminarNota').addEventListener('click', confirmarEliminarNota);
        
        // Búsqueda y filtros
        searchInput.addEventListener('input', handleSearch);
        filterBtns.forEach(btn => {
            btn.addEventListener('click', handleFilter);
        });
        
        // Acciones de nota
        document.getElementById('toggleFavorite').addEventListener('click', toggleFavorite);
        document.getElementById('shareNote').addEventListener('click', compartirNota);
        
        // Herramientas del editor
        document.querySelectorAll('.toolbar-btn').forEach(btn => {
            btn.addEventListener('click', handleToolbarAction);
        });
        
        // Header actions
        toggleThemeBtn.addEventListener('click', toggleTheme);
        exportNotesBtn.addEventListener('click', exportarNotas);
        
        // Modales
        closeShortcutsBtn.addEventListener('click', () => {
            shortcutsHelp.classList.remove('show');
        });
        
        confirmActionBtn.addEventListener('click', ejecutarAccionConfirmada);
        cancelActionBtn.addEventListener('click', () => {
            confirmModal.classList.remove('show');
        });
        
        // Cerrar modales con Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                shortcutsHelp.classList.remove('show');
                confirmModal.classList.remove('show');
            }
        });
        
        // Auto-save en cambios
        document.addEventListener('input', handleAutoSave);
        
        // Event listeners para el editor
        const editor = document.getElementById('notaContenido');
        if (editor) {
            editor.addEventListener('input', actualizarContadorPalabras);
            editor.addEventListener('input', handleAutoSave);
            editor.addEventListener('keyup', actualizarBotonesFormato);
            editor.addEventListener('mouseup', actualizarBotonesFormato);
            editor.addEventListener('paste', handlePaste);
            editor.addEventListener('keydown', handleKeyDown);
        }
    }
    
    // Configurar atajos de teclado
    function setupKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            // Ctrl+N: Nueva nota
            if (e.ctrlKey && e.key === 'n') {
                e.preventDefault();
                crearNuevaNota();
            }
            
            // Ctrl+S: Guardar
            if (e.ctrlKey && e.key === 's') {
                e.preventDefault();
                guardarNota();
            }
            
            // Delete: Eliminar nota
            if (e.key === 'Delete' && notaActualId) {
                e.preventDefault();
                confirmarEliminarNota();
            }
            
            // Ctrl+F: Buscar
            if (e.ctrlKey && e.key === 'f') {
                e.preventDefault();
                searchInput.focus();
            }
            
            // Ctrl+B: Negrita
            if (e.ctrlKey && e.key === 'b') {
                e.preventDefault();
                aplicarFormato('bold');
            }
            
            // Ctrl+I: Cursiva
            if (e.ctrlKey && e.key === 'i') {
                e.preventDefault();
                aplicarFormato('italic');
            }
            
            // Ctrl+U: Subrayado
            if (e.ctrlKey && e.key === 'u') {
                e.preventDefault();
                aplicarFormato('underline');
            }
            
            // F1: Ayuda
            if (e.key === 'F1') {
                e.preventDefault();
                shortcutsHelp.classList.add('show');
            }
        });
    }
    
    // Manejar búsqueda
    function handleSearch() {
        searchTerm = searchInput.value.toLowerCase();
        renderizarNotas();
    }
    
    // Manejar filtros
    function handleFilter(e) {
        filterBtns.forEach(btn => btn.classList.remove('active'));
        e.target.classList.add('active');
        currentFilter = e.target.dataset.filter;
        renderizarNotas();
    }
    
    // Aplicar tema
    function aplicarTema() {
        if (isDarkTheme) {
            document.documentElement.setAttribute('data-theme', 'dark');
            toggleThemeBtn.innerHTML = '<i class="fas fa-sun"></i>';
        } else {
            document.documentElement.removeAttribute('data-theme');
            toggleThemeBtn.innerHTML = '<i class="fas fa-moon"></i>';
        }
    }
    
    // Cambiar tema
    function toggleTheme() {
        isDarkTheme = !isDarkTheme;
        localStorage.setItem('darkTheme', isDarkTheme);
        aplicarTema();
        mostrarMensaje('Tema cambiado', 'info');
    }
    
    // Auto-save
    function handleAutoSave() {
        if (autoSaveTimeout) {
            clearTimeout(autoSaveTimeout);
        }
        
        autoSaveTimeout = setTimeout(() => {
            if (notaActualId) {
                guardarNota(true); // Auto-save silencioso
            }
        }, 2000);
    }
    
    // Mostrar estado vacío
    function mostrarEstadoVacio() {
        notaEditor.innerHTML = `
            <div class="empty-state">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                    <line x1="16" y1="13" x2="8" y2="13"></line>
                    <line x1="16" y1="17" x2="8" y2="17"></line>
                    <polyline points="10 9 9 9 8 9"></polyline>
                </svg>
                <h3>No hay notas</h3>
                <p>Crea una nueva nota para comenzar a organizar tus ideas.</p>
                <button class="btn btn-nueva" onclick="crearNuevaNota()">
                    <i class="fas fa-plus"></i> Crear primera nota
                </button>
            </div>
        `;
    }
    
    // Restaurar editor
    function restaurarEditor() {
        notaEditor.innerHTML = `
            <div class="editor-header">
                <div class="editor-title-section">
                    <input type="text" class="editor-input" id="notaTitulo" placeholder="Título de la nota">
                    <div class="note-actions">
                        <button class="btn-icon" id="toggleFavorite" title="Marcar como favorita">
                            <i class="far fa-star"></i>
                        </button>
                        <button class="btn-icon" id="shareNote" title="Compartir nota">
                            <i class="fas fa-share-alt"></i>
                        </button>
                    </div>
                </div>
                <div class="editor-actions">
                    <button class="btn btn-guardar" id="guardarNota" title="Guardar (Ctrl+S)">
                        <i class="fas fa-save"></i> Guardar
                    </button>
                    <button class="btn btn-eliminar" id="eliminarNota" title="Eliminar (Delete)">
                        <i class="fas fa-trash"></i> Eliminar
                    </button>
                </div>
            </div>
            
            <div class="editor-content">
                <div class="editor-toolbar">
                    <button class="toolbar-btn" data-format="bold" title="Negrita (Ctrl+B)">
                        <i class="fas fa-bold"></i>
                        <span class="shortcut-indicator">B</span>
                    </button>
                    <button class="toolbar-btn" data-format="italic" title="Cursiva (Ctrl+I)">
                        <i class="fas fa-italic"></i>
                        <span class="shortcut-indicator">I</span>
                    </button>
                    <button class="toolbar-btn" data-format="underline" title="Subrayado (Ctrl+U)">
                        <i class="fas fa-underline"></i>
                        <span class="shortcut-indicator">U</span>
                    </button>
                    <div class="toolbar-separator"></div>
                    <button class="toolbar-btn" data-format="list" title="Lista con viñeta">
                        <i class="fas fa-list-ul"></i>
                    </button>
                    <button class="toolbar-btn" data-format="link" title="Crear enlace">
                        <i class="fas fa-link"></i>
                    </button>
                </div>
                
                <div class="editor-textarea" id="notaContenido" contenteditable="true" placeholder="Escribe tu nota aquí...&#10;&#10;Consejos de formato:&#10;• Selecciona texto y usa Ctrl+B para negrita&#10;• Selecciona texto y usa Ctrl+I para cursiva&#10;• Selecciona texto y usa Ctrl+U para subrayado&#10;• Usa Ctrl+S para guardar automáticamente&#10;&#10;Ejemplos:&#10;**Texto en negrita**&#10;*Texto en cursiva*&#10;__Texto subrayado__"></div>
            </div>
            
            <div class="editor-footer">
                <div class="word-count">
                    <span id="wordCount">0 palabras</span>
                </div>
                <div class="last-saved">
                    <span id="lastSaved">No guardado</span>
                </div>
            </div>
        `;
        
        // Reconfigurar event listeners
        setupEventListeners();
    }
    
    // Renderizar notas con filtros y búsqueda
    function renderizarNotas() {
        let notasFiltradas = notas;
        
        // Aplicar filtros
        switch (currentFilter) {
            case 'favorites':
                notasFiltradas = notas.filter(nota => nota.favorita);
                break;
            case 'recent':
                const unaSemanaAtras = Date.now() - (7 * 24 * 60 * 60 * 1000);
                notasFiltradas = notas.filter(nota => nota.fechaModificacion > unaSemanaAtras);
                break;
        }
        
        // Aplicar búsqueda
        if (searchTerm) {
            notasFiltradas = notasFiltradas.filter(nota => 
                nota.titulo.toLowerCase().includes(searchTerm) ||
                nota.contenido.toLowerCase().includes(searchTerm)
            );
        }
        
        // Ordenar por fecha de modificación
        notasFiltradas.sort((a, b) => b.fechaModificacion - a.fechaModificacion);
        
        if (notasFiltradas.length === 0) {
            const mensaje = searchTerm || currentFilter !== 'all' 
                ? 'No se encontraron notas que coincidan con tu búsqueda'
                : 'No hay notas';
            notasLista.innerHTML = `<div class="empty-state">${mensaje}</div>`;
            return;
        }
        
        notasLista.innerHTML = '';
        
        notasFiltradas.forEach(nota => {
            const notaElement = document.createElement('div');
            notaElement.className = 'nota-item';
            notaElement.dataset.id = nota.id;
            
            if (notaActualId === nota.id) {
                notaElement.classList.add('active');
            }
            
            const fecha = new Date(nota.fechaModificacion);
            const opciones = { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' };
            const fechaFormateada = fecha.toLocaleDateString('es-ES', opciones);
            
            const titulo = nota.titulo || 'Sin título';
            const preview = nota.contenido || 'Sin contenido';
            const favorita = nota.favorita ? '<i class="fas fa-star" style="color: #f59e0b; margin-right: 4px;"></i>' : '';
            
            notaElement.innerHTML = `
                <div class="nota-titulo">${favorita}${titulo}</div>
                <div class="nota-preview">${preview}</div>
                <div class="nota-fecha">
                    <i class="fas fa-clock"></i>
                    ${fechaFormateada}
                </div>
            `;
            
            notaElement.addEventListener('click', () => {
                seleccionarNota(nota.id);
            });
            
            notasLista.appendChild(notaElement);
        });
    }
    
    // Seleccionar nota
    function seleccionarNota(id) {
        if (document.querySelector('.empty-state')) {
            restaurarEditor();
        }
        
        // Actualizar nota activa en la UI
        document.querySelectorAll('.nota-item').forEach(item => {
            item.classList.remove('active');
            if (item.dataset.id === id.toString()) {
                item.classList.add('active');
            }
        });
        
        const nota = notas.find(n => n.id === id);
        if (!nota) return;
        
        notaActualId = nota.id;
        
        // Actualizar campos del editor
        const tituloInput = document.getElementById('notaTitulo');
        const contenidoTextarea = document.getElementById('notaContenido');
        const toggleFavoriteBtn = document.getElementById('toggleFavorite');
        
        if (tituloInput && contenidoTextarea) {
            tituloInput.value = nota.titulo || '';
            establecerContenidoConFormato(nota.contenido); // Usar establecerContenidoConFormato
            
            // Actualizar botón de favorita
            if (toggleFavoriteBtn) {
                const icon = toggleFavoriteBtn.querySelector('i');
                if (nota.favorita) {
                    icon.className = 'fas fa-star';
                    toggleFavoriteBtn.classList.add('active');
                } else {
                    icon.className = 'far fa-star';
                    toggleFavoriteBtn.classList.remove('active');
                }
            }
        }
        
        actualizarContadorPalabras();
        actualizarUltimoGuardado();
        actualizarBotonesFormato();
    }
    
    // Crear nueva nota
    function crearNuevaNota() {
        if (document.querySelector('.empty-state')) {
            restaurarEditor();
        }
        
        const nuevaNota = {
            id: Date.now(),
            titulo: '',
            contenido: '', // Contenido inicialmente vacío
            favorita: false,
            fechaCreacion: Date.now(),
            fechaModificacion: Date.now()
        };
        
        notas.unshift(nuevaNota);
        guardarEnLocalStorage();
        renderizarNotas();
        
        notaActualId = nuevaNota.id;
        seleccionarNota(nuevaNota.id);
        
        const tituloInput = document.getElementById('notaTitulo');
        if (tituloInput) {
            tituloInput.focus();
        }
        
        mostrarMensaje('Nueva nota creada', 'exito');
    }
    
    // Guardar nota
    function guardarNota(silencioso = false) {
        if (!notaActualId) return;
        
        const tituloInput = document.getElementById('notaTitulo');
        const contenidoTextarea = document.getElementById('notaContenido');
        
        if (!tituloInput || !contenidoTextarea) return;
        
        const notaIndex = notas.findIndex(n => n.id === notaActualId);
        if (notaIndex === -1) return;
        
        // Actualizar datos de la nota
        notas[notaIndex].titulo = tituloInput.value;
        notas[notaIndex].contenido = obtenerContenidoMarkdown(); // Guardar como markdown
        notas[notaIndex].fechaModificacion = Date.now();
        
        guardarEnLocalStorage();
        renderizarNotas();
        actualizarContadorPalabras();
        actualizarUltimoGuardado();
        
        if (!silencioso) {
            mostrarMensaje('Nota guardada correctamente', 'exito');
        }
    }
    
    // Confirmar eliminar nota
    function confirmarEliminarNota() {
        if (!notaActualId) return;
        
        const nota = notas.find(n => n.id === notaActualId);
        if (!nota) return;
        
        modalTitle.textContent = 'Eliminar nota';
        modalMessage.textContent = `¿Estás seguro de que quieres eliminar la nota "${nota.titulo || 'Sin título'}"? Esta acción no se puede deshacer.`;
        confirmActionBtn.textContent = 'Eliminar';
        confirmActionBtn.className = 'btn btn-confirm';
        
        confirmModal.classList.add('show');
    }
    
    // Ejecutar acción confirmada
    function ejecutarAccionConfirmada() {
        if (modalTitle.textContent === 'Eliminar nota') {
            eliminarNota();
        }
        confirmModal.classList.remove('show');
    }
    
    // Eliminar nota
    function eliminarNota() {
        if (!notaActualId) return;
        
        const notaIndex = notas.findIndex(n => n.id === notaActualId);
        if (notaIndex === -1) return;
        
        const notaEliminada = notas[notaIndex];
        notas.splice(notaIndex, 1);
        guardarEnLocalStorage();
        
        notaActualId = null;
        renderizarNotas();
        
        if (notas.length > 0) {
            seleccionarNota(notas[0].id);
        } else {
            mostrarEstadoVacio();
        }
        
        mostrarMensaje(`Nota "${notaEliminada.titulo || 'Sin título'}" eliminada`, 'info');
    }
    
    // Toggle favorita
    function toggleFavorite() {
        if (!notaActualId) return;
        
        const notaIndex = notas.findIndex(n => n.id === notaActualId);
        if (notaIndex === -1) return;
        
        notas[notaIndex].favorita = !notas[notaIndex].favorita;
        guardarEnLocalStorage();
        renderizarNotas();
        
        const mensaje = notas[notaIndex].favorita ? 'Marcada como favorita' : 'Quitada de favoritas';
        mostrarMensaje(mensaje, 'info');
    }
    
    // Compartir nota
    function compartirNota() {
        if (!notaActualId) return;
        
        const nota = notas.find(n => n.id === notaActualId);
        if (!nota) return;
        
        const texto = `${nota.titulo || 'Sin título'}\n\n${nota.contenido}`;
        
        if (navigator.share) {
            navigator.share({
                title: nota.titulo || 'Mi nota',
                text: texto // Compartir el texto como markdown
            });
        } else {
            // Fallback: copiar al portapapeles
            navigator.clipboard.writeText(texto).then(() => {
                mostrarMensaje('Nota copiada al portapapeles', 'exito');
            });
        }
    }
    
    // Manejar acciones de la barra de herramientas
    function handleToolbarAction(e) {
        const format = e.currentTarget.dataset.format;
        aplicarFormato(format);
    }
    
    // Aplicar formato
    function aplicarFormato(format) {
        const editor = document.getElementById('notaContenido');
        if (!editor) return;
        
        const selection = window.getSelection();
        if (!selection.rangeCount) {
            mostrarMensaje('Selecciona texto para aplicar formato', 'info');
            return;
        }
        
        const range = selection.getRangeAt(0);
        const selectedText = range.toString();
        
        if (!selectedText) {
            mostrarMensaje('Selecciona texto para aplicar formato', 'info');
            return;
        }
        
        // Crear elemento con formato visual
        let formattedElement;
        let markdownText = '';
        
        switch (format) {
            case 'bold':
                formattedElement = document.createElement('strong');
                markdownText = `**${selectedText}**`;
                break;
            case 'italic':
                formattedElement = document.createElement('em');
                markdownText = `*${selectedText}*`;
                break;
            case 'underline':
                formattedElement = document.createElement('u');
                markdownText = `__${selectedText}__`;
                break;
            case 'list':
                formattedElement = document.createElement('li');
                markdownText = `• ${selectedText}`;
                break;
            case 'link':
                formattedElement = document.createElement('a');
                formattedElement.href = '#';
                markdownText = `[${selectedText}](url)`;
                break;
        }
        
        if (formattedElement) {
            formattedElement.textContent = selectedText;
            range.deleteContents();
            range.insertNode(formattedElement);
            
            // Colapsar el rango al final del elemento insertado
            range.setStartAfter(formattedElement);
            range.setEndAfter(formattedElement);
            selection.removeAllRanges();
            selection.addRange(range);
        }
        
        // Actualizar preview y botones
        actualizarPreview(notaActualId);
        actualizarBotonesFormato();
        
        // Mostrar mensaje de confirmación
        const formatNames = {
            'bold': 'negrita',
            'italic': 'cursiva',
            'underline': 'subrayado',
            'list': 'lista',
            'link': 'enlace'
        };
        
        mostrarMensaje(`Formato ${formatNames[format]} aplicado`, 'exito');
    }
    
    // Obtener contenido como markdown
    function obtenerContenidoMarkdown() {
        const editor = document.getElementById('notaContenido');
        if (!editor) return '';
        
        let markdown = '';
        const walker = document.createTreeWalker(
            editor,
            NodeFilter.SHOW_TEXT | NodeFilter.SHOW_ELEMENT,
            null,
            false
        );
        
        let node;
        while (node = walker.nextNode()) {
            if (node.nodeType === Node.TEXT_NODE) {
                markdown += node.textContent;
            } else if (node.nodeType === Node.ELEMENT_NODE) {
                const tagName = node.tagName.toLowerCase();
                const text = node.textContent;
                
                switch (tagName) {
                    case 'strong':
                    case 'b':
                        markdown += `**${text}**`;
                        break;
                    case 'em':
                    case 'i':
                        markdown += `*${text}*`;
                        break;
                    case 'u':
                        markdown += `__${text}__`;
                        break;
                    case 'li':
                        markdown += `• ${text}`;
                        break;
                    case 'a':
                        const href = node.getAttribute('href') || 'url';
                        markdown += `[${text}](${href})`;
                        break;
                    default:
                        markdown += text;
                }
            }
        }
        
        return markdown;
    }
    
    // Establecer contenido con formato visual
    function establecerContenidoConFormato(markdown) {
        const editor = document.getElementById('notaContenido');
        if (!editor) return;
        
        // Limpiar el editor
        editor.innerHTML = '';
        
        if (!markdown) return;
        
        // Convertir markdown a HTML visual
        let html = markdown
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            .replace(/__(.*?)__/g, '<u>$1</u>')
            .replace(/•\s*(.*?)(?=\n|$)/g, '<li>$1</li>')
            .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2">$1</a>');
        
        // Convertir saltos de línea
        html = html.replace(/\n/g, '<br>');
        
        editor.innerHTML = html;
    }
    
    // Actualizar estado de los botones de formato
    function actualizarBotonesFormato() {
        const editor = document.getElementById('notaContenido');
        if (!editor) return;
        
        const selection = window.getSelection();
        if (!selection.rangeCount) return;
        
        const range = selection.getRangeAt(0);
        const selectedText = range.toString();
        
        if (!selectedText) return;
        
        // Verificar si el texto seleccionado está dentro de elementos con formato
        let parentElement = range.commonAncestorContainer;
        if (parentElement.nodeType === Node.TEXT_NODE) {
            parentElement = parentElement.parentElement;
        }
        
        // Obtener botones de formato
        const boldBtn = document.querySelector('[data-format="bold"]');
        const italicBtn = document.querySelector('[data-format="italic"]');
        const underlineBtn = document.querySelector('[data-format="underline"]');
        
        if (boldBtn) {
            boldBtn.classList.toggle('active', 
                parentElement.tagName === 'STRONG' || parentElement.tagName === 'B');
        }
        
        if (italicBtn) {
            italicBtn.classList.toggle('active', 
                parentElement.tagName === 'EM' || parentElement.tagName === 'I');
        }
        
        if (underlineBtn) {
            underlineBtn.classList.toggle('active', 
                parentElement.tagName === 'U');
        }
    }
    
    // Actualizar preview
    function actualizarPreview(id) {
        if (!id) return;
        
        const notaIndex = notas.findIndex(n => n.id === id);
        if (notaIndex === -1) return;
        
        const notaElement = document.querySelector(`.nota-item[data-id="${id}"]`);
        if (!notaElement) return;
        
        const tituloElement = notaElement.querySelector('.nota-titulo');
        const previewElement = notaElement.querySelector('.nota-preview');
        
        const tituloInput = document.getElementById('notaTitulo');
        const contenidoTextarea = document.getElementById('notaContenido');
        
        if (!tituloInput || !contenidoTextarea) return;
        
        if (tituloElement && previewElement) {
            tituloElement.textContent = tituloInput.value || 'Sin título';
            previewElement.textContent = obtenerContenidoMarkdown(); // Usar obtenerContenidoMarkdown
        }
    }
    
    // Actualizar contador de palabras
    function actualizarContadorPalabras() {
        const editor = document.getElementById('notaContenido');
        const wordCountElement = document.getElementById('wordCount');
        
        if (!editor || !wordCountElement) return;
        
        const texto = editor.textContent.trim(); // Usar textContent para contar palabras
        const palabras = texto ? texto.split(/\s+/).length : 0;
        const caracteres = texto.length;
        
        wordCountElement.textContent = `${palabras} palabras, ${caracteres} caracteres`;
    }
    
    // Actualizar último guardado
    function actualizarUltimoGuardado() {
        const lastSavedElement = document.getElementById('lastSaved');
        if (!lastSavedElement) return;
        
        const nota = notas.find(n => n.id === notaActualId);
        if (!nota) {
            lastSavedElement.textContent = 'No guardado';
            return;
        }
        
        const fecha = new Date(nota.fechaModificacion);
        const ahora = new Date();
        const diferencia = ahora - fecha;
        
        let texto = '';
        if (diferencia < 60000) { // Menos de 1 minuto
            texto = 'Guardado ahora';
        } else if (diferencia < 3600000) { // Menos de 1 hora
            const minutos = Math.floor(diferencia / 60000);
            texto = `Guardado hace ${minutos} minuto${minutos > 1 ? 's' : ''}`;
        } else {
            texto = `Guardado el ${fecha.toLocaleDateString('es-ES')}`;
        }
        
        lastSavedElement.textContent = texto;
    }
    
    // Exportar notas
    function exportarNotas() {
        const datos = {
            notas: notas,
            fechaExportacion: new Date().toISOString(),
            version: '1.0'
        };
        
        const blob = new Blob([JSON.stringify(datos, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `notas_${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        mostrarMensaje('Notas exportadas correctamente', 'exito');
    }
    
    // Guardar en localStorage
    function guardarEnLocalStorage() {
        localStorage.setItem('notas', JSON.stringify(notas));
    }
    
    // Mostrar mensaje
    function mostrarMensaje(texto, tipo) {
        const mensaje = document.createElement('div');
        mensaje.className = `mensaje mensaje-${tipo}`;
        mensaje.textContent = texto;
        
        mensajesContainer.appendChild(mensaje);
        
        // Remover mensaje después de la animación
        setTimeout(() => {
            if (mensaje.parentNode) {
                mensaje.parentNode.removeChild(mensaje);
            }
        }, 3000);
    }
    
    // Hacer funciones globales para acceso desde HTML
    window.crearNuevaNota = crearNuevaNota;
    window.guardarNota = guardarNota;
    window.eliminarNota = eliminarNota;
    
    // Manejar pegado de texto
    function handlePaste(e) {
        e.preventDefault();
        const text = e.clipboardData.getData('text/plain');
        document.execCommand('insertText', false, text);
    }
    
    // Manejar teclas especiales
    function handleKeyDown(e) {
        // Permitir Enter para saltos de línea
        if (e.key === 'Enter') {
            e.preventDefault();
            document.execCommand('insertLineBreak', false, null);
        }
        
        // Permitir Tab para indentación
        if (e.key === 'Tab') {
            e.preventDefault();
            document.execCommand('insertText', false, '    ');
        }
    }
});