import {Producer} from '../purchasable/producer';
import * as ko from 'knockout';
import {Resources, ResourceList} from 'resources/resources';

export class ProducerGenerator{
    static generateProducers: () => Producer[] = () => {
        return [
            new Producer("Farmer", 
                new ResourceList().with(Resources.Food, 1),
                new ResourceList().with(Resources.Food, 1)),
            new Producer("Lumberjack", 
                new ResourceList().with(Resources.Wood, 1),
                new ResourceList().with(Resources.Food, 1))
        ];
    };
}