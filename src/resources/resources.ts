import * as ko from 'knockout';

export class ResourceDisplay{
    name: string;
    id: number;
    quantity: KnockoutObservable<number> = ko.observable(0);

    value: KnockoutComputed<string> = ko.computed(() => {
        return this.quantity ? this.quantity().toString() : "0";
    })
    display: KnockoutComputed<boolean> = ko.computed(() => {
        return this.quantity() > 0;
    })

    add: (value: number) => void = (value: number) => {
        this.quantity(this.quantity() + value);
    }

    overrideDisplay: (display: () => boolean) => void = (display: () => boolean) => {
        this.display = ko.computed(display);
    }

    constructor(id: number, name: string){
        this.id = id;
        this.name = name;
    }
}

export enum ResourceId{
    Food,
    Wood,
    Population
}

const GenerateResources : () => ResourceDisplay[] = () => {
    const resources = [];
    resources[ResourceId.Food] = new ResourceDisplay(ResourceId.Food, "Food");
    resources[ResourceId.Wood] = new ResourceDisplay(ResourceId.Wood, "Wood");
    resources[ResourceId.Population] = new ResourceDisplay(ResourceId.Population, "Population Space");
    return resources;
}

export class ResourceList{
    private resources: KnockoutObservableArray<ResourceDisplay>;

    addList: (resources: ResourceList) => void;
    canAfford: (resources: ResourceList) => boolean;
    minusCost: (resources: ResourceList) => void;
    add: (resource: ResourceId, quantity: number) => void;
    multiply: (multiplier: number) => void;
    multiplyAndRoundUp: (multiplier: number) => void;
    with: (resource: ResourceId, quantity: number) => ResourceList;
    getResource: (resource: ResourceId) => ResourceDisplay;
    private getResourceQuantity: (resource: ResourceId) => number;
    copy: () => ResourceList;
    getAll: KnockoutComputed<ResourceDisplay[]>;

    constructor(){
        this.resources = ko.observableArray([]);
        Object.values(GenerateResources()).map((resource: ResourceDisplay) => {
            this.resources()[resource.id] = resource;
        })
        
        this.addList = (resources: ResourceList) => {
            resources.resources().map((resource: ResourceDisplay, idx: number) => {
                this.resources()[resource.id].add(resources.getResourceQuantity(resource.id));
            });
        }

        this.canAfford = (resources: ResourceList) => {
            return this.resources().map((resource: ResourceDisplay, index: number) => {
                return resource.quantity() >= resources.getResourceQuantity(resource.id);
            }).reduce((previous: boolean, current: boolean, i: number) => {
                return previous && current;
            });
        }

        this.minusCost = (resources: ResourceList) => {
            resources.resources().map((resource: ResourceDisplay, idx: number) => {
                this.resources()[resource.id].add(-resources.getResourceQuantity(resource.id));
            });
        }

        this.add = (resource: ResourceId, quantity: number) => {
            this.resources()[resource].add(quantity);
        }

        this.multiply = (multiplier: number) => {
            this.resources().map((resource: ResourceDisplay) => {
                const currentQuantity = this.resources()[resource.id].quantity();
                this.resources()[resource.id].quantity(currentQuantity * multiplier);
            });
        }

        this.multiplyAndRoundUp = (multiplier: number) => {
            this.resources().map((resource: ResourceDisplay) => {
                const currentQuantity = this.resources()[resource.id].quantity();
                const quantityToMultiply = currentQuantity > 0 ? currentQuantity + 1 : currentQuantity;
                this.resources()[resource.id].quantity(Math.round(quantityToMultiply * multiplier));
            });
        }

        this.getResource = (resource: ResourceId) => {
            return this.resources()[resource];
        }

        this.getResourceQuantity = (resource: ResourceId) => {
            return this.resources()[resource].quantity();
        }

        this.getAll = ko.computed(() => {
            return this.resources();
        })

        this.with = (resource: ResourceId, quantity: number) => {
            this.resources()[resource].quantity(quantity);
            if(this.resources.valueHasMutated) {this.resources.valueHasMutated();}
            return this;
        }
        
        this.copy = () => {
            const copy = new ResourceList();
            this.resources().map((resource: ResourceDisplay) => {
                copy.with(resource.id, this.getResourceQuantity(resource.id));
            })
            return copy;
        }
    }
}