
vous allez voir un paquet de mauvaises pratiques
je fais les choses d'une certaine façon, il y a plus éléguant ... mais ...


##Structure de l'application

je mets le code de mon application Backbone dans un objet global

    window.App = {
        Models: {},
        Collections: {},
        Routers: {},
        Views: {},
        init: function(){
            App.router = new App.Routers.main();
            Backbone.history.start();
        }
    };

    $(function() {
        App.init();
    });

###Notations

- "Classes" & objets : Pascal Case
- instances : CamelCase
