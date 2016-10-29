# toolstip
Ajoutez un guide utilisateur à votre application / site web en quelques lignes :-)

1 : Inclure le fichier javascript : "https://raw.githubusercontent.com/Tchangang/toolstip/master/tips.js"

2 : Inclure le fichier de style : "https://cdn.rawgit.com/Tchangang/toolstip/master/tips.css"

3 - Créez une div avec la classe tipstools, les attributs tips-msg (texte à afficher pour guider l'utilisateur) et tips-pos (numéro de l'étape dans le guide).
Ex : 
< div class="tipstools" style="margin-top:50x;background:white;margin-top:20px;font-size:14px;"  tips-msg="Bonjour, découvez mon texte à l'écran" tips-pos="3">
	lorem ipsum
< / div>

4 - Lancer le javascript 

    $(document).ready(function(){
    	//CREATION DE MON GUIDE
    	var obj = new myTips();
    	//REGLER LE TEXTE DU BOUTON SUIVANT
    	obj.setNexttext('Suivant');
    	//REGLER LE TEXTE DU BOUTON PRECEDENT
    	obj.setPrevtext('Suivant');
    	//REGLER LE TEXTE DU BOUTON TERMINER
    	obj.setFinishtext('Suivant');

    	//ON lANCE L'INSTALLATION DE NOTRE GUIDE
		obj.init_tooltips();

		//ON lANCE NOTRE GUIDE (AFFICHAGE A L'ÉCRAN)
		obj.restart();
    });

5 - Démo : https://tchangang.github.io/toolstip/index.html
