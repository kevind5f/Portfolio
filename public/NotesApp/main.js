document.addEventListener('DOMContentLoaded', function() {
    // Referencias a elementos del DOM - usamos let en lugar de const para las referencias que cambiarán
    const notasLista = document.getElementById('notasLista');
    let notaTitulo = document.getElementById('notaTitulo');
    let notaContenido = document.getElementById('notaContenido');
    const btnNueva = document.getElementById('nuevaNota');
    let btnGuardar = document.getElementById('guardarNota');
    let btnEliminar = document.getElementById('eliminarNota');
    const mensajesContainer = document.getElementById('mensajes');
    const notaEditor = document.getElementById('notaEditor');
    
    // Variables de estado
    let notas = JSON.parse(localStorage.getItem('notas')) || [];
    let notaActualId = null;
    
    // Inicializar la aplicación
    inicializar();
    
    // Función para inicializar la aplicación
    function inicializar() {
        renderizarNotas();
        setupEventListeners();
        
        // Si hay notas, seleccionar la primera
        if (notas.length > 0) {
            seleccionarNota(notas[0].id);
        } else {
            mostrarEstadoVacio();
        }
    }
    
    // Configurar event listeners
    function setupEventListeners() {
        btnNueva.addEventListener('click', crearNuevaNota);
        
        // Asegurémonos que los elementos existen antes de añadir event listeners
        if (btnGuardar) {
            btnGuardar.addEventListener('click', guardarNota);
        }
        
        if (btnEliminar) {
            btnEliminar.addEventListener('click', eliminarNota);
        }
        
        if (notaTitulo) {
            notaTitulo.addEventListener('input', function() {
                actualizarPreview(notaActualId);
            });
        }
        
        if (notaContenido) {
            notaContenido.addEventListener('input', function() {
                actualizarPreview(notaActualId);
            });
        }
    }
    
    // Mostrar estado vacío si no hay notas
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
                <p>Crea una nueva nota para comenzar.</p>
            </div>
        `;
    }
    
    // Restaurar editor original
    function restaurarEditor() {
        notaEditor.innerHTML = `
            <div class="editor-header">
                <input type="text" class="editor-input" id="notaTitulo" placeholder="Título de la nota">
                <div class="editor-actions">
                    <button class="btn btn-guardar" id="guardarNota">Guardar</button>
                    <button class="btn btn-eliminar" id="eliminarNota">Eliminar</button>
                </div>
            </div>
            <textarea class="editor-textarea" id="notaContenido" placeholder="Escribe tu nota aquí..."></textarea>
        `;
        
        // Actualizar referencias
        notaTitulo = document.getElementById('notaTitulo');
        notaContenido = document.getElementById('notaContenido');
        btnGuardar = document.getElementById('guardarNota');
        btnEliminar = document.getElementById('eliminarNota');
        
        // Reconfigurar event listeners
        setupEventListeners();
    }
    
    // Renderizar la lista de notas
    function renderizarNotas() {
        if (notas.length === 0) {
            notasLista.innerHTML = '<div class="nota-item">No hay notas</div>';
            return;
        }
        
        notasLista.innerHTML = '';
        
        // Ordenar notas por fecha de modificación (más reciente primero)
        notas.sort((a, b) => b.fechaModificacion - a.fechaModificacion);
        
        notas.forEach(nota => {
            const notaElement = document.createElement('div');
            notaElement.className = 'nota-item';
            notaElement.dataset.id = nota.id;
            
            if (notaActualId === nota.id) {
                notaElement.classList.add('active');
            }
            
            const fecha = new Date(nota.fechaModificacion);
            const opciones = { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' };
            const fechaFormateada = fecha.toLocaleDateString('es-ES', opciones);
            
            notaElement.innerHTML = `
                <div class="nota-titulo">${nota.titulo || 'Sin título'}</div>
                <div class="nota-preview">${nota.contenido || 'Sin contenido'}</div>
                <div class="nota-fecha">${fechaFormateada}</div>
            `;
            
            notaElement.addEventListener('click', () => {
                seleccionarNota(nota.id);
            });
            
            notasLista.appendChild(notaElement);
        });
    }
    
    // Seleccionar una nota
    function seleccionarNota(id) {
        // Si el editor estaba en estado vacío, restaurarlo
        if (document.querySelector('.empty-state')) {
            restaurarEditor();
        }
        
        // Actualizar nota activa en la UI
        const notasItems = document.querySelectorAll('.nota-item');
        notasItems.forEach(item => {
            item.classList.remove('active');
            if (item.dataset.id === id.toString()) {
                item.classList.add('active');
            }
        });
        
        // Buscar la nota en el array
        const nota = notas.find(n => n.id === id);
        if (!nota) return;
        
        notaActualId = nota.id;
        
        // Actualizar campos del editor - usando queryselector para evitar problemas
        const tituloInput = document.getElementById('notaTitulo');
        const contenidoTextarea = document.getElementById('notaContenido');
        
        if (tituloInput && contenidoTextarea) {
            tituloInput.value = nota.titulo || '';
            contenidoTextarea.value = nota.contenido || '';
            
            // Actualizar referencias
            notaTitulo = tituloInput;
            notaContenido = contenidoTextarea;
        }
    }
    
    // Crear una nueva nota
    function crearNuevaNota() {
        // Si el editor estaba en estado vacío, restaurarlo
        if (document.querySelector('.empty-state')) {
            restaurarEditor();
        }
        
        const nuevaNota = {
            id: Date.now(),
            titulo: '',
            contenido: '',
            fechaCreacion: Date.now(),
            fechaModificacion: Date.now()
        };
        
        notas.unshift(nuevaNota);
        guardarEnLocalStorage();
        renderizarNotas();
        
        // Seleccionar la nueva nota
        notaActualId = nuevaNota.id;
        seleccionarNota(nuevaNota.id);
        
        // Enfocar el campo de título
        if (notaTitulo) {
            notaTitulo.focus();
        }
        
        mostrarMensaje('Nueva nota creada', 'exito');
    }
    
    // Guardar nota actual
    function guardarNota() {
        if (!notaActualId) return;
        
        // Obtener referencias actualizadas
        const tituloActual = document.getElementById('notaTitulo');
        const contenidoActual = document.getElementById('notaContenido');
        
        if (!tituloActual || !contenidoActual) return;
        
        const notaIndex = notas.findIndex(n => n.id === notaActualId);
        if (notaIndex === -1) return;
        
        // Actualizar datos de la nota
        notas[notaIndex].titulo = tituloActual.value;
        notas[notaIndex].contenido = contenidoActual.value;
        notas[notaIndex].fechaModificacion = Date.now();
        
        guardarEnLocalStorage();
        renderizarNotas();
        mostrarMensaje('Nota guardada correctamente', 'exito');
    }
    
    // Actualizar la vista previa de la nota en la lista
    function actualizarPreview(id) {
        if (!id) return;
        
        const notaIndex = notas.findIndex(n => n.id === id);
        if (notaIndex === -1) return;
        
        const notaElement = document.querySelector(`.nota-item[data-id="${id}"]`);
        if (!notaElement) return;
        
        const tituloElement = notaElement.querySelector('.nota-titulo');
        const previewElement = notaElement.querySelector('.nota-preview');
        
        // Obtener referencias actualizadas
        const tituloActual = document.getElementById('notaTitulo');
        const contenidoActual = document.getElementById('notaContenido');
        
        if (!tituloActual || !contenidoActual) return;
        
        if (tituloElement && previewElement) {
            tituloElement.textContent = tituloActual.value || 'Sin título';
            previewElement.textContent = contenidoActual.value || 'Sin contenido';
        }
    }
    
    // Eliminar nota actual
    function eliminarNota() {
        if (!notaActualId) return;
        
        // Filtrar el array de notas para eliminar la actual
        notas = notas.filter(nota => nota.id !== notaActualId);
        
        guardarEnLocalStorage();
        renderizarNotas();
        
        // Si hay notas restantes, seleccionar la primera
        if (notas.length > 0) {
            seleccionarNota(notas[0].id);
        } else {
            // Si no quedan notas, limpiar el editor
            notaActualId = null;
            mostrarEstadoVacio();
        }
        
        mostrarMensaje('Nota eliminada', 'exito');
    }
    
    // Guardar en localStorage
    function guardarEnLocalStorage() {
        localStorage.setItem('notas', JSON.stringify(notas));
    }
    
    // Mostrar mensaje temporal
    function mostrarMensaje(texto, tipo) {
        const mensaje = document.createElement('div');
        mensaje.className = `mensaje mensaje-${tipo}`;
        mensaje.textContent = texto;
        
        mensajesContainer.appendChild(mensaje);
        
        // Eliminar el mensaje después de 3 segundos
        setTimeout(() => {
            mensaje.remove();
        }, 3000);
    }
});