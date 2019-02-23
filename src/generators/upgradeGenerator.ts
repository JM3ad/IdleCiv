import * as ko from 'knockout';
import {Resources, ResourceList} from 'resources/resources';
import { Upgrade } from 'purchasable/upgrade';

export class UpgradeGenerator{
    static generateChopUpgrades: () => Upgrade[] = () => {
        return [
            new Upgrade("Axes","New tools", new ResourceList().with(Resources.Wood, 10))
        ];
    };
    static generateFarmUpgrades: () => Upgrade[] = () => {
        return [
            new Upgrade("Scythes","These new tools will double your farming rate", new ResourceList().with(Resources.Wood,5)),
        ];
    };
}