import {Producer} from 'producer';
import * as ko from 'knockout';
import {IncomeCalculator} from 'helpers/incomeCalculator';
import {ProducerHelper} from 'helpers/producerHelper';
import { Painter } from 'display/painter';
import { ResourceList, Resources } from 'resources';

export class Game {
    producers: KnockoutObservableArray<Producer>;
    painter: KnockoutObservable<Painter>;
    resources: KnockoutObservable<ResourceList>;
    addIncome: () => void;
    chopWood: () => void;
    growFood: () => void;
    purchase: (producer: Producer) => void;
    start: () => void;
    draw: () => void;

    constructor() {
        const helper = new ProducerHelper();
        this.producers = ko.observableArray(helper.generateProducers());
        this.painter = ko.observable(new Painter());
        this.resources = ko.observable(new ResourceList());
        this.addIncome = () => {
            const calculator = new IncomeCalculator();
            this.resources().addList(calculator.calculateIncome(ko.unwrap(this.producers)));
        };
        this.chopWood = () => {
            this.resources().add(Resources.Wood, 1);
        };
        this.growFood = () => {            
            this.resources().add(Resources.Food, 1);
        };
        this.purchase = (producer: Producer) => {
            if (this.resources().canAfford(producer.cost())){
                this.resources().minusCost(producer.cost());
                producer.purchase();
            }
        };
        this.draw = () => {
            //this.painter().paint(this.producers());
        };
        this.start = () => {
            setInterval(this.addIncome, 1000);
            setInterval(this.draw, 1000);
        };
    }
}