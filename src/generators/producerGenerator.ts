import {Producer} from '../purchasable/producer';
import {Upgrade} from '../purchasable/upgrade';
import * as ko from 'knockout';
import {Resources, ResourceList} from '../resources/resources';

export class ProducerGenerator{
    private static tractorUpgrade = new Upgrade(
        'Tractor',
        '+3 to food',
        new ResourceList().with(Resources.Food, 8))
        .with((resource: ResourceList)=>{
            const copy = resource.copy();
            copy.add(Resources.Food, 3);
            return copy;
        });
    static generateProducers: () => Producer[] = () => {
        return [
            new Producer("Farmer", 
                new ResourceList().with(Resources.Food, 1),
                new ResourceList().with(Resources.Food, 1),
                new ResourceList(),
                [ProducerGenerator.tractorUpgrade]),
            new Producer("Lumberjack", 
                new ResourceList().with(Resources.Wood, 1),
                new ResourceList().with(Resources.Food, 1))
        ];
    };
}