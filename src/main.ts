import {Game} from './game';
import * as ko from "knockout";
import * as $ from 'jquery';

$(document).ready( function(){
    const game = new Game();
    ko.applyBindings(game);
    game.start();
});