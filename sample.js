/* Création des players */

$.ajax({
    type:"POST",
    url:"/players", 
    data:JSON.stringify({
    	firstName:"John", 
    	lastName:"Doe",
    	framework:"Vanilla.js",
    	twitter:"@johndoe",
        picture:"john.png"
    }),
    error : function(err){console.log("Erreur", err);},
    success : function(data){ console.log(data);}
});

$.ajax({
    type:"POST",
    url:"/players", 
    data:JSON.stringify({
    	firstName:"Sébastien", 
    	lastName:"Letélié",
    	framework:"Angular.js",
    	twitter:"@sebmade"
    }),
    error : function(err){console.log("Erreur", err);},
    success : function(data){ console.log(data);}
});

$.ajax({
    type:"POST",
    url:"/players", 
    data:JSON.stringify({
    	firstName:"Paul", 
    	lastName:"Chavard",
    	framework:"Ember.js",
    	twitter:"@tchak13"
    }),
    error : function(err){console.log("Erreur", err);},
    success : function(data){ console.log(data);}
});

$.ajax({
    type:"POST",
    url:"/players", 
    data:JSON.stringify({
    	firstName:"Philippe", 
    	lastName:"Charrière",
    	framework:"Backbone.js",
    	twitter:"@k33g_org"
    }),
    error : function(err){console.log("Erreur", err);},
    success : function(data){ console.log(data);}
});

/* Lister les Players */

$.ajax({
    type:"GET",
    url:"/players", 
    error : function(err){console.log("Erreur", err);},
    success : function(data){ console.log(data);}
});

/* get player by id */

$.ajax({
    type:"GET",
    url:"/players/dfc7682d-2496-4004-b3dd-30e7746396aa", 
    error : function(err){console.log("Erreur", err);},
    success : function(data){ console.log(data);}
});

/* update player 
	
	ps : faut tout republier, je n'ai pas géré les updates partiels

*/

$.ajax({
    type:"PUT",
    url:"/players/dfc7682d-2496-4004-b3dd-30e7746396aa",
    data:JSON.stringify({
    	firstName:"JOHN", 
    	lastName:"DOE",
    	framework:"Vanilla.js",
    	twitter:"@johndoe"
    }),     
    error : function(err){console.log("Erreur", err);},
    success : function(data){ console.log(data);}
});

/* Supprimer un player */

$.ajax({
    type:"DELETE",
    url:"/players/dfc7682d-2496-4004-b3dd-30e7746396aa", 
    error : function(err){console.log("Erreur", err);},
    success : function(data){ console.log(data);}
});

/*faire une requête sur les clés*/

$.ajax({
    type:"GET",
    url:"query/players/*:twitter:@k33g_org*", 
    error : function(err){console.log("Erreur", err);},
    success : function(data){ console.log(data);}
});

$.ajax({
    type:"GET",
    url:"query/players/*:lastName:Ch*", 
    error : function(err){console.log("Erreur", err);},
    success : function(data){ console.log(data);}
});

/*
pour les players possibilité de rechercher sur (attention à la casse)

	firstName
	lastName
	framework
	twitter
	 
*/

/* ROUNDS 

	Les urls de crud sont sur le même principe que les players
	
	/rounds
	/rounds/:id
	/query/rounds/:query
	
	interrogeable uniquement sur "number"

*/

/*
	il n'y a rien de relationnel, j'enregistre ça dans un couple key/value redis
*/

$.ajax({
    type:"POST",
    url:"/rounds", 
    data:JSON.stringify({
    	number:1,
    	opponentOne:{
			firstName:"Paul", 
			lastName:"Chavard",
			framework:"Ember.js",
			twitter:"@tchak13"    	
    	},    	
    	opponentTwo:{
	    	firstName:"Philippe", 
	    	lastName:"Charrière",
	    	framework:"Backbone.js",
	    	twitter:"@k33g_org"    	
    	},
    	opponentOneScore : 0,
    	opponentTwoScore : 0,

    }),
    error : function(err){console.log("Erreur", err);},
    success : function(data){ console.log(data);}
});

$.ajax({
    type:"POST",
    url:"/rounds", 
    data:JSON.stringify({
    	number:2,
    	opponentOne:{
    		//id
			firstName:"Paul", 
			lastName:"Chavard",
			framework:"Ember.js",
			twitter:"@tchak13"    	
    	},    	
    	opponentTwo:{
    		//id
	    	firstName:"Sébastien", 
	    	lastName:"Letélié",
	    	framework:"Angular.js",
	    	twitter:"@sebmade"	
    	},
    	opponentOneScore : 0,
    	opponentTwoScore : 0,

    }),
    error : function(err){console.log("Erreur", err);},
    success : function(data){ console.log(data);}
});

$.ajax({
    type:"POST",
    url:"/rounds", 
    data:JSON.stringify({
    	number:3,
    	opponentOne:{
	    	firstName:"Sébastien", 
	    	lastName:"Letélié",
	    	framework:"Angular.js",
	    	twitter:"@sebmade"	  	
    	},    	
    	opponentTwo:{
	    	firstName:"Philippe", 
	    	lastName:"Charrière",
	    	framework:"Backbone.js",
	    	twitter:"@k33g_org"    	
    	},
    	opponentOneScore : 0,
    	opponentTwoScore : 0,

    }),
    error : function(err){console.log("Erreur", err);},
    success : function(data){ console.log(data);}
});

/* FIGHTS 

	urls même principe

*/

var 
	round1 = {
    	number:1,
    	opponentOne:{
			firstName:"Paul", 
			lastName:"Chavard",
			framework:"Ember.js",
			twitter:"@tchak13"    	
    	},    	
    	opponentTwo:{
	    	firstName:"Philippe", 
	    	lastName:"Charrière",
	    	framework:"Backbone.js",
	    	twitter:"@k33g_org"    	
    	},
    	opponentOneScore : 0,
    	opponentTwoScore : 0,

    },
    round2 = {
    	number:2,
    	opponentOne:{
    		//id
			firstName:"Paul", 
			lastName:"Chavard",
			framework:"Ember.js",
			twitter:"@tchak13"    	
    	},    	
    	opponentTwo:{
    		//id
	    	firstName:"Sébastien", 
	    	lastName:"Letélié",
	    	framework:"Angular.js",
	    	twitter:"@sebmade"	
    	},
    	opponentOneScore : 0,
    	opponentTwoScore : 0,

    },
    round3 = {
    	number:3,
    	opponentOne:{
	    	firstName:"Sébastien", 
	    	lastName:"Letélié",
	    	framework:"Angular.js",
	    	twitter:"@sebmade"	  	
    	},    	
    	opponentTwo:{
	    	firstName:"Philippe", 
	    	lastName:"Charrière",
	    	framework:"Backbone.js",
	    	twitter:"@k33g_org"    	
    	},
    	opponentOneScore : 0,
    	opponentTwoScore : 0,

    }; 


$.ajax({
    type:"POST",
    url:"/fights", 
    data:JSON.stringify({
		name : "Il ne doit en rester qu'un",
		rounds : [round1,round2,round3]
    }),
    error : function(err){console.log("Erreur", err);},
    success : function(data){ console.log(data);}
});


