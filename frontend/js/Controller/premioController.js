import {
   getAllPremios,
   createPremio,
   updatePremio,
   deletePremio
} from "../Service/premioServices.js";

document.addEventListener("DOMContentLoaded", () => {
   const tablaPremio = document.getElementById("tabla-Premio");
   const formPremio = document.getElementById("form-premio");
   const modalPremio = document.getElementById("modal-premio");
   const lbModalTitulo = document.getElementById("modal-premio-titulo");
   const btnAddPremio = document.getElementById("btn-show-modal-premio");

   //Carga Inicial
   loadPremio();

   //Abrir modal para agregar un premio
   btnAddPremio.addEventListener("click", () => {
       formPremio.reset(); //Para limpiar el form
       document.getElementById("premio-id-editar").value = ""; //Limpia el Id oculto
       lbModalTitulo.textContent = "Agregar Premio";
       modalPremio.classList.remove('hidden');
   });

   //Botón para salir/cancelar en el modal
   formPremio.querySelector(".btn-cancelar").addEventListener('click', () => {
       modalPremio.classList.add('hidden');
   });

   //Envío del formulario para poder crear y editar
   formPremio.addEventListener("submit", async (e) => {
       e.preventDefault(); //Evita que se recargue la página

       //Recolertar Datos del Formulario
       const id = document.getElementById("premio-id-editar").value;
       const data = {
           ID_PREMIO: document.getElementById("premio-IdPre").value,
           NOMBRE_PREMIO: document.getElementById("premio-nombreP").value,
           CATEGORIA: document.getElementById("premio-categoriaP").value,
           ANO_PREMIO: document.getElementById("premio-anoP").value,
           RESULTADO: document.getElementById("premio-resultadoP").value,
           FECHA_REGISTRO: document.getElementById("premio-fechaP").value,
       };
       try {
           if (id) { //Si hay un ID actualizará
               await updatePremio(id, data);
           } else { //Si no, creamos uno nuevo
               await createPremio(data);
           }
           modalPremio.classList.add('hidden'); //Ocultamos el modal
           await loadPremio(); //Recargamos la tabla
       } catch (err) {
           console.error("Error al guardar:", err);
           alert("Error al guardar. Revisa la consola");
       }
   });

   //Cargar y mostrar datos
   async function loadPremio() {
       try {
           const respuesta = await getAllPremios();
           const premios = respuesta.content;

           tablaPremio.innerHTML = ""; //Limpiamos

           // Si no hay premios, muestra un mensaje
           if (!premios || premios.length === 0) {
               tablaPremio.innerHTML = '<tr><td colspan="7" class="p-3 text-center">No hay premios registrados.</td></tr>';
               return;
           }

           premios.forEach(premio => {
               const fila = document.createElement('tr');

               fila.innerHTML = `
                   <td class="p-3">${premio.ID_PREMIO}</td>
                   <td class="p-3">${premio.NOMBRE_PREMIO}</td>
                   <td class="p-3">${premio.CATEGORIA}</td>
                   <td class="p-3">${premio.ANO_PREMIO}</td>
                   <td class="p-3">${premio.RESULTADO}</td>
                   <td class="p-3">${premio.FECHA_REGISTRO}</td>
                   <td class="p-3 text-center">
                       <div class="flex justify-center gap-2">
                           <button class="btn-editar-premio text-blue-600" data-id="${premio.ID_PREMIO}">Editar</button>
                           <button class="btn-eliminar-premio text-red-600" data-id="${premio.ID_PREMIO}" data-nombre="${premio.NOMBRE_PREMIO}">Eliminar</button>
                       </div>
                   </td>
               `;

               // Evento para el botón EDITAR de esta fila
               fila.querySelector('.btn-editar-premio').addEventListener('click', () => {
                   document.getElementById("premio-id-editar").value = premio.ID_PREMIO;
                   document.getElementById("premio-IdPre").value = premio.ID_PREMIO;
                   document.getElementById("premio-nombreP").value = premio.NOMBRE_PREMIO;
                   document.getElementById("premio-categoriaP").value = premio.CATEGORIA;
                   document.getElementById("premio-anoP").value = premio.ANO_PREMIO;
                   document.getElementById("premio-resultadoP").value = premio.RESULTADO;
                   document.getElementById("premio-fechaP").value = premio.FECHA_REGISTRO;
                   lbModalTitulo.textContent = "Editar Premio";
                   modalPremio.classList.remove('hidden');
               });

               // Evento para el botón ELIMINAR de esta fila
               fila.querySelector('.btn-eliminar-premio').addEventListener('click', async (e) => {
                   const nombre = e.currentTarget.dataset.nombre;
                   const id = e.currentTarget.dataset.id;
                   if (confirm(`¿Seguro que quieres eliminar el premio "${nombre}"?`)) {
                       await deletePremio(id);
                       await loadPremio(); // Recargamos la tabla con la función correcta
                   }
               });

               tablaPremio.appendChild(fila);
           });
       } catch (err) {
           console.error("Error al cargar datos:", err);
           tablaPremio.innerHTML = '<tr><td colspan="7" class="text-center text-red-500">Error al cargar datos. Revisa la conexión con la API.</td></tr>';
       }
   }
});