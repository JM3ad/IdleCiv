import {Producer} from '../purchasable/producer';
import {Upgrade} from '../purchasable/upgrade';
import * as ko from 'knockout';
import {ResourceId, ResourceList} from '../resources/resources';

export class ProducerGenerator{
    private static tractorUpgrade = new Upgrade(
        'Tractor',
        '+3 to food',
        new ResourceList().with(ResourceId.Food, 8))
            .with((resource: ResourceList) => {
                const copy = resource.copy();
                copy.add(ResourceId.Food, 3);
                return copy;
            });

    private static hammerUpgrade = new Upgrade(
        'Hammmer',
        'Use your new shiny tool to double home production',
        new ResourceList().with(ResourceId.Wood, 50))
            .with((resource: ResourceList) => {
                const copy = resource.copy();
                copy.multiply(2);
                return copy;
            });
    
    static generateProducers: () => Producer[] = () => {
        return [
            new Producer("Apple Picker", 
                new ResourceList().with(ResourceId.Food, 1),
                new ResourceList().with(ResourceId.Food, 1).with(ResourceId.Population, 1),
                new ResourceList(),
                [ProducerGenerator.tractorUpgrade]),

            new Producer("Stick Collector", 
                new ResourceList().with(ResourceId.Wood, 1),
                new ResourceList().with(ResourceId.Food, 1).with(ResourceId.Population, 1)),

            new Producer("Home builder",
                new ResourceList().with(ResourceId.Population, 1),
                new ResourceList().with(ResourceId.Food, 2).with(ResourceId.Wood, 10),
                new ResourceList(),
                [ProducerGenerator.hammerUpgrade]),

            new Producer("Pig Breeder",
                new ResourceList().with(ResourceId.Food, 5),
                new ResourceList().with(ResourceId.Food, 25).with(ResourceId.Wood, 20),
                new ResourceList().with(ResourceId.Food, 20).with(ResourceId.Wood, 10))
        ];
    };
}