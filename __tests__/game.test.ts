import {Producer} from 'purchasable/producer';
import {Game} from 'game';
import {ResourceId, ResourceList} from 'resources/resources';

function setUpGame(producers: Producer[]){
    const game = new Game();
    game.producers(producers);
    return game;
}

describe('Resource collection should:', () => {
    test('see wood increase on chopping', () => {
        const game = setUpGame([]);
        expect(game.resources().getResource(ResourceId.Wood).quantity()).toBe(0);
        game.chopWood(); 
        expect(game.resources().getResource(ResourceId.Wood).quantity()).toBe(1);
    })
    test('see food increase on farming', () => {
        const game = setUpGame([]);
        expect(game.resources().getResource(ResourceId.Food).quantity()).toBe(0);
        game.growFood(); 
        expect(game.resources().getResource(ResourceId.Food).quantity()).toBe(1);
    })
    test('see wood stay unchanged on farming', () => {
        const game = setUpGame([]);
        expect(game.resources().getResource(ResourceId.Wood).quantity()).toBe(0);
        game.growFood(); 
        expect(game.resources().getResource(ResourceId.Wood).quantity()).toBe(0);
    })
    test('see food stay unchanged on chopping', () => {
        const game = setUpGame([]);
        expect(game.resources().getResource(ResourceId.Food).quantity()).toBe(0);
        game.chopWood(); 
        expect(game.resources().getResource(ResourceId.Food).quantity()).toBe(0);
    })
})

describe('Purchasing producers should:', () => {
    let producer : Producer;
    let game : Game;
    const foodCost = 5;
    const woodCost = 3;

    beforeEach(() => {
        const cost = new ResourceList().with(ResourceId.Food, foodCost).with(ResourceId.Wood, woodCost)
        producer = new Producer('name', new ResourceList(), cost);
        producer.purchase = jest.fn(() => {});
        game = setUpGame([producer]);
    })

    test('fail if too little food', () => {
        game.resources()
            .with(ResourceId.Food, foodCost - 1)
            .with(ResourceId.Wood, woodCost);
        game.purchaseProducer(producer);
        expect(producer.purchase).not.toHaveBeenCalled();
    })

    test('fail if too little wood', () => {
        game.resources()
            .with(ResourceId.Food, foodCost + 4)
            .with(ResourceId.Wood, woodCost - 2);
        game.purchaseProducer(producer);
        expect(producer.purchase).not.toHaveBeenCalled();
    })

    test('have unchanged resources if failed', () => {
        const startingFood = foodCost - 1;
        const startingWood = woodCost - 1;
        game.resources()
            .with(ResourceId.Food, startingFood)
            .with(ResourceId.Wood, startingWood);
        game.purchaseProducer(producer);
        expect(producer.purchase).not.toHaveBeenCalled();
        expect(game.resources().getResource(ResourceId.Food).quantity()).toBe(startingFood);
        expect(game.resources().getResource(ResourceId.Wood).quantity()).toBe(startingWood);
    })

    test('succeed if resources sufficient', () => {
        game.resources()
            .with(ResourceId.Food, foodCost)
            .with(ResourceId.Wood, woodCost);
        game.purchaseProducer(producer);
        expect(producer.purchase).toHaveBeenCalled();
    })

    test('consume resources if successful', () => {
        const startingFood = foodCost + 1;
        const startingWood = woodCost + 3;
        game.resources()
            .with(ResourceId.Food, startingFood)
            .with(ResourceId.Wood, startingWood);
        game.purchaseProducer(producer);
        expect(producer.purchase).toHaveBeenCalled();
        expect(game.resources().getResource(ResourceId.Food).quantity()).toBe(startingFood - foodCost);
        expect(game.resources().getResource(ResourceId.Wood).quantity()).toBe(startingWood - woodCost);
    })
})