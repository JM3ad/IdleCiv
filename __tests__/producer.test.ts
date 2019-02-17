import {Producer} from 'producer';

function setUpProducer(foodCost?: number, woodCost?: number, foodIncome?: number, woodIncome?: number){
    const name = "Name";
    return new Producer(name, foodIncome || 1, woodIncome || 1, foodCost || 1, woodCost || 1);
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
        const producer = setUpProducer(initialFoodCost, initialWoodCost);
        producer.purchase();
        expect(producer.foodCost()).toBeGreaterThan(initialFoodCost);
        expect(producer.woodCost()).toBeGreaterThan(initialWoodCost);
    })
})
