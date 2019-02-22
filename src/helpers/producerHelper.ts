import {Producer} from '../producer';
import * as ko from 'knockout';
import {Resources, ResourceList} from 'resources';

export class ProducerHelper{
    generateProducers: () => Producer[];

    constructor(){
        this.generateProducers = function(){
            return [
                new Producer("Farmer", 
                    new ResourceList().with(Resources.Food, 1),
                    new ResourceList().with(Resources.Food, 1)),
                new Producer("Lumberjack", 
                    new ResourceList().with(Resources.Wood, 1),
                    new ResourceList().with(Resources.Food, 1))
            ];
        }
    }
}