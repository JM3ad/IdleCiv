import {Producer} from 'producer';
import {Game} from 'game';
import {Resources, ResourceList} from 'resources';

function setUpGame(producers: Producer[]){
    const game = new Game();
    game.producers(producers);
    return game;
}

describe('Resource collection should:', () => {
    test('see wood increase on chopping', () => {
        const game = setUpGame([]);
        expect(game.resources().get(Resources.Wood)).toBe(0);
        game.chopWood(); 
        expect(game.resources().get(Resources.Wood)).toBe(1);
    })
    test('see food increase on farming', () => {
        const game = setUpGame([]);
        expect(game.resources().get(Resources.Food)).toBe(0);
        game.growFood(); 
        expect(game.resources().get(Resources.Food)).toBe(1);
    })
    test('see wood stay unchanged on farming', () => {
        const game = setUpGame([]);
        expect(game.resources().get(Resources.Wood)).toBe(0);
        game.growFood(); 
        expect(game.resources().get(Resources.Wood)).toBe(0);
    })
    test('see food stay unchanged on chopping', () => {
        const game = setUpGame([]);
        expect(game.resources().get(Resources.Food)).toBe(0);
        game.chopWood(); 
        expect(game.resources().get(Resources.Food)).toBe(0);
    })
})

describe('Purchasing producers should:', () => {
    let producer : Producer;
    let game : Game;
    const foodCost = 5;
    const woodCost = 3;

    beforeEach(() => {
        const cost = new ResourceList().with(Resources.Food, foodCost).with(Resources.Wood, woodCost)
        producer = new Producer('name', new ResourceList(), cost);
        producer.purchase = jest.fn(() => {});
        game = setUpGame([producer]);
    })

    test('fail if too little food', () => {
        game.resources()
            .with(Resources.Food, foodCost - 1)
            .with(Resources.Wood, woodCost);
        game.purchase(producer);
        expect(producer.purchase).not.toHaveBeenCalled();
    })

    test('fail if too little wood', () => {
        game.resources()
            .with(Resources.Food, foodCost + 4)
            .with(Resources.Wood, woodCost - 2);
        game.purchase(producer);
        expect(producer.purchase).not.toHaveBeenCalled();
    })

    test('have unchanged resources if failed', () => {
        const startingFood = foodCost - 1;
        const startingWood = woodCost - 1;
        game.resources()
            .with(Resources.Food, startingFood)
            .with(Resources.Wood, startingWood);
        game.purchase(producer);
        expect(producer.purchase).not.toHaveBeenCalled();
        expect(game.resources().get(Resources.Food)).toBe(startingFood);
        expect(game.resources().get(Resources.Wood)).toBe(startingWood);
    })

    test('succeed if resources sufficient', () => {
        game.resources()
            .with(Resources.Food, foodCost)
            .with(Resources.Wood, woodCost);
        game.purchase(producer);
        expect(producer.purchase).toHaveBeenCalled();
    })

    test('consume resources if successful', () => {
        const startingFood = foodCost + 1;
        const startingWood = woodCost + 3;
        game.resources()
            .with(Resources.Food, startingFood)
            .with(Resources.Wood, startingWood);
        game.purchase(producer);
        expect(producer.purchase).toHaveBeenCalled();
        expect(game.resources().get(Resources.Food)).toBe(startingFood - foodCost);
        expect(game.resources().get(Resources.Wood)).toBe(startingWood - woodCost);
    })
})