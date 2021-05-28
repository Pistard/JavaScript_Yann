function makeAuthentification(params) {
    xhr('vues/tchat.html',
        function (resp) {
            document.querySelector('#main').innerHTML = resp;
            document.forms["message-sender"].addEventListener('submit', onsubmitmessageform);
            xhr('http://localhost:5629/messages?_expand=user',
                function (fluxJsonDuServer) {
                    var arr = JSON.parse(fluxJsonDuServer);
                    console.log(arr);
                    arr.forEach(function (element) {
                        apendMessageOnDOM(element, messageTemplate);
                    });
                }
            );
        }
    );
}

function disconnect(params) {

}

var users = [];
function initAuthent(params) {
    xhr('vues/auth.html', function (response) {
        //montage de l'authentification dans le dom
        document.querySelector('#main').innerHTML = response;
        //ajout de l'event pour validation de l'authentification
        document.forms["auth"].addEventListener('submit', function (evt) {
            evt.preventDefault();
            var whoiamId = Number(document.forms["auth"]["login"].value);
            makeAuthentification(whoiamId);
        });
        //chargement global des users
        xhr('http://localhost:5629/users',
            function (fluxJsonDuServer) {
                users = JSON.parse(fluxJsonDuServer);
                //remplissage des users dans la liste d'authentification
                console.log(users);
                users.forEach(function (element) {
                    var opt = document.createElement('option');
                    opt.value = element.id;
                    opt.innerHTML = element.nom;
                });
            }
        );

    });

}