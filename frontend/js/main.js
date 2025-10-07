document.addEventListener("DOMContentLoaded", () =>{
    const sectionPremios=document.getElementById('section-premios');
    const navPremios=document.getElementById('nav-premios');

    function actualizarNavegacion(vistaActiva){
        sectionPremios.classList.add('hidden');
        navPremios.classList.remove('active-nav');
        if(vistaActiva === 'Premios'){
            sectionPremios.classList.remove('hidden');
            navPremios.classList.add('active-nav;')
        }
    }

    //Carga Inicial
    actualizarNavegacion('Premios');

    navPremios.addEventListener('click', (e) => {
        e.preventDefault();
        actualizarNavegacion('Premios');
    });
})
