angular
    .module('game.ai.states', [
        'game.ai.states.global',
        'ces'
    ])
    .service('States', function(MonsterState, $log) {
            'use strict';

            // TODO is there a way to automatically load these?

            var states = {
                'monster': MonsterState
            };

            this.get = function(name, entity, config, world) {
                if (states[name]) {
                    var state = new states[name](entity, config, world);
                    return state;
                }
                else {
                    $log.error('State ' + name + ' not found!');
                }
            };
        }
    );