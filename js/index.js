
function onDOMLoaded(){
    var baliseLoad=document.getElementById('js-loaded');
    baliseLoad.style.backgroundColor="skyblue";
    baliseLoad.innerHTML="JS chargé !!!";
}

onDOMLoaded();
/**
 * fonction event de clck pour un user d'une liste
 * @param {MouseEvent} evt evenement de la souris injecter par addEventlistener
 *
 */
function onuserclick(evt){
    console.log(evt);
    var target=evt.target;
    console.log(this.querySelector('.user-name'));
    alert('un user a ete clique :'+this.querySelector('.user-name').innerHTML);

}
var desBalisesUserDeListe=document.querySelectorAll('.content-list-view-user')
//parcours de liste de noeuds selectionnés
// for (let index = 0; index < desBalisesUserDeListe.length; index++) {
//     console.log(desBalisesUserDeListe[index]);
//     desBalisesUserDeListe[index].addEventListener('click', onuserclick);
// }

desBalisesUserDeListe.forEach(function(element,index){
    element.addEventListener('click', onuserclick);
})

// for (var iterator of object) {
// console.log(iterator);
// }
    

// var uneBalise=document.querySelector('.content-list-view-user');
// uneBalise.addEventListener('click' ,onuserclick)

function onsubmitmessageform(evt) {
    evt.preventDefault();
    console.log(evt, document.forms);
    var message={
                value:document.forms["message-sender"]["message-value"].value,
                color:document.forms["message-sender"]["message-color"].value,
                to:document.forms["message-sender"]["message-to"].value,
                dateTime:new Date()
                }

    console.log(message);

    document.forms["message-sender"].reset();
    document.forms["message-sender"]["message-to"].selectedIndex=-1;
    apendMessageOnDOM(message,document.querySelector('.content-list-view-message'));

}

document.forms["message-sender"].addEventListener('submit',onsubmitmessageform);

function apendMessageOnDOM(message,messageTemplate) {
    var toFillTemplate=messageTemplate.cloneNode(true);
    toFillTemplate.querySelector('.message-datetime').innerHTML=message.dateTime.toLocaleString();
    toFillTemplate.querySelector('.message-content').innerHTML=message.value;
    //toFillTemplate.querySelector('.message-color').innerHTML=message.color;

    document.querySelector('#left-col').append(toFillTemplate);
}