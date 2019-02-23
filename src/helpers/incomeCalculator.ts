import * as ko from 'knockout';
import {Producer} from '../purchasable/producer';
import {ResourceList} from 'resources/resources';

export class IncomeCalculator {
    calculateIncome: (producers : Producer[]) => ResourceList;

    constructor() {
        this.calculateIncome = function(producers: Producer[]){
            return producers
                .map(producer => {
                    var copy = producer.income().copy();
                    copy.multiply(producer.quantity());
                    return copy;
                })
                .reduce(function(result : ResourceList, currentValue : ResourceList, i : number) {
                    result.addList(currentValue);
                    return result;
                }, new ResourceList());
        }
    }
}