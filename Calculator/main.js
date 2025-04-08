document.addEventListener('DOMContentLoaded', function() {
    const entradaElement = document.getElementById('entrada');
    const resultadoElement = document.getElementById('resultado');
    const botonesElement = document.querySelector('.botones');
    
    let valorActual = '0';
    let valorAnterior = '';
    let operacion = undefined;
    let resetearPantalla = false;
    
    function actualizarPantalla() {
        resultadoElement.textContent = valorActual;
        if (operacion != undefined) {
            entradaElement.textContent = `${valorAnterior} ${operacion}`;
        } else {
            entradaElement.textContent = '';
        }
    }
    
    function agregarNumero(numero) {
        if (valorActual === '0' || resetearPantalla) {
            valorActual = numero;
            resetearPantalla = false;
        } else {
            valorActual += numero;
        }
        actualizarPantalla();
    }
    
    function agregarDecimal() {
        if (resetearPantalla) {
            valorActual = '0.';
            resetearPantalla = false;
            actualizarPantalla();
            return;
        }
        
        if (!valorActual.includes('.')) {
            valorActual += '.';
        }
        actualizarPantalla();
    }
    
    function seleccionarOperacion(op) {
        if (valorActual === '') return;
        
        if (valorAnterior !== '') {
            calcular();
        }
        
        operacion = op;
        valorAnterior = valorActual;
        resetearPantalla = true;
        actualizarPantalla();
    }
    
    function calcular() {
        let calculo;
        const anterior = parseFloat(valorAnterior);
        const actual = parseFloat(valorActual);
        
        if (isNaN(anterior) || isNaN(actual)) return;
        
        switch (operacion) {
            case '+':
                calculo = anterior + actual;
                break;
            case '-':
                calculo = anterior - actual;
                break;
            case '×':
                calculo = anterior * actual;
                break;
            case '÷':
                if (actual === 0) {
                    calculo = 'Error';
                } else {
                    calculo = anterior / actual;
                }
                break;
            case '%':
                calculo = (anterior * actual) / 100;
                break;
            default:
                return;
        }
        
        valorActual = calculo.toString();
        operacion = undefined;
        valorAnterior = '';
        resetearPantalla = true;
        actualizarPantalla();
    }
    
    function limpiar() {
        valorActual = '0';
        valorAnterior = '';
        operacion = undefined;
        resetearPantalla = false;
        actualizarPantalla();
    }
    
    function borrarUltimo() {
        if (valorActual.length === 1) {
            valorActual = '0';
        } else {
            valorActual = valorActual.slice(0, -1);
        }
        actualizarPantalla();
    }
    
    botonesElement.addEventListener('click', e => {
        if (!e.target.matches('button')) return;
        
        const boton = e.target;
        const valorBoton = boton.textContent;
        
        if (!isNaN(valorBoton) || valorBoton === '0') {
            agregarNumero(valorBoton);
        } else if (valorBoton === '.') {
            agregarDecimal();
        } else if (['+', '-', '×', '÷', '%'].includes(valorBoton)) {
            seleccionarOperacion(valorBoton);
        } else if (valorBoton === '=') {
            calcular();
        } else if (valorBoton === 'AC') {
            limpiar();
        } else if (valorBoton === 'CE') {
            borrarUltimo();
        }
    });
    
    // Agregar soporte para teclado
    document.addEventListener('keydown', e => {
        if (e.key >= 0 && e.key <= 9) {
            agregarNumero(e.key);
        } else if (e.key === '.') {
            agregarDecimal();
        } else if (e.key === '+' || e.key === '-') {
            seleccionarOperacion(e.key);
        } else if (e.key === '*') {
            seleccionarOperacion('×');
        } else if (e.key === '/') {
            e.preventDefault();
            seleccionarOperacion('÷');
        } else if (e.key === '%') {
            seleccionarOperacion('%');
        } else if (e.key === 'Enter' || e.key === '=') {
            e.preventDefault();
            calcular();
        } else if (e.key === 'Backspace') {
            borrarUltimo();
        } else if (e.key === 'Escape') {
            limpiar();
        }
    });
    
    actualizarPantalla();
});