/**
 * Fonction d'appel réseau pour les pages vues et ressources d'API
 * @param {URL} url url de la ressource à récupérer
 * @param {Function} callback fonction à exécuter une fois la fin de la réception des données
 * @param {String} method méthode HTTP soit GET/POST/PATCH/PUT/DELETE default: GET
 * @param {Object} body corps objet js de la requete pour l'envoi Default: undefined
 */
function xhr(url, callback, method, body) {
    //mise en place de parametre par défaut
    if (undefined === method) {
        method = 'GET'
    }
    var xhr = new XMLHttpRequest()
    xhr.open(method, url);
    xhr.setRequestHeader("Content-Type","application/json");
    // xhr.open('GET', 'vues/tchat.html')
    xhr.onreadystatechange = function () {
        if (xhr.readyState < XMLHttpRequest.DONE) return;
        if (xhr.status > 400) return;
        // document.querySelector('#main').innerHTML = xhr.response;
        callback(xhr.response)
        console.log(xhr);
    }
    xhr.send(JSON.stringify(body))
}