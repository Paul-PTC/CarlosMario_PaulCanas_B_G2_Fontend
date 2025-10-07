const API_URL = "http://localhost:8080/api/premios"

//GET
export async function getPremios() {
    const res = await fetch(`${API_URL}/getAllPremios`);
    if(!res.ok)throw new Error ("Error al obtener los datos.");
    return res.json();
}

//CREATE
export async function createPremio(data) {
    const res = await fetch(`${API_URL}/newPremio`, {
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify(data),
    });
    if(!res.ok)throw new Error ("Error al crear premio.");
}

//UPDATE
export async function updatePremio(id, data) {
    const res = await fetch(`${API_URL}/updatePremio/${id}`,{
        method:"PUT",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify(data),
    });
    if(!res.ok)throw new Error ("Error al actualizar el premio.");
}

//DELETE
export async function deletePremio(id) {
    const res = await fetch(`${API_URL}/deletePremio/${id}`,{
        method: "DELETE",
    });
    if(!res.ok)throw new Error ("Error al eliminar el premio.");
}