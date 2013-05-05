'use strict';

angular.module('public.sebmadeApp')
    .factory('api', function ($http, $log) {
        return {
            getPlayers: function () {
                return $http.get("/players")
                    .error(function () {
                        $log.error("/players fail")
                    });
            },
            getPlayerById: function (playerId) {
                return $http.get("/players/" + playerId)
                    .error(function () {
                        $log.error("/playerById fail")
                    });
            },
            addPlayer: function (player) {
                return $http.post("/players", player)
                    .error(function () {
                        $log.error("player add fail")
                    });
            },
            updatePlayer: function (player) {
                return $http.put("/players/" + player.id, player)
                    .error(function () {
                        $log.error("player update fail")
                    });

            },
            removePlayer: function (player) {
                return $http.delete("/players/" + player.id)
                    .error(function () {
                        $log.error("player remove fail");
                    });
            },
            getFights: function () {
                return $http.get("/fights")
                    .error(function () {
                        $log.error("/fights fail")
                    });
            },
            addFight: function (fight) {
                return $http.post("/fights", fight)
                    .error(function () {
                        $log.error("fight add fail")
                    });
            },
            updateFight: function (fight) {
                return $http.put("/fights/" + fight.id, fight)
                    .error(function () {
                        $log.error("fight udpdate fail")
                    });
            },
            removeFight: function (fight) {
                return $http.delete("/fights/" + fight.id)
                    .error(function () {
                        $log.error("fight remove fail");
                    });
            }
        };
    });
