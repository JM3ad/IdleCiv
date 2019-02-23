import * as ko from 'knockout';
import {ProducerImage} from '../display/producerImage';
import {ResourceList} from '../resources/resources';
import { Upgrade } from './upgrade';

export class Producer {
    name: KnockoutObservable<string>;
    income: KnockoutObservable<ResourceList>;
    cost: KnockoutObservable<ResourceList>;
    quantity: KnockoutObservable<number>;
    image: KnockoutObservable<ProducerImage>;
    isUnlocked: KnockoutObservable<boolean>;
    upgrades: KnockoutObservableArray<Upgrade>;

    purchase: () => void;
    purchaseUpgrade: (upgrade: Upgrade) => void;
    unlockIfSuitable: (resources: ResourceList) => void;

    constructor(name: string, income: ResourceList, cost: ResourceList, unlockCost?: ResourceList, upgrades?: Upgrade[]) {
        this.name = ko.observable(name);
        this.income = ko.observable(income);
        this.cost = ko.observable(cost);
        this.quantity = ko.observable(0);
        this.image = ko.observable(new ProducerImage());
        this.isUnlocked = ko.observable(false);
        this.upgrades = ko.observableArray(upgrades || []);
        
        this.purchase = function() {
            this.cost().multiplyAndRoundUp(1.4);
            this.quantity(this.quantity() + 1);
        }

        this.purchaseUpgrade = (upgrade: Upgrade) => {
            this.income(upgrade.purchase(this.income()));
        }

        this.unlockIfSuitable = function(resources: ResourceList) {
            if (this.isUnlocked()){
                return;
            }
            this.isUnlocked(resources.canAfford(unlockCost || new ResourceList()));
        }
    }
}