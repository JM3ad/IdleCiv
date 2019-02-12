import {Building} from './building';
import * as ko from 'knockout';

export class Game {
    buildings: KnockoutObservableArray<Building>;
    money: KnockoutObservable<number>;
    addValue: () => void;
    makeMoney: () => void;

    constructor() {
        this.money = ko.observable(0);
        this.buildings = ko.observableArray();
        this.addValue = function() {
            const total = ko.unwrap(this.buildings).reduce(function(result : number, v : Building, i : number) {
                return result + ko.unwrap(v.value);
            }, 0);
            this.money(this.money() + total);
        }
        this.makeMoney = function() {
            this.money(this.money() + 1);
        }
    }
}