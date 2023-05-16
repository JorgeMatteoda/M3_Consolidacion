
let presupuestoTotal = 0, gastosTotales = 0, saldo = 0, gastoMonto = [];


// presupuesto total -- ok
function calcular() {
  const presupuestoInput = document.getElementById("ingresaPresupuesto");
  presupuestoTotal = parseInt(presupuestoInput.value);
  document.getElementById("presupuestoTotal").textContent = presupuestoTotal;

  saldo = presupuestoTotal - gastosTotales;
  document.getElementById("saldo").textContent = saldo;
}




//  añadir   gasto
function añadirGasto() {
  const nombreGastoInput = document.getElementById("nombreGastoIngresado");
  const cantidadGastoInput = document.getElementById("cantidadGastoIngresado");

  const nombreGasto = nombreGastoInput.value;
  const cantidadGasto = parseInt(cantidadGastoInput.value);

  gastoMonto.push([nombreGasto, cantidadGasto]);
/*   console.log(gastoMonto); */

  gastosTotales = gastosTotales + cantidadGasto;
  document.getElementById("gastosTotales").textContent = gastosTotales;
  saldo = presupuestoTotal - gastosTotales;
  /* console.log(saldo); */

  document.getElementById("saldo").textContent = saldo;
  actualizarTabla(); // actualizar la tabla de gastos
  nombreGastoInput.value = "";
  cantidadGastoInput.value = "";
}

//  para borrar un gasto
function borrarGasto(index) {
  const gastoEliminado = gastoMonto.splice(index, 1)[0]; // elimina el gasto de la lista y guarda su valor
  gastosTotales = gastosTotales - gastoEliminado[1]; // resta el valor del gasto eliminado a los gastos totales
  //console.log(gastosTotales);
  
  saldo = presupuestoTotal - gastosTotales;
  //console.log(saldo);

  document.getElementById("gastosTotales").textContent = gastosTotales;
  document.getElementById("saldo").textContent = saldo;
  actualizarTabla(); // actualizar la tabla de gastos
}





// actualizar  tabla de gastos
function actualizarTabla() {
  const tablaGastos = document.getElementById("tablaGastos");
  tablaGastos.innerHTML = "";

  gastoMonto.forEach((gasto, index) => {
    const fila = document.createElement("tr");
    const nombre = document.createElement("th");
    const cantidad = document.createElement("td");
    const borrarBtn = document.createElement("button"); // btn eliminar
    
    borrarBtn.textContent = "Eliminar"; //  texto 
    borrarBtn.classList.add("btn", "btn-outline-danger"); // repite botón
    borrarBtn.addEventListener("click", () => { // event listener al botón
      borrarGasto(index); // se pasa el índice del gasto que se quiere eliminar
    });
    
    nombre.textContent = gasto[0];
    
    cantidad.textContent = gasto[1];
    
    
    fila.appendChild(nombre);
    fila.appendChild(cantidad);
    fila.appendChild(borrarBtn); // agrega  botón a la fila
    tablaGastos.appendChild(fila);
  });
}


// Botón borrar gasto y agrega event listener
const borrarGastoBtn = document.getElementById("borrarGastoBtn");
borrarGastoBtn.addEventListener("click", borrarGasto);
