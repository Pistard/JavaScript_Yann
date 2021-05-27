function xhr(url, callback, method) {
    //mise en place de parametre par défaut
    if (undefined === method) {
        method = 'GET'
    }
    var xhr = new XMLHttpRequest()
    xhr.open(method, url)
    // xhr.open('GET', 'vues/tchat.html')
    xhr.onreadystatechange = function () {
        if (xhr.readyState < XMLHttpRequest.DONE) return;
        if (xhr.status > 400) return;
        // document.querySelector('#main').innerHTML = xhr.response;
        callback(xhr.response)
        console.log(xhr.response);
    }
    xhr.send()
}

xhr('vues/tchat.html',
    function (resp) { 
        document.querySelector('#main').innerHTML = resp; }
);

xhr('http://localhost:5629/messages?_expand=user',
    function (fluxJsonDuServer) {
        var arr = JSON.parse(fluxJsonDuServer);
        console.log(arr);
    }
)