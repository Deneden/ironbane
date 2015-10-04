angular
    .module('server.services.cheats', [
        'server.services.activeWorlds',
        'game.world-root',
        'services.items'
    ])
    .run(function ($rootWorld, $activeWorlds, ItemService) {
        'use strict';

        Meteor.methods({
            updateCheats: function (cheats) {
                if (!this.userId || !Roles.userIsInRole(this.userId, ['game-master'])) {
                    throw new Meteor.Error('not-authorized');
                }

                console.log(cheats);

                // return result;
            },
            giveItem: function (itemName) {
                if (!this.userId || !Roles.userIsInRole(this.userId, ['game-master'])) {
                    throw new Meteor.Error('not-authorized');
                }
                
                var item = ItemService.getItemTemplate(itemName);
                if (!item) {
                    return;
                }

                var entity, eWorld, userId = this.userId;
                angular.forEach($activeWorlds, function (world) {
                    if (entity) {
                        return;
                    }
                    world.forEachEntity('player', function (ent) {
                        if (entity) {
                            return;
                        }
                        if (ent.owner === userId) {
                            entity = ent;
                            eWorld = world;
                            return;
                        }
                    });
                });
                
                if (entity && eWorld) {
                    var inv = eWorld.getSystem('inventory');
                    inv.addItem(entity, item);
                }
            }
        });

    });