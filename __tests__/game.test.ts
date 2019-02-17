import {Producer} from 'producer';
import {Game} from 'game';

function setUpGame(producers: Producer[]){
    const game = new Game();
    game.producers(producers);
    return game;
}

describe('Resource collection should:', () => {
    test('see wood increase on chopping', () => {
        const game = setUpGame([]);
        expect(game.wood()).toBe(0);
        game.chopWood(); 
        expect(game.wood()).toBe(1);
    })
    test('see food increase on farming', () => {
        const game = setUpGame([]);
        expect(game.food()).toBe(0);
        game.growFood(); 
        expect(game.food()).toBe(1);
    })
    test('see wood stay unchanged on farming', () => {
        const game = setUpGame([]);
        expect(game.wood()).toBe(0);
        game.growFood(); 
        expect(game.wood()).toBe(0);
    })
    test('see food stay unchanged on chopping', () => {
        const game = setUpGame([]);
        expect(game.food()).toBe(0);
        game.chopWood(); 
        expect(game.food()).toBe(0);
    })
})

describe('Purchasing producers should:', () => {
    let producer : Producer;
    let game : Game;
    const foodCost = 5;
    const woodCost = 3;

    beforeEach(() => {
        producer = new Producer('name', 0, 0, foodCost, woodCost);
        producer.purchase = jest.fn(() => {});
        game = setUpGame([producer]);
    })

    test('fail if too little food', () => {
        game.food(foodCost - 1);
        game.wood(woodCost);
        game.purchase(producer);
        expect(producer.purchase).not.toHaveBeenCalled();
    })

    test('fail if too little wood', () => {
        game.food(foodCost + 4);
        game.wood(woodCost - 1);
        game.purchase(producer);
        expect(producer.purchase).not.toHaveBeenCalled();
    })

    test('have unchanged resources if failed', () => {
        const startingFood = foodCost - 1;
        const startingWood = woodCost - 1;
        game.food(startingFood);
        game.wood(startingWood);
        game.purchase(producer);
        expect(producer.purchase).not.toHaveBeenCalled();
        expect(game.food()).toBe(startingFood);
        expect(game.wood()).toBe(startingWood);
    })

    test('succeed if resources sufficient', () => {
        game.food(foodCost);
        game.wood(woodCost);
        game.purchase(producer);
        expect(producer.purchase).toHaveBeenCalled();
    })

    test('consume resources iff successful', () => {
        const startingFood = foodCost + 1;
        const startingWood = woodCost + 3;
        game.food(startingFood);
        game.wood(startingWood);
        game.purchase(producer);
        expect(producer.purchase).toHaveBeenCalled();
        expect(game.food()).toBe(startingFood - foodCost);
        expect(game.wood()).toBe(startingWood - woodCost);
    })
})