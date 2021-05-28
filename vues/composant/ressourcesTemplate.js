var userTemplate=null;
var messageTemplate=null;

function getUserTemplate(){
    xhr('vues/composant/user.html', function(rep){
        userTemplate=document.createElement('div');
        userTemplate.innerHTML=rep;
        userTemplate=userTemplate.firstChild;

    },undefined, undefined, false)
}

function getMessageTemplate(){
    xhr('vues/composant/message.html', function(rep){
        messageTemplate=document.createElement('div');
        messageTemplate.innerHTML=rep;
        messageTemplate=messageTemplate.firstChild;
        
    },undefined, undefined, false)
}

function initTemplate(){
    getUserTemplate();
    getMessageTemplate();
}
initTemplate();