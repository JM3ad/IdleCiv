import {Producer} from 'producer';
import {ResourceList, Resources} from 'resources';

function setUpProducer(initialCost?: ResourceList, income?: ResourceList, unlockCost?: ResourceList){
    const name = "Name";
    return new Producer(name, income || new ResourceList(), initialCost || new ResourceList(), unlockCost || new ResourceList());
}

describe('Producers should:', ()=>{
    test('start with quantity 0', ()=>{
        const producer = setUpProducer();
        expect(producer.quantity()).toBe(0);
    })
    
    test('increase in quantity on purchase', ()=>{
        const producer = setUpProducer();
        producer.purchase();
        expect(producer.quantity()).toBe(1);
    })
    
    test('Producer cost increases on purchase', ()=>{
        const initialFoodCost = 3;
        const initialWoodCost = 4;
        const initialCost = new ResourceList()
            .with(Resources.Food, initialFoodCost)
            .with(Resources.Wood, initialWoodCost);
        const producer = setUpProducer(initialCost);
        producer.purchase();
        expect(producer.cost().get(Resources.Food)).toBeGreaterThan(initialFoodCost);
        expect(producer.cost().get(Resources.Wood)).toBeGreaterThan(initialWoodCost);
    })

    test('is locked initially', ()=>{
        const empty = new ResourceList();
        const producer = setUpProducer(empty, empty, empty);
        
        expect(producer.isUnlocked()).toBeFalsy();
    })

    test('is unlocked if no unlock cost provided', ()=>{
        const empty = new ResourceList();
        const producer = setUpProducer(undefined, undefined, empty);
        producer.unlockIfSuitable(empty);

        expect(producer.isUnlocked()).toBeTruthy();
    })

    test('is unlocked when correct cost provided', ()=>{
        const foodUnlockCost = new ResourceList()
            .with(Resources.Food, 10);
        const producer = setUpProducer(undefined, undefined, foodUnlockCost);
        producer.unlockIfSuitable(new ResourceList());
        expect(producer.isUnlocked()).toBeFalsy();

        const insufficientFood = new ResourceList()
            .with(Resources.Food, 5);
        producer.unlockIfSuitable(insufficientFood);
        expect(producer.isUnlocked()).toBeFalsy();

        producer.unlockIfSuitable(foodUnlockCost);        
        expect(producer.isUnlocked()).toBeTruthy();
    })
})
