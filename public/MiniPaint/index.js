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
  let history = [];
  let redoStack = [];
  let historyIndex = -1;
  let fillShape = true;
  let borderStyle = 'solid';
  let tempCanvas = document.createElement('canvas');
  tempCanvas.width = canvas.width;
  tempCanvas.height = canvas.height;
  let tempCtx = tempCanvas.getContext('2d');
  let previewCanvas = document.createElement('canvas');
  previewCanvas.width = canvas.width;
  previewCanvas.height = canvas.height;
  let previewCtx = previewCanvas.getContext('2d');
  let zoomLevel = 1;
  let panOffset = { x: 0, y: 0 };

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
    document.getElementById('canvas-size').textContent = `${canvas.width} x ${canvas.height}`;
  }

  function updateLineWidthDisplay() {
    document.getElementById('lineWidthValue').textContent = `${currentLineWidth}px`;
  }

  function updateOpacityDisplay() {
    document.getElementById('opacityValue').textContent = `${Math.round(currentOpacity * 100)}%`;
  }

  // Configuración del estilo de dibujo
  function setupDrawingStyle(context = ctx) {
    context.strokeStyle = currentColor;
    context.fillStyle = currentFillColor;
    context.lineWidth = currentLineWidth;
    context.globalAlpha = currentOpacity;
    context.lineJoin = 'round';
    context.lineCap = 'round';
    
    // Configurar el tipo de trazo
    if (borderStyle === 'dashed') {
      context.setLineDash([10, 5]);
    } else if (borderStyle === 'dotted') {
      context.setLineDash([2, 3]);
    } else {
      context.setLineDash([]);
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

  // Funciones de zoom
  function zoomIn() {
    if (zoomLevel < 3) {
      zoomLevel *= 1.2;
      applyZoom();
    }
  }

  function zoomOut() {
    if (zoomLevel > 0.3) {
      zoomLevel /= 1.2;
      applyZoom();
    }
  }

  function resetZoom() {
    zoomLevel = 1;
    panOffset = { x: 0, y: 0 };
    applyZoom();
  }

  function applyZoom() {
    canvas.style.transform = `scale(${zoomLevel}) translate(${panOffset.x}px, ${panOffset.y}px)`;
    canvas.style.transformOrigin = 'center';
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
    }
  }

  function draw(e) {
    if (!isDrawing) return;
    
    const coords = getCoordinates(e);
    const currentX = coords.x;
    const currentY = coords.y;
    
    updateStatusBar(currentX, currentY);
    
    switch (currentTool) {
      case 'pincel':
        ctx.lineTo(currentX, currentY);
        ctx.stroke();
        activePath.push({x: currentX, y: currentY});
        break;
      case 'borrador':
        ctx.lineTo(currentX, currentY);
        ctx.stroke();
        break;
      case 'rectangulo':
        tempCtx.clearRect(0, 0, tempCanvas.width, tempCanvas.height);
        tempCtx.drawImage(canvas, 0, 0);
        setupDrawingStyle(tempCtx);
        drawRectangle(tempCtx, startX, startY, currentX - startX, currentY - startY);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(tempCanvas, 0, 0);
        break;
      case 'circulo':
        tempCtx.clearRect(0, 0, tempCanvas.width, tempCanvas.height);
        tempCtx.drawImage(canvas, 0, 0);
        setupDrawingStyle(tempCtx);
        drawCircle(tempCtx, startX, startY, currentX, currentY);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(tempCanvas, 0, 0);
        break;
      case 'triangulo':
        tempCtx.clearRect(0, 0, tempCanvas.width, tempCanvas.height);
        tempCtx.drawImage(canvas, 0, 0);
        setupDrawingStyle(tempCtx);
        drawTriangle(tempCtx, startX, startY, currentX, currentY);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(tempCanvas, 0, 0);
        break;
      case 'estrella':
        tempCtx.clearRect(0, 0, tempCanvas.width, tempCanvas.height);
        tempCtx.drawImage(canvas, 0, 0);
        setupDrawingStyle(tempCtx);
        drawStar(tempCtx, startX, startY, currentX, currentY);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(tempCanvas, 0, 0);
        break;
    }
    
    lastX = currentX;
    lastY = currentY;
  }

  function stopDrawing() {
    if (!isDrawing) return;
    
    isDrawing = false;
    
    // Guardar estado después de completar el dibujo
    saveState();
    
    // Limpiar el canvas temporal
    tempCtx.clearRect(0, 0, tempCanvas.width, tempCanvas.height);
  }

  function drawRectangle(context, x, y, width, height) {
    context.beginPath();
    context.rect(x, y, width, height);
    if (fillShape) {
      context.fill();
    }
    if (borderStyle !== 'none') {
      context.stroke();
    }
  }

  function drawCircle(context, startX, startY, endX, endY) {
    const radius = Math.sqrt(Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2));
    context.beginPath();
    context.arc(startX, startY, radius, 0, 2 * Math.PI);
    if (fillShape) {
      context.fill();
    }
    if (borderStyle !== 'none') {
      context.stroke();
    }
  }

  function drawTriangle(context, startX, startY, endX, endY) {
    const width = endX - startX;
    const height = endY - startY;
    
    context.beginPath();
    context.moveTo(startX, startY);
    context.lineTo(startX + width, startY + height);
    context.lineTo(startX - width, startY + height);
    context.closePath();
    
    if (fillShape) {
      context.fill();
    }
    if (borderStyle !== 'none') {
      context.stroke();
    }
  }

  function drawStar(context, startX, startY, endX, endY) {
    const radius = Math.sqrt(Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2));
    const spikes = 5;
    const outerRadius = radius;
    const innerRadius = radius * 0.5;
    
    context.beginPath();
    for (let i = 0; i < spikes * 2; i++) {
      const angle = (i * Math.PI) / spikes;
      const r = i % 2 === 0 ? outerRadius : innerRadius;
      const x = startX + Math.cos(angle) * r;
      const y = startY + Math.sin(angle) * r;
      
      if (i === 0) {
        context.moveTo(x, y);
      } else {
        context.lineTo(x, y);
      }
    }
    context.closePath();
    
    if (fillShape) {
      context.fill();
    }
    if (borderStyle !== 'none') {
      context.stroke();
    }
  }

  function saveImage() {
    const link = document.createElement('a');
    link.download = 'minipaint-drawing.png';
    link.href = canvas.toDataURL();
    link.click();
  }

  function clearCanvas() {
    if (confirm('¿Estás seguro de que quieres limpiar todo el canvas?')) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      saveState();
    }
  }

  // Event Listeners
  canvas.addEventListener('mousedown', startDrawing);
  canvas.addEventListener('mousemove', draw);
  canvas.addEventListener('mouseup', stopDrawing);
  canvas.addEventListener('mouseleave', stopDrawing);

  // Tool selection
  document.querySelectorAll('.tool-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      document.querySelectorAll('.tool-btn').forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      currentTool = this.getAttribute('data-tool');
      updateStatusBar(0, 0);
    });
  });

  // Tab switching
  document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', function() {
      const tabName = this.getAttribute('data-tab');
      
      // Hide all tab contents
      document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
      });
      
      // Remove active class from all tabs
      document.querySelectorAll('.tab').forEach(t => {
        t.classList.remove('active');
      });
      
      // Show selected tab content and mark tab as active
      document.getElementById(`tab-${tabName}`).classList.add('active');
      this.classList.add('active');
    });
  });

  // Color picker
  document.getElementById('colorPicker').addEventListener('change', function() {
    currentColor = this.value;
  });

  // Color presets
  document.querySelectorAll('.color-preset').forEach(preset => {
    preset.addEventListener('click', function() {
      const color = this.getAttribute('data-color');
      currentColor = color;
      document.getElementById('colorPicker').value = color;
    });
  });

  // Line width
  document.getElementById('lineWidth').addEventListener('input', function() {
    currentLineWidth = parseInt(this.value);
    updateLineWidthDisplay();
  });

  // Opacity
  document.getElementById('opacity').addEventListener('input', function() {
    currentOpacity = parseInt(this.value) / 100;
    updateOpacityDisplay();
  });

  // Fill color
  document.getElementById('fillColor').addEventListener('change', function() {
    currentFillColor = this.value;
  });

  // Form controls
  document.getElementById('fillShape').addEventListener('change', function() {
    fillShape = this.checked;
  });

  document.getElementById('bordeEstilo').addEventListener('change', function() {
    borderStyle = this.value;
  });

  // Buttons
  document.getElementById('btn-undo').addEventListener('click', undo);
  document.getElementById('btn-redo').addEventListener('click', redo);
  document.getElementById('btn-clear').addEventListener('click', clearCanvas);
  document.getElementById('btn-save').addEventListener('click', saveImage);

  // Zoom controls
  document.getElementById('zoom-in').addEventListener('click', zoomIn);
  document.getElementById('zoom-out').addEventListener('click', zoomOut);
  document.getElementById('zoom-reset').addEventListener('click', resetZoom);

  // Help system
  document.getElementById('help-toggle').addEventListener('click', function() {
    document.getElementById('shortcuts-help').classList.toggle('active');
  });

  document.getElementById('close-help').addEventListener('click', function() {
    document.getElementById('shortcuts-help').classList.remove('active');
  });

  // Keyboard shortcuts
  document.addEventListener('keydown', function(e) {
    if (e.ctrlKey || e.metaKey) {
      switch (e.key.toLowerCase()) {
        case 'z':
          e.preventDefault();
          if (e.shiftKey) {
            redo();
          } else {
            undo();
          }
          break;
        case 'y':
          e.preventDefault();
          redo();
          break;
        case 's':
          e.preventDefault();
          saveImage();
          break;
      }
    } else {
      switch (e.key) {
        case 'Delete':
        case 'Backspace':
          e.preventDefault();
          clearCanvas();
          break;
        case '+':
        case '=':
          e.preventDefault();
          zoomIn();
          break;
        case '-':
          e.preventDefault();
          zoomOut();
          break;
        case '0':
          e.preventDefault();
          resetZoom();
          break;
      }
    }
  });

  // Initialize UI
  updateLineWidthDisplay();
  updateOpacityDisplay();
});