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
    test('fail if too few resources', () => {
        expect(0).toBe(1);
    })
    test('succeed if resources sufficient', () => {
        expect(0).toBe(1);
    })
    test('consume resources iff successful', () => {
        expect(0).toBe(1);
    })
    test('increase the producer quantity', () => {
        expect(0).toBe(1);
    })
})