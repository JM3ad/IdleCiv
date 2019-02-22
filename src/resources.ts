import * as ko from 'knockout';

export enum Resources{
    Food,
    Wood
}

export class ResourceList{
    private resources: number[];

    addList: (resources: ResourceList) => void;
    canAfford: (resources: ResourceList) => boolean;
    minusCost: (resources: ResourceList) => void;
    add: (resource: Resources, quantity: number) => void;
    multiply: (multiplier: number) => void;
    multiplyAndRoundUp: (multiplier: number) => void;
    with: (resource: Resources, quantity: number) => ResourceList;
    get: (resource: Resources) => number;
    copy: () => ResourceList;

    constructor(){

        this.resources = [];
        for (let resource in Resources) {
            this.resources[resource] = 0;
        }
        
        this.addList = (resources: ResourceList) => {
            this.resources = resources.resources.map((num, idx) => {
                return num + this.resources[idx];
              });
        }

        this.canAfford = (resources: ResourceList) => {
            return this.resources.map((resource: number, index: number) => {
                return resource >= resources.get(index);
            }).reduce((previous: boolean, current: boolean, i: number) => {
                return previous && current;
            });
        }

        this.minusCost = (resources: ResourceList) => {
            this.resources = resources.resources.map((num, idx) => {
                return this.resources[idx] - num;
              });
        }

        this.add = (resource: Resources, quantity: number) => {
            this.resources[resource] += quantity;
        }

        this.multiply = (multiplier: number) => {
            this.resources = this.resources.map((num, idx) => {
                return num * multiplier;
            });
        }

        this.multiplyAndRoundUp = (multiplier: number) => {
            this.resources = this.resources.map((num, idx) => {
                num = num > 0 ? num + 1 : num;
                return Math.round(num * multiplier);
            });
        }

        this.get = (resource: Resources) => {
            return this.resources[resource];
        }

        this.with = (resource: Resources, quantity: number) => {
            this.resources[resource] = quantity;
            return this;
        }
        
        this.copy = () => {
            const copy = new ResourceList();
            Object.values(Resources).map((resource, index: Number, arr) => {
                copy.with(resource, this.get(resource));
            })
            return copy;
        }
    }
}