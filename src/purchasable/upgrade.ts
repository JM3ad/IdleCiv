import * as ko from 'knockout';
import { ResourceList } from 'resources/resources';

export class Upgrade {
    name: string;
    description: string;
    cost: KnockoutObservable<ResourceList>;
    purchased: KnockoutObservable<boolean>;
    private effect: (income: ResourceList) => ResourceList;
    with: (effect: (income: ResourceList) => ResourceList) => Upgrade;
    purchase: (income: ResourceList) => ResourceList;

    constructor(name: string, description: string, cost: ResourceList) {
        this.name = name;
        this.description = description;
        this.cost = ko.observable(cost);
        this.effect = (income: ResourceList) => income;
        this.purchased = ko.observable(false);

        this.with = (effect: (income: ResourceList) => ResourceList) => {
            this.effect = effect;
            return this;
        }

        this.purchase = (income: ResourceList) => {
            if(this.purchased()){
                return income;
            }
            this.purchased(true);
            return this.effect(income);
        }
    }
}