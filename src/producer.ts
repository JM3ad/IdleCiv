import * as ko from 'knockout';
import {ProducerImage} from 'display/producerImage';
import {ResourceList} from 'resources';

export class Producer {
    name: KnockoutObservable<string>;
    income: KnockoutObservable<ResourceList>;
    cost: KnockoutObservable<ResourceList>;
    quantity: KnockoutObservable<number>;
    image: KnockoutObservable<ProducerImage>;
    isUnlocked: KnockoutObservable<boolean>;

    purchase: () => void;
    unlockIfSuitable: (resources: ResourceList) => void;

    constructor(name: string, income: ResourceList, cost: ResourceList, unlockCost?: ResourceList) {
        this.name = ko.observable(name);
        this.income = ko.observable(income);
        this.cost = ko.observable(cost);
        this.quantity = ko.observable(0);
        this.image = ko.observable(new ProducerImage());
        this.isUnlocked = ko.observable(false);
        
        this.purchase = function() {
            this.cost().multiplyAndRoundUp(1.4);
            this.quantity(this.quantity() + 1);
        }

        this.unlockIfSuitable = function(resources: ResourceList) {
            if (this.isUnlocked()){
                return;
            }
            this.isUnlocked(resources.canAfford(unlockCost || new ResourceList()));
        }
    }
}