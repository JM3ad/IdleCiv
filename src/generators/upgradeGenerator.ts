import * as ko from 'knockout';
import {ResourceId, ResourceList} from '../resources/resources';
import { Upgrade } from '../purchasable/upgrade';

export class UpgradeGenerator{
    static generateChopUpgrades: () => Upgrade[] = () => {
        return [
            new Upgrade("Axes","New tools", new ResourceList().with(ResourceId.Wood, 10))
            .with((income: ResourceList) => {
                const copy = income.copy();
                copy.add(ResourceId.Wood, 3);
                return copy;
            })
        ];
    };
    static generateFarmUpgrades: () => Upgrade[] = () => {
        return [
            new Upgrade("Scythes","These new tools will double your farming rate", new ResourceList().with(ResourceId.Wood,5)).with((income: ResourceList) => {
                const copy = income.copy();
                copy.add(ResourceId.Food, 5);
                return copy;
            })
        ];
    };
}