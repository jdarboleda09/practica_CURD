async function getUsers() {
    const res = await fetch('/api/users');
    const users = await res.json();
    const list = document.getElementById('userList');
    list.innerHTML = '';
    users.forEach(user => {
        list.innerHTML += `
            <li>
            ${user.nombre} - ${user.telefono} - ${user.correo}
            <button onclick="editUser(${user.id}, '${user.nombre}', '${user.telefono}','${user.correo}')">Editar</button>
            <button onclick="deleteUser(${user.id})">Eliminar</button>
            </li>`;
    });
}

async function saveUser() {
    const id = document.getElementById('userId').value;
    const nombre = document.getElementById('nombre').value;
    const telefono = document.getElementById('telefono').value;
    const correo = document.getElementById('correo').value;
    if (id) {
        await fetch(`/api/users/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nombre, telefono, correo })
        });
    } else {
        await fetch('/api/users', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nombre, telefono, correo })
        });
    }
    clearForm();
    getUsers();
}

function editUser(id, nombre, telefono, correo) {
    document.getElementById('userId').value = id;
    document.getElementById('nombre').value = nombre;
    document.getElementById('telefono').value = telefono;
    document.getElementById('correo').value = correo;
}
async function deleteUser(id) {
    await fetch(`/api/users/${id}`, { method: 'DELETE' });
    getUsers();
}
function clearForm() {
    document.getElementById('userId').value = '';
    document.getElementById('nombre').value = '';
    document.getElementById('telefono').value = '';
    document.getElementById('correo').value = '';
}