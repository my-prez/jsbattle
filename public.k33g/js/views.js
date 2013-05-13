/*=== VUE PLAYER ===*/

App.Views.Player = Backbone.View.extend({
    initialize : function() {
        /* "compilation" du template */
        this.template = _.template(App.Templates["playerView"]); 
    },
    render : function() {
        this.$el.html(
            this.template({
                player:this.model.toJSON()
            })
        );
        return this;
    },
    events:{
        "click :checkbox" : function(event) {
            this.model.set({
                ready:event.currentTarget.checked
            });
            //this.parentView.checkSelectedPlayers();            
        }
        
    }
})

/*=== VUE PLAYERS ===*/
App.Views.Players = Backbone.View.extend({
    el : "[name='players']", /* div */
    initialize : function() {
        /* "compilation" du template */
        this.template = _.template(App.Templates["playersView"]); 
    },
    appendSubViews : function(currentView) {
        
        this.collection.each(function(player) {
            var subView = new App.Views.Player({
                model : player
            });
            subView.parentView = currentView;            
            currentView.$("[name='players_list']").append(subView.render().el);
        })
    },
    render : function() {        
        this.$el.html(this.template({}));
        this.appendSubViews(this);
        //this.checkSelectedPlayers();
    }

});