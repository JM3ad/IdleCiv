import {Producer} from 'purchasable/producer';
import * as ko from 'knockout';
import {IncomeCalculator} from 'helpers/incomeCalculator';
import {ProducerGenerator} from 'generators/producerGenerator';
import { Painter } from 'display/painter';
import { ResourceList, Resources } from 'resources/resources';
import { Upgrade } from 'purchasable/upgrade';
import { UpgradeGenerator } from 'generators/upgradeGenerator';

export class Game {
    producers: KnockoutObservableArray<Producer> = ko.observableArray(ProducerGenerator.generateProducers());;
    painter: KnockoutObservable<Painter>;
    resources: KnockoutObservable<ResourceList>;
    chopIncome: KnockoutObservable<ResourceList> = ko.observable(new ResourceList()
        .with(Resources.Wood, 1));;
    farmIncome: KnockoutObservable<ResourceList> = ko.observable(new ResourceList()
        .with(Resources.Food, 1));;
    chopUpgrades: KnockoutObservableArray<Upgrade> = ko.observableArray(UpgradeGenerator.generateChopUpgrades());
    farmUpgrades: KnockoutObservableArray<Upgrade> = ko.observableArray(UpgradeGenerator.generateFarmUpgrades());
    addIncome: () => void;
    chopWood: () => void;
    growFood: () => void;
    purchaseProducer: (producer: Producer) => void;
    purchaseFarmUpgrade: (upgrade: Upgrade) => void;
    purchaseWoodUpgrade: (upgrade: Upgrade) => void;
    purchaseProducerUpgrade: (producer: Producer, upgrade: Upgrade) => void;
    start: () => void;
    draw: () => void;

    constructor() {
        this.painter = ko.observable(new Painter());
        this.resources = ko.observable(new ResourceList());
        this.addIncome = () => {
            const calculator = new IncomeCalculator();
            this.resources().addList(calculator.calculateIncome(ko.unwrap(this.producers)));
        };
        this.chopWood = () => {
            this.resources().addList(this.chopIncome());
        };
        this.growFood = () => {            
            this.resources().addList(this.farmIncome());
        };
        this.purchaseProducer = (producer: Producer) => {
            if (this.resources().canAfford(producer.cost())){
                this.resources().minusCost(producer.cost());
                producer.purchase();
            }
        };
        this.purchaseFarmUpgrade = (upgrade: Upgrade) => {
            if (this.resources().canAfford(upgrade.cost())){
                this.resources().minusCost(upgrade.cost());
                upgrade.purchase(this.farmIncome());
            }
        };
        this.purchaseWoodUpgrade = (upgrade: Upgrade) => {
            if (this.resources().canAfford(upgrade.cost())){
                this.resources().minusCost(upgrade.cost());
                upgrade.purchase(this.chopIncome());
            }
        };
        this.purchaseProducerUpgrade = (producer: Producer, upgrade: Upgrade) => {
            if (this.resources().canAfford(upgrade.cost())){
                this.resources().minusCost(upgrade.cost());
                producer.purchaseUpgrade(upgrade);
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