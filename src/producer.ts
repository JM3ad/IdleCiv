import * as ko from 'knockout';

export class Producer {
    name: KnockoutObservable<string>;
    foodIncome: KnockoutObservable<number>;
    woodIncome: KnockoutObservable<number>;
    foodCost: KnockoutObservable<number>;
    woodCost: KnockoutObservable<number>;
    quantity: KnockoutObservable<number>;
    purchase: () => void;

    constructor(name: string, foodIncome: number, woodIncome: number, foodCost: number, woodCost: number) {
        this.name = ko.observable(name);
        this.foodIncome = ko.observable(foodIncome);
        this.woodIncome = ko.observable(woodIncome);
        this.foodCost = ko.observable(foodCost);
        this.woodCost = ko.observable(woodCost);
        this.quantity = ko.observable(0);
        this.purchase = function(){
            const currentFoodCost = this.foodCost();
            if (currentFoodCost > 0){
                this.foodCost(Math.round(currentFoodCost * 1.4) + 1);
            }
            const currentWoodCost = this.woodCost();
            if (currentWoodCost > 0){
                this.woodCost(Math.round(currentWoodCost * 1.4) + 1);
            }
            this.quantity(this.quantity() + 1);
        }
    }
}