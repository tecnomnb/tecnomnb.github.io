function buscar() {
    const searchInput = document.getElementById('searchInput');
    const resultados = document.getElementById('resultados');
    const busqueda = searchInput.value.toLowerCase().trim();
    resultados.innerHTML = '';
    if (!busqueda) {
        resultados.innerHTML = `
            <div class="bg-yellow-50 border border-yellow-200 text-yellow-800 px-6 py-4 rounded-lg">
                Por favor ingresa un valor para buscar.
            </div>
        `;
        return;
    }
    const resultadosFiltrados = baseDatos.filter(persona => 
        persona.dni.includes(busqueda) ||
        persona.nombre.toLowerCase().includes(busqueda)
    );
    if (resultadosFiltrados.length === 0) {
        resultados.innerHTML = `
            <div class="bg-red-50 border border-red-200 text-red-800 px-6 py-4 rounded-lg">
                No se encontraron resultados para "<strong>${busqueda}</strong>"
            </div>
        `;
    } else {
        let html = `
            <div class="mb-4 text-gray-600">
                Se encontraron <strong>${resultadosFiltrados.length}</strong> resultado(s)
            </div>
        `;

        resultadosFiltrados.forEach(persona => {
            let condicionColor = 'blue';
            if (persona.condicion === 'Ponente') condicionColor = 'purple';
            else if (persona.condicion === 'Organizador') condicionColor = 'red';
            else if (persona.condicion === 'Panelista') condicionColor = 'yellow';
            else if (persona.condicion === 'Asistente') condicionColor = 'green';
            
            html += `
                <div class="bg-white rounded-lg shadow-md p-6 mb-4 border-l-4 border-blue-500 hover:shadow-lg transition-shadow duration-300">
                    <div class="grid grid-cols-1 md:grid-cols-5 gap-4">
                        <div>
                            <p class="text-gray-500 text-sm font-medium">DNI</p>
                            <p class="text-xl font-bold text-gray-800">${persona.dni}</p>
                        </div>
                        <div>
                            <p class="text-gray-500 text-sm font-medium">Nombre Completo</p>
                            <p class="text-lg text-gray-800">${persona.nombre}</p>
                        </div>
                        <div>
                            <p class="text-gray-500 text-sm font-medium">Código</p>
                            <p class="text-lg text-gray-800 font-mono">${persona.codigo}</p>
                        </div>
                        <div>
                            <p class="text-gray-500 text-sm font-medium">Condición</p>
                            <span class="inline-block px-3 py-1 rounded-full text-sm font-semibold bg-${condicionColor}-100 text-${condicionColor}-800">
                                ${persona.condicion}
                            </span>
                        </div>
                        <div>
                            <p class="text-gray-500 text-sm font-medium">Certificado</p>
                            <a href="file/${persona.dni}.pdf" download class="inline-flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition-colors duration-300 cursor-pointer">
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
                                </svg>
                                Descargar
                            </a>
                        </div>
                    </div>
                </div>
            `;
        });

        resultados.innerHTML = html;
    }
}
document.getElementById('searchInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        buscar();
    }
});
window.addEventListener('load', function() {
    console.log('Base de datos cargada:', baseDatos);
});
