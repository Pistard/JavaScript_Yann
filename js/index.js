
function onDOMLoaded() {
    var baliseLoad = document.getElementById('js-loaded');
    baliseLoad.style.backgroundColor = "skyblue";
    baliseLoad.innerHTML = "JS chargé !!!";
}

onDOMLoaded();
/**
 * fonction event de clck pour un user d'une liste
 * @param {MouseEvent} evt evenement de la souris injecter par addEventlistener
 *
 */
function onuserclick(evt) {
    var userId = this.id.substring(5);
    //alert('un user a ete clique :' + userName);
    document.forms["message-sender"]["message-to"].value = userId;
}
var desBalisesUserDeListe = document.querySelectorAll('.content-list-view-user')
//parcours de liste de noeuds selectionnés

desBalisesUserDeListe.forEach(function (element, index) {
    element.addEventListener('click', onuserclick);
})

// var uneBalise=document.querySelector('.content-list-view-user');
// uneBalise.addEventListener('click' ,onuserclick)

function onsubmitmessageform(evt) {
    evt.preventDefault();
    console.log(evt, document.forms);
    var message = {
        value: document.forms["message-sender"]["message-value"].value,
        color: document.forms["message-sender"]["message-color"].value,
        to:Number (document.forms["message-sender"]["message-to"].value),
        dateTime: new Date().toISOString(),
        userId: whoiam.id
        //user:whoiam
    }

    console.log(message);

    document.forms["message-sender"].reset();
    document.forms["message-sender"]["message-to"].selectedIndex = -1;

    xhr('http://localhost:5629/messages',
        function (responseDuServeur) {
            responseDuServeur = JSON.parse(responseDuServeur);
            responseDuServeur.user = whoiam;
            apendMessageOnDOM(responseDuServeur, messageTemplate)
        },
        'POST',
        message
    );
    ;
}
function apendMessageOnDOM(message, messageTemplate) {
    var toFillTemplate = messageTemplate.cloneNode(true);
    toFillTemplate.querySelector('.message-datetime').innerHTML = message.dateTime.toString();
    toFillTemplate.querySelector('.message-content').innerHTML = message.value;
    toFillTemplate.querySelector('img').src = message.user.img;
    if(message.to===whoiam.id){
    toFillTemplate.querySelector('.message-content').style.fontStyle="italic"
    toFillTemplate.querySelector('.message-content').style.fontWeight="900"}

    //toFillTemplate.querySelector('.message-color').innerHTML=message.color;

    document.querySelector('#left-col').append(toFillTemplate);
}

function fillSelectWithUser(user) {
    var option = document.createElement('option');
    option.value = user.id;
    option.innerHTML = user.nom;
    document.forms["message-sender"]["message-to"].append(option);
}

function apendUserOnDOM(user, userTemplate) {
    var toFillUserTemplate = userTemplate.cloneNode(true);
    toFillUserTemplate.id='user-'+user.id;
    toFillUserTemplate.querySelector('.user-image').src = user.img;
    toFillUserTemplate.querySelector('.user-name').innerHTML = user.nom;
    toFillUserTemplate.addEventListener('click', onuserclick);

    document.querySelector('#right-col').append(toFillUserTemplate);
    fillSelectWithUser(user);
}
// users.forEach(function(element) {
//     apendUserOnDOM(element,document.querySelector('.content-list-view-user'))
//});

// xhr('vues/tchat.html',
//     function (resp) {
//         document.querySelector('#main').innerHTML = resp;
//         document.forms["message-sender"].addEventListener('submit', onsubmitmessageform);
//         xhr('http://localhost:5629/messages?_expand=user',
//             function (fluxJsonDuServer) {
//                 var arr = JSON.parse(fluxJsonDuServer);
//                 console.log(arr);
//                 arr.forEach(function (element) {
//                     apendMessageOnDOM(element, messageTemplate);
//                 });
//             }
//         );
//         xhr('http://localhost:5629/users',
//             function (fluxJsonDuServer) {
//                 var arr = JSON.parse(fluxJsonDuServer);
//                 console.log(arr);
//                 arr.forEach(function (element) {
//                     apendUserOnDOM(element, userTemplate)
//                 });
//             }
//         );
//     }
// );



// messages.forEach(function(element){
//     var leBonUserDeLidDuMessage= users.find(function(userElement){return element.userId===userElement.id});
//     element.user=leBonUserDeLidDuMessage;
//     console.log(element);
//     apendMessageOnDOM(element,document.querySelector('.content-list-view-message'))
