import {Game} from './game';
import * as ko from "knockout";
import * as $ from 'jquery';

$(document).ready( function(){
    const game = new Game();
    game.start();
    ko.applyBindings(game);
});