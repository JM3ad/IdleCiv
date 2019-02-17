import {Producer} from 'producer';
import {IncomeCalculator} from 'helpers/incomeCalculator';
import {ProducerHelper} from 'helpers/producerHelper';

describe('Income calculator should:',()=>{
    test('see no income for no producers', ()=>{
        const calculator = new IncomeCalculator();
        
        expect(calculator.calculateFoodIncome([])).toBe(0);
        expect(calculator.calculateWoodIncome([])).toBe(0);
    })

    test('see no income for producers with 0 quantity', () => {
        const calculator = new IncomeCalculator();
        const producers = new ProducerHelper().generateProducers();

        expect(calculator.calculateFoodIncome(producers)).toBe(0);
        expect(calculator.calculateWoodIncome(producers)).toBe(0);
    })

    test('see correct income for producers with non-0 quantity', () => {
        const calculator = new IncomeCalculator();
        const foodIncome = 4;
        const woodIncome = 8;
        const producers = [
            new Producer('name', foodIncome, 0, 1, 1),
            new Producer('name2', 0, woodIncome, 0, 5)
        ];
        
        for (let i = 0; i < 3; i++){
            producers[0].purchase();
            producers[1].purchase();
            producers[1].purchase();
        }

        const expectedFoodIncome = foodIncome * 3;
        const expectedWoodIncome = woodIncome * 6;
        expect(calculator.calculateFoodIncome(producers)).toBe(expectedFoodIncome);
        expect(calculator.calculateWoodIncome(producers)).toBe(expectedWoodIncome);
    })
})