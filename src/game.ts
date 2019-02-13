import {Producer} from './producer';
import * as ko from 'knockout';
import {IncomeCalculator} from './helpers/incomeCalculator';
import {ProducerHelper} from './helpers/producerHelper';

export class Game {
    producers: KnockoutObservableArray<Producer>;
    food: KnockoutObservable<number>;
    wood: KnockoutObservable<number>;
    addIncome: () => void;
    chopWood: () => void;
    growFood: () => void;
    purchase: (producer: Producer) => void;
    start: () => void;

    constructor() {
        this.food = ko.observable(0);
        this.wood = ko.observable(0);
        const helper = new ProducerHelper();
        this.producers = ko.observableArray(helper.generateProducers());
        this.addIncome = () => {
            const calculator = new IncomeCalculator();
            this.wood(this.wood() + calculator.calculateWoodIncome(ko.unwrap(this.producers)));
            this.food(this.food() + calculator.calculateFoodIncome(ko.unwrap(this.producers)));
        };
        this.chopWood = () => {
            this.wood(this.wood() + 1);
        };
        this.growFood = () => {
            this.food(this.food() + 1);
        };
        this.purchase = (producer: Producer) => {
            if (this.food() >= producer.foodCost() && this.wood() >= producer.woodCost()){
                this.food(this.food() - producer.foodCost());
                this.wood(this.wood() - producer.woodCost());
                producer.purchase();                
            }
        };
        this.start = () => {
            setInterval(this.addIncome, 1000);
        };
    }
}