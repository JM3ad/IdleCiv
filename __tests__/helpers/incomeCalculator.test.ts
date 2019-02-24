import {Producer} from 'purchasable/producer';
import {IncomeCalculator} from 'helpers/incomeCalculator';
import {ProducerGenerator} from 'generators/producerGenerator';
import {ResourceList, ResourceId} from 'resources/resources';

describe('Income calculator should:',()=>{
    test('see no income for no producers', ()=>{
        const calculator = new IncomeCalculator();
        const income = calculator.calculateIncome([]);
        
        Object.values(ResourceId).forEach((resource)=>{
            if(isNaN(Number(resource))){
                return;
            }
            expect(income.getResource(resource).quantity()).toBe(0);
        })
    })

    test('see no income for producers with 0 quantity', () => {
        const calculator = new IncomeCalculator();
        const producers = ProducerGenerator.generateProducers();

        expect(calculator.calculateIncome(producers).getResource(ResourceId.Food).quantity()).toBe(0);
        expect(calculator.calculateIncome(producers).getResource(ResourceId.Wood).quantity()).toBe(0);
    })

    test('see correct income for producers with non-0 quantity', () => {
        const calculator = new IncomeCalculator();
        const foodIncome = 4;
        const woodIncome = 8;
        const foodResource = new ResourceList()
            .with(ResourceId.Food, foodIncome);
        const woodResource = new ResourceList()
            .with(ResourceId.Wood, woodIncome);
        const producers = [
            new Producer('name', foodResource, new ResourceList()),
            new Producer('name2', woodResource, new ResourceList())
        ];
        
        for (let i = 0; i < 3; i++){
            producers[0].purchase();
            producers[1].purchase();
            producers[1].purchase();
        }

        const expectedFoodIncome = foodIncome * 3;
        const expectedWoodIncome = woodIncome * 6;
        expect(calculator.calculateIncome(producers).getResource(ResourceId.Food).quantity()).toBe(expectedFoodIncome);
        expect(calculator.calculateIncome(producers).getResource(ResourceId.Wood).quantity()).toBe(expectedWoodIncome);
    })
})