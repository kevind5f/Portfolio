document.addEventListener('DOMContentLoaded', function() {
// Configuración inicial
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');
  let currentTool = 'pincel';
  let isDrawing = false;
  let lastX = 0;
  let lastY = 0;
  let currentColor = '#000000';
  let currentFillColor = '#ffffff';
  let currentLineWidth = 5;
  let currentOpacity = 1;
  let startX, startY;
  let activePath = [];
  let selectedObject = null;
  let history = [];
  let redoStack = [];
  let historyIndex = -1;
  let strokePattern = 'solid';
  let brushEffect = 'normal';
  let fontFamily = 'Arial';
  let fontSize = 20;
  let fontStyle = 'normal';
  let fillShape = true;
  let borderStyle = 'solid';
  let imageObj = null;
  let tempCanvas = document.createElement('canvas');
  tempCanvas.width = canvas.width;
  tempCanvas.height = canvas.height;
  let tempCtx = tempCanvas.getContext('2d');
  // Inicializar historial con el canvas vacío
  saveState();
  // Funciones de utilidad
  function getCoordinates(e) {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;  
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY
    };
  }
  function updateStatusBar(x, y) {
    document.getElementById('coordinates').textContent = `X: ${Math.round(x)}, Y: ${Math.round(y)}`;
    document.getElementById('current-tool').textContent = `Herramienta: ${currentTool.charAt(0).toUpperCase() + currentTool.slice(1)}`;
  }
  // Configuración del estilo de dibujo
  function setupDrawingStyle() {
    ctx.strokeStyle = currentColor;
    ctx.fillStyle = currentFillColor;
    ctx.lineWidth = currentLineWidth;
    ctx.globalAlpha = currentOpacity;
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    tempCtx.strokeStyle = currentColor;
    tempCtx.fillStyle = currentFillColor;
    tempCtx.lineWidth = currentLineWidth;
    tempCtx.globalAlpha = currentOpacity;
    tempCtx.lineJoin = 'round';
    tempCtx.lineCap = 'round';
      // Configurar el tipo de trazo
    if (strokePattern === 'dashed') {
      ctx.setLineDash([10, 5]);
      tempCtx.setLineDash([10, 5]);
    } else if (strokePattern === 'dotted') {
      ctx.setLineDash([2, 3]);
      tempCtx.setLineDash([2, 3]);
    } else {
      ctx.setLineDash([]);
      tempCtx.setLineDash([]);
    }
    // Configurar efectos de pincel
    switch (brushEffect) {
      case 'neon':
        ctx.shadowBlur = 10;
        ctx.shadowColor = currentColor;
        tempCtx.shadowBlur = 10;
        tempCtx.shadowColor = currentColor;
        break;
      case 'shadow':
        ctx.shadowBlur = 5;
        ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
        ctx.shadowOffsetX = 2;
        ctx.shadowOffsetY = 2;
        tempCtx.shadowBlur = 5;
        tempCtx.shadowColor = 'rgba(0, 0, 0, 0.5)';
        tempCtx.shadowOffsetX = 2;
        tempCtx.shadowOffsetY = 2;
        break;
      default:
        ctx.shadowBlur = 0;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
        tempCtx.shadowBlur = 0;
        tempCtx.shadowOffsetX = 0;
        tempCtx.shadowOffsetY = 0;
    }
  }
    
    // Gestión de historial
  function saveState() {
    // Guardar solo hasta el historyIndex actual
    if (historyIndex < history.length - 1) {
      history = history.slice(0, historyIndex + 1);
      redoStack = [];
    }
    // Guardar el estado actual del canvas
    history.push(canvas.toDataURL());
    historyIndex = history.length - 1;
    // Limitar el tamaño del historial
    const maxHistorySize = 20;
    if (history.length > maxHistorySize) {
      history.shift();
      //Asegurar que historyIndex no sea negativo
      historyIndex = Math.max(0, historyIndex - 1);
    }
    // Habilitar/deshabilitar botones de deshacer/rehacer
    document.getElementById('btn-undo').disabled = historyIndex <= 0;
    document.getElementById('btn-redo').disabled = redoStack.length === 0;
  }
  function undo() {
    if (historyIndex > 0) {
      // Guardar el estado actual para rehacer
      redoStack.push(history[historyIndex]);
      // Cargar el estado anterior
      historyIndex--;
      // Asegurarse de que el índice esté dentro del rango válido
      if (historyIndex < 0) {
        historyIndex = 0; 
        // Evitar que historyIndex sea negativo
      }
      loadHistoryState();  // Función que carga el estado del historial
    }
    // Deshabilitar el botón de deshacer si ya no hay historial anterior
    document.getElementById('btn-undo').disabled = historyIndex <= 0;
    // Asegúrate de habilitar el botón de rehacer si el redoStack no está vacío
    document.getElementById('btn-redo').disabled = redoStack.length === 0;
  }
  function redo() {
    if (redoStack.length > 0) {
      // Incrementar el historyIndex
      historyIndex++;
      // Añadir el estado actual al historial
      if (historyIndex === history.length) {
        // Si estamos al final del historial, añadimos el nuevo estado
        history.push(redoStack.pop());
      } else {
        // Si no, reemplazamos el estado en el historyIndex
        history[historyIndex] = redoStack.pop();
      }
      // Cargar el estado del historial
      loadHistoryState();
    }
    // Deshabilitar el botón de rehacer si no hay más acciones para rehacer
    document.getElementById('btn-redo').disabled = redoStack.length === 0;
    // Habilitar/deshabilitar el botón de deshacer según el historyIndex
    document.getElementById('btn-undo').disabled = historyIndex <= 0;
  }
  function loadHistoryState() {
    const img = new Image();
    img.onload = function() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0);
    };
    img.src = history[historyIndex];
    // Actualizar estado de los botones
    document.getElementById('btn-undo').disabled = historyIndex <= 0;
    document.getElementById('btn-redo').disabled = redoStack.length === 0;
  }
  // Funciones de dibujo
  function startDrawing(e) {
    isDrawing = true;
    const coords = getCoordinates(e);
    startX = coords.x;
    startY = coords.y;
    lastX = startX;
    lastY = startY;
    setupDrawingStyle();
    
    // Acciones específicas por herramienta
    switch (currentTool) {
      case 'pincel':
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        activePath = [{x: startX, y: startY}];
        break;
      case 'borrador':
        ctx.save();
        ctx.strokeStyle = '#ffffff';
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        break;
      case 'colorpicker':
        const pixel = ctx.getImageData(startX, startY, 1, 1).data;
        const color = `#${pixel[0].toString(16).padStart(2, '0')}${pixel[1].toString(16).padStart(2, '0')}${pixel[2].toString(16).padStart(2, '0')}`;
        document.getElementById('colorPicker').value = color;
        currentColor = color;
        break;
      case 'seleccion':
        // Implementar la lógica de selección de objetos
        console.log('Herramienta de selección activada en: ', startX, startY); // Ver en la consola las coordenadas de selección
        break;
      default:
        // Para formas, líneas, etc.
        tempCtx.clearRect(0, 0, tempCanvas.width, tempCanvas.height);
        break;
    }
    e.preventDefault();
  }
  function draw(e) {
    if (!isDrawing) return;
    const coords = getCoordinates(e);
    const x = coords.x;
    const y = coords.y;
    updateStatusBar(x, y);
    switch (currentTool) {
      case 'pincel':
        ctx.lineTo(x, y);
        ctx.stroke();
        activePath.push({x, y});
        break;
      case 'borrador':
          ctx.save();
          ctx.strokeStyle = '#ffffff'; // Color de borrado (blanco para hacer que desaparezca en un fondo blanco)
          ctx.lineWidth = currentLineWidth * 2; // Asegurarse de que el trazo sea suficientemente grande
          ctx.beginPath();
          ctx.moveTo(lastX, lastY);
          ctx.lineTo(x, y);
          ctx.stroke();
          ctx.restore();
          break;
      case 'linea':
        tempCtx.clearRect(0, 0, tempCanvas.width, tempCanvas.height);
        tempCtx.beginPath();
        tempCtx.moveTo(startX, startY);
        tempCtx.lineTo(x, y);
        tempCtx.stroke();
        break;
      case 'flecha':
        drawArrow(tempCtx, startX, startY, x, y);
        break;
      case 'rectangulo':
        drawRectangle(tempCtx, startX, startY, x - startX, y - startY);
        break;
      case 'circulo':
        drawCircle(tempCtx, startX, startY, x, y);
        break;
      case 'triangulo':
        drawTriangle(tempCtx, startX, startY, x, y);
        break;
      case 'estrella':
        drawStar(tempCtx, startX, startY, x, y);
        break;
      default:
        break;
    }
    // Actualizar vista previa
    if (['linea', 'flecha', 'rectangulo', 'circulo', 'triangulo', 'estrella'].includes(currentTool)) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(tempCanvas, 0, 0);
    }
    lastX = x;
    lastY = y;
  }
  function stopDrawing() {
    if (!isDrawing) return;
    isDrawing = false;
    // Finalizar la acción actual según la herramienta
    switch (currentTool) {
      case 'pincel':
      case 'borrador':
        ctx.closePath();
        break;
      case 'linea':
      case 'flecha':
      case 'rectangulo':
      case 'circulo':
      case 'triangulo':
      case 'estrella':
      case 'poligono':
        ctx.drawImage(tempCanvas, 0, 0);
        tempCtx.clearRect(0, 0, tempCanvas.width, tempCanvas.height);
        break;
    }
    // Restaurar configuración después de herramientas especiales
    if (currentTool === 'borrador') {
      ctx.restore();
    }
    // Guardar estado para el historial
    saveState();
  }
  // Funciones específicas para dibujar formas
  function drawArrow(context, fromX, fromY, toX, toY) {
    const headLength = 15;  // Longitud de la cabeza de la flecha
    const dx = toX - fromX;
    const dy = toY - fromY;
    const angle = Math.atan2(dy, dx);
    // Limpiar canvas temporal
    context.clearRect(0, 0, tempCanvas.width, tempCanvas.height);
    // Configurar el estilo de la flecha (puedes personalizarlo según necesites)
    context.lineWidth = 2;  // Ancho de la línea
    context.strokeStyle = currentColor;  // Color de la línea
    context.fillStyle = currentColor;  // Color de relleno si es necesario
    // Dibujar la línea principal de la flecha
    context.beginPath();
    context.moveTo(fromX, fromY);
    context.lineTo(toX, toY);
    context.stroke();
    // Dibujar la cabeza de la flecha
    context.beginPath();
    context.moveTo(toX, toY);
    context.lineTo(toX - headLength * Math.cos(angle - Math.PI / 6), toY - headLength * Math.sin(angle - Math.PI / 6));
    context.moveTo(toX, toY);
    context.lineTo(toX - headLength * Math.cos(angle + Math.PI / 6), toY - headLength * Math.sin(angle + Math.PI / 6));
    context.stroke();
  }
  function drawRectangle(context, x, y, width, height) {
    // Limpiar el canvas temporal
    context.clearRect(0, 0, tempCanvas.width, tempCanvas.height);
    // Dibujar el borde si es necesario
    if (borderStyle !== 'none') {
      context.beginPath();
      context.rect(x, y, width, height);
      context.lineWidth = 2;  // Ancho del borde (ajústalo según sea necesario)
      context.strokeStyle = currentColor;  // Color del borde
      context.stroke();
    }
    // Rellenar el rectángulo si está habilitado
    if (fillShape) {
      context.fillStyle = currentFillColor;  // Color de relleno
      context.fillRect(x, y, width, height);
    }
  }
  function drawCircle(context, startX, startY, endX, endY) {
    const radius = Math.sqrt(Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2));
    context.clearRect(0, 0, tempCanvas.width, tempCanvas.height);
    context.beginPath();
    context.arc(startX, startY, radius, 0, 2 * Math.PI);
    // Rellenar el círculo si está habilitado
    if (fillShape) {
      context.fillStyle = currentFillColor;  // Color de relleno
      context.fill();
    }
    // Dibujar el borde del círculo si es necesario
    if (borderStyle !== 'none') {
      context.lineWidth = 2;  // Ancho del borde (ajústalo según sea necesario)
      context.strokeStyle = currentColor;  // Color del borde
      context.stroke();
    }
  }
  function drawTriangle(context, startX, startY, endX, endY) {
    const width = endX - startX;
    const height = endY - startY;
    context.clearRect(0, 0, tempCanvas.width, tempCanvas.height);
    context.beginPath();
    context.moveTo(startX, endY);
    context.lineTo(startX + width / 2, startY);
    context.lineTo(endX, endY);
    context.closePath();
    if (fillShape) {
      context.fillStyle = currentFillColor;  // Color de relleno
      context.fill();
    }
    if (borderStyle !== 'none') {
      context.lineWidth = 2;  // Ancho del borde (ajústalo según sea necesario)
      context.strokeStyle = currentColor;  // Color del borde
      context.stroke();
    }
  }
  function drawStar(context, startX, startY, endX, endY) {
    const outerRadius = Math.sqrt(Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2));
    const innerRadius = outerRadius / 2.5;
    const spikes = 5;
    const centerX = startX;
    const centerY = startY;
    const rotation = -Math.PI / 2; // Para que apunte hacia arriba
    context.clearRect(0, 0, tempCanvas.width, tempCanvas.height);
    context.beginPath();
    for (let i = 0; i < spikes * 2; i++) {
      const radius = i % 2 === 0 ? outerRadius : innerRadius;
      const angle = (Math.PI / spikes) * i + rotation;
      const x = centerX + Math.cos(angle) * radius;
      const y = centerY + Math.sin(angle) * radius;
      if (i === 0) {
        context.moveTo(x, y);
      } else {
        context.lineTo(x, y);
      }
    }
    context.closePath();
    if (fillShape) {
      context.fillStyle = currentFillColor;  // Color de relleno
      context.fill();
    }
    if (borderStyle !== 'none') {
      context.lineWidth = 2;  // Ancho del borde (ajústalo según sea necesario)
      context.strokeStyle = currentColor;  // Color del borde
      context.stroke();
    }
  }
  // Funciones para manipular imágenes
  function handleImageUpload() {
    const fileInput = document.getElementById('fileInput');
    fileInput.click();
  }
  function handleFileSelect(event) {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = function(e) {
        const image = new Image();
        image.onload = function() {
          // Dibujar la imagen en el lienzo
          ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpiar el lienzo
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height); // Ajustar la imagen al tamaño del lienzo
        };
        image.src = e.target.result;
      };
      reader.readAsDataURL(file);
    } else {
      alert('Por favor, selecciona un archivo de imagen.');
    }
    document.getElementById('fileInput').addEventListener('change', handleFileSelect);
  }
  function addImageToCanvas(asBackground = false) {
    const file = document.getElementById('fileInput').files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function(e) {
      imageObj = new Image();
      imageObj.onload = function() {
        if (asBackground) {
          // Usar como fondo del canvas
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(imageObj, 0, 0, canvas.width, canvas.height);
        } else {
          // Preparar para colocar en el canvas
          currentTool = 'imagen';
          // Usar dimensiones personalizadas
          const width = parseInt(document.getElementById('imageWidth').value);
          const height = parseInt(document.getElementById('imageHeight').value);
          tempCtx.clearRect(0, 0, tempCanvas.width, tempCanvas.height);
          tempCtx.drawImage(imageObj, canvas.width/2 - width/2, canvas.height/2 - height/2, width, height);
          ctx.drawImage(tempCanvas, 0, 0);
        }
        saveState();
      };
      imageObj.src = e.target.result;
    };
    reader.readAsDataURL(file);
  }
  // Función para añadir texto
  function addText() {
    const text = document.getElementById('text-input').value;
    if (!text) return;
    setupDrawingStyle();
    // Configurar fuente
    ctx.font = `${fontStyle} ${fontSize}px ${fontFamily}`;
    ctx.fillStyle = currentColor;
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';
    // Agregar texto al canvas
    ctx.fillText(text, canvas.width/2 - 50, canvas.height/2 - 10);
    // Guardar estado
    saveState();
  }
      
      // Funciones para guardar y cargar
  function saveImage() {
    const link = document.createElement('a');
    link.download = 'mi-dibujo.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
  }
  function saveProjectAsJSON() {
    const projectData = {
      imageData: canvas.toDataURL(),
      timestamp: new Date().toISOString()
    };
    const blob = new Blob([JSON.stringify(projectData)], {type: 'application/json'});
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.download = 'mi-proyecto-dibujo.json';
    link.href = url;
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 100);
  }
      
  function loadProjectFromJSON() {
    document.getElementById('loadJsonInput').click();
  }
  function handleProjectLoad(event) {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function(e) {
      try {
        const projectData = JSON.parse(e.target.result);
        if (projectData.imageData) {
          const img = new Image();
          img.onload = function() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0);
            saveState();
          };
          img.src = projectData.imageData;
        }
      } catch (error) {
        alert('Error al cargar el proyecto: ' + error.message);
      }
    };
    reader.readAsText(file);
  }
  // Limpieza del canvas
  function clearCanvas() {
    if (confirm('¿Estás seguro de que deseas borrar todo?')) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      saveState();
    }
  }
  // Manejadores de eventos
  canvas.addEventListener('mousedown', startDrawing);
  canvas.addEventListener('mousemove', draw);
  canvas.addEventListener('mouseup', stopDrawing);
  canvas.addEventListener('mouseout', function() {
    if (isDrawing) {
      stopDrawing();
    }
  });
  // Eventos táctiles
  canvas.addEventListener('touchstart', function(e) {
    e.preventDefault();
    const touch = e.touches[0];
    const mouseEvent = new MouseEvent('mousedown', {
      clientX: touch.clientX,
      clientY: touch.clientY
    });
    canvas.dispatchEvent(mouseEvent);
  });
  canvas.addEventListener('touchmove', function(e) {
    e.preventDefault();
    const touch = e.touches[0];
    const mouseEvent = new MouseEvent('mousemove', {
      clientX: touch.clientX,
      clientY: touch.clientY
    });
    canvas.dispatchEvent(mouseEvent);
  });
  canvas.addEventListener('touchend', function(e) {
    e.preventDefault();
    const mouseEvent = new MouseEvent('mouseup', {});
    canvas.dispatchEvent(mouseEvent);
  });
  // Actualizar coordenadas
  canvas.addEventListener('mousemove', function(e) {
    const coords = getCoordinates(e);
    updateStatusBar(coords.x, coords.y);
  });
  // Eventos de los controles de la interfaz
  document.getElementById('colorPicker').addEventListener('change', function() {
    currentColor = this.value;
  });
  document.getElementById('fillColor').addEventListener('change', function() {
    currentFillColor = this.value;
  });
  document.getElementById('lineWidth').addEventListener('change', function() {
    currentLineWidth = parseInt(this.value);
  });
  document.getElementById('opacity').addEventListener('input', function() {
    currentOpacity = this.value / 100;
    document.getElementById('opacityValue').textContent = this.value + '%';
  });
  document.getElementById('btn-clear').addEventListener('click', clearCanvas);
  document.getElementById('btn-save').addEventListener('click', saveImage);
  document.getElementById('btn-save-json').addEventListener('click', saveProjectAsJSON);
  document.getElementById('btn-load-json').addEventListener('click', loadProjectFromJSON);
  document.getElementById('loadJsonInput').addEventListener('change', handleProjectLoad);
  document.getElementById('btn-upload').addEventListener('click', handleImageUpload);
  document.getElementById('fileInput').addEventListener('change', function() {
    addImageToCanvas(false);
  });
  document.getElementById('btn-background').addEventListener('click', function() {
    handleImageUpload();
    setTimeout(() => {
      addImageToCanvas(true);
    }, 100);
  });
  document.getElementById('add-text').addEventListener('click', addText);
  document.getElementById('btn-undo').addEventListener('click', undo);
  document.getElementById('btn-redo').addEventListener('click', redo);
  document.getElementById('fontSize').addEventListener('change', function() {
    fontSize = parseInt(this.value);
  });
  document.getElementById('fontFamily').addEventListener('change', function() {
    fontFamily = this.value;
    });
  document.getElementById('fontStyle').addEventListener('change', function() {
    fontStyle = this.value;
  });
  document.getElementById('fillShape').addEventListener('change', function() {
    fillShape = this.checked;
  });
  document.getElementById('bordeEstilo').addEventListener('change', function() {
    borderStyle = this.value;
  });
  document.getElementById('brushEffect').addEventListener('change', function() {
    brushEffect = this.value;
  });
  // Selector de color rápido
  document.querySelectorAll('.color-preset').forEach(function(preset) {
    preset.addEventListener('click', function() {
      const color = this.getAttribute('data-color');
      document.getElementById('colorPicker').value = color;
      currentColor = color;
    });
  });
  // Manejo de patrones de trazo
  document.querySelectorAll('.stroke-pattern').forEach(function(pattern) {
    pattern.addEventListener('click', function() {
      document.querySelectorAll('.stroke-pattern').forEach(p => p.classList.remove('active'));
      this.classList.add('active');
      strokePattern = this.getAttribute('data-pattern');
    });
  });
  // Cambio de pestañas
  document.querySelectorAll('.tab').forEach(function(tab) {
    tab.addEventListener('click', function() {
      const tabName = this.getAttribute('data-tab');
      // Desactivar todas las pestañas
      document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
      // Activar la pestaña seleccionada
      this.classList.add('active');
      document.getElementById('tab-' + tabName).classList.add('active');
    });
  });
  // Selección de herramientas
  document.querySelectorAll('.tool-btn').forEach(function(btn) {
    btn.addEventListener('click', function() {
      document.querySelectorAll('.tool-btn').forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      currentTool = this.getAttribute('data-tool');
      // Actualizar el cursor según la herramienta
      switch (currentTool) {
        case 'borrador':
          canvas.style.cursor = 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'24\' height=\'24\' viewBox=\'0 0 24 24\'%3E%3Cpath fill=\'%23000\' d=\'M15 3l2.3 2.3-2.89 2.87 1.42 1.42L18.7 6.7 21 9V3h-6zM3 9l2.3-2.3 2.87 2.89 1.42-1.42L6.7 5.3 9 3H3v6zm6 12l-2.3-2.3 2.89-2.87-1.42-1.42L5.3 17.3 3 15v6h6zm12-6l-2.3 2.3-2.87-2.89-1.42 1.42 2.89 2.87L15 21h6v-6z\'/%3E%3C/svg%3E") 12 12, auto';
          break;
        case 'seleccion':
          canvas.style.cursor = 'crosshair';
          break;
        case 'colorpicker':
          canvas.style.cursor = 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'24\' height=\'24\' viewBox=\'0 0 24 24\'%3E%3Cpath fill=\'%23000\' d=\'M7.54 11.5l-2.12 2.12 6.36 6.36 2.12-2.12-6.36-6.36zm8.66-4.35l-2.83-2.83c-.39-.39-1.02-.39-1.41 0l-2.12 2.12 4.24 4.24 2.12-2.12c.39-.39.39-1.02 0-1.41z\'/%3E%3C/svg%3E") 12 12, auto';
          break;
        default:
          canvas.style.cursor = 'crosshair';
      }
      // Actualizar la barra de estado
      document.getElementById('current-tool').textContent = `Herramienta: ${currentTool.charAt(0).toUpperCase() + currentTool.slice(1)}`;
    });
  });
  // Mantener proporción de imagen
  document.getElementById('imageWidth').addEventListener('change', function() {
    if (document.getElementById('maintainRatio').checked && imageObj) {
      const ratio = imageObj.height / imageObj.width;
      document.getElementById('imageHeight').value = Math.round(this.value * ratio);
    }
  });
  document.getElementById('imageHeight').addEventListener('change', function() {
    if (document.getElementById('maintainRatio').checked && imageObj) {
      const ratio = imageObj.width / imageObj.height;
      document.getElementById('imageWidth').value = Math.round(this.value * ratio);
    }
  });
});