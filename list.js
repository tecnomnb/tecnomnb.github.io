window.addEventListener('load', function() {
    cargarTabla();
    mostrarEstadisticas();
});

function cargarTabla() {
    const tableBody = document.getElementById('tableBody');
    let html = '';

    baseDatos.forEach((persona, index) => {
        let condicionColor = 'blue';
        if (persona.condicion === 'Ponente') condicionColor = 'purple';
        else if (persona.condicion === 'Organizador') condicionColor = 'red';
        else if (persona.condicion === 'Panelista') condicionColor = 'yellow';
        else if (persona.condicion === 'Asistente') condicionColor = 'green';
        
        html += `
            <tr class="hover:bg-gray-50 transition-colors duration-200">
                <td class="px-6 py-4 text-gray-800 font-semibold">${index + 1}</td>
                <td class="px-6 py-4 text-gray-800 font-mono font-bold">${persona.dni}</td>
                <td class="px-6 py-4 text-gray-800">${persona.nombre}</td>
                <td class="px-6 py-4 text-gray-800 font-mono">${persona.codigo}</td>
                <td class="px-6 py-4">
                    <span class="inline-block px-3 py-1 rounded-full text-sm font-semibold bg-${condicionColor}-100 text-${condicionColor}-800">
                        ${persona.condicion}
                    </span>
                </td>
            </tr>
        `;
    });

    tableBody.innerHTML = html;
}

function mostrarEstadisticas() {
    const stats = document.getElementById('stats');
    
    const totalPersonas = baseDatos.length;
    const asistentes = baseDatos.filter(p => p.condicion === 'Asistente').length;
    const ponentes = baseDatos.filter(p => p.condicion === 'Ponente').length;
    const organizadores = baseDatos.filter(p => p.condicion === 'Organizador').length;
    const panelistas = baseDatos.filter(p => p.condicion === 'Panelista').length;

    const estadisticasHTML = `
        <div class="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <p class="text-gray-500 text-sm font-medium mb-1">Total de Personas</p>
            <p class="text-4xl font-bold text-blue-600">${totalPersonas}</p>
        </div>
        <div class="bg-green-50 border border-green-200 rounded-lg p-6">
            <p class="text-gray-500 text-sm font-medium mb-1">Asistentes</p>
            <p class="text-4xl font-bold text-green-600">${asistentes}</p>
        </div>
        <div class="bg-purple-50 border border-purple-200 rounded-lg p-6">
            <p class="text-gray-500 text-sm font-medium mb-1">Ponentes</p>
            <p class="text-4xl font-bold text-purple-600">${ponentes}</p>
        </div>
        <div class="bg-red-50 border border-red-200 rounded-lg p-6">
            <p class="text-gray-500 text-sm font-medium mb-1">Organizadores</p>
            <p class="text-4xl font-bold text-red-600">${organizadores}</p>
        </div>
    `;
    if (panelistas > 0) {
        stats.innerHTML = estadisticasHTML + `
            <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-6 col-span-1 md:col-span-1">
                <p class="text-gray-500 text-sm font-medium mb-1">Panelistas</p>
                <p class="text-4xl font-bold text-yellow-600">${panelistas}</p>
            </div>
        `;
    } else {
        stats.innerHTML = estadisticasHTML;
    }
    
    return;

    stats.innerHTML = estadisticasHTML;
}
