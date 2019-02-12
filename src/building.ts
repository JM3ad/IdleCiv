import * as ko from 'knockout';

export class Building {
    name: KnockoutObservable<string>
    value: KnockoutObservable<number>

    capitalizeName () {
        this.name(this.name().toUpperCase());
    }

    constructor(name: string, value: number) {
        this.name = ko.observable(name);
        this.value = ko.observable(value);
    }
}