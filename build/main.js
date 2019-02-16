"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const game_1 = require("./game");
const ko = require("knockout");
const $ = require("jquery");
$(document).ready(function () {
    const game = new game_1.Game();
    ko.applyBindings(game);
    game.start();
});
