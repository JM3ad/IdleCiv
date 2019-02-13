import * as ko from 'knockout';
import {Producer} from '../producer';

export class IncomeCalculator {
    calculateFoodIncome: (producers : Producer[]) => number;
    calculateWoodIncome: (producers : Producer[]) => number;    

    constructor() {
        this.calculateFoodIncome = function(producers: Producer[]){
            return ko.unwrap(producers).reduce(function(result : number, v : Producer, i : number) {
                return result + v.foodIncome() * v.quantity();
            }, 0);
        }
        this.calculateWoodIncome = function(producers: Producer[]){
            return ko.unwrap(producers).reduce(function(result : number, v : Producer, i : number) {
                return result + v.woodIncome() * v.quantity();
            }, 0);
        }
    }
}