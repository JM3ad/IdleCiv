import * as ko from 'knockout';

export class ProducerUpgrade {
    name: KnockoutObservable<string>

    updateIncome: (originalIncome : number) => number

    constructor(name: string, effect: (currentIncome : number) => number) {
        this.name = ko.observable(name);
        this.updateIncome = effect;
    }
}