function fillSelectWithUser(user){
    var option=document.createElement('option');
    option.value=user.nom;
    option.innerHTML=user.nom;
    document.forms["validation"]["login"].append(option);
}
fillSelectWithUser(user);

users.forEach(function(element) {
    apendUserOnDOM(element,document.querySelector('.login'))
});