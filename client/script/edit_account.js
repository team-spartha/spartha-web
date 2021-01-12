var container_onglets = document.querySelectorAll('.container_onglets a')

for(var i = 0; i < container_onglets.length; i++){
  container_onglets[i].addEventListener('click', function (e){

    var li = this
    var div = this.parentNode.parentNode.parentNode

    if(li.classList.contains('active')){
      return false
    }

    //On retire la classe active de l'onglet actif
    div.querySelector('.container_onglets .active').classList.remove('active')
    //On ajoute la classe active à l'onglet actuel
    li.classList.add('active')

    //On retire la class active sur le contenu actif
    div.querySelector('.contenu.activeContenu').classList.remove('activeContenu')
    div.querySelector(this.getAttribute('href')).classList.add('activeContenu')
  })
}