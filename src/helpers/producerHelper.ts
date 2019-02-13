import {Producer} from '../producer';
import * as ko from 'knockout';

export class ProducerHelper{
    generateProducers: () => Producer[];

    constructor(){
        this.generateProducers = function(){
            return [
                new Producer("Farmer", 1, 0, 1, 0),
                new Producer("Lumberjack", 0, 1, 1, 0)
            ];
        }
    }
}