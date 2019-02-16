import * as ko from 'knockout';

export class ProducerImage{
    locationX: KnockoutObservable<number>;
    locationY: KnockoutObservable<number>;
    update: () => void;
    
    constructor(){
        this.locationX = ko.observable(0);
        this.locationY = ko.observable(0);
        this.update = () => {
            this.locationX(this.locationX() + 10);
        }
    }


}