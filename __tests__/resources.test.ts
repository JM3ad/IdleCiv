import {ResourceList, Resources} from 'resources/resources';


describe('Resources should:', ()=>{
    const foodA = 12;
    const woodA = 8;
    const foodB = 5;
    const woodB = 3;
    let resourceA : ResourceList;
    let resourceB : ResourceList;
    let higherResource : ResourceList;
    let highFoodLowWoodResource : ResourceList;
    let lowerResource : ResourceList;

    beforeEach(() => {
        resourceA = new ResourceList()
            .with(Resources.Food, foodA)
            .with(Resources.Wood, woodA);
        resourceB = new ResourceList()
            .with(Resources.Food, foodB)
            .with(Resources.Wood, woodB);

        lowerResource = new ResourceList()
            .with(Resources.Food, 14)
            .with(Resources.Wood, 12);
        highFoodLowWoodResource = new ResourceList()
            .with(Resources.Food, 30)
            .with(Resources.Wood, 4);
        higherResource = new ResourceList()
            .with(Resources.Food, 18)
            .with(Resources.Wood, 12)
    })

    test('addList works correctly', ()=>{
        resourceA.addList(resourceB);

        expect(resourceA.get(Resources.Food)).toBe(foodA + foodB);
        expect(resourceA.get(Resources.Wood)).toBe(woodA + woodB);
    })

    test('add works correctly', ()=>{
        resourceA.add(Resources.Wood, woodB);

        expect(resourceA.get(Resources.Food)).toBe(foodA);
        expect(resourceA.get(Resources.Wood)).toBe(woodA + woodB);
    })

    test('minus correctly', ()=>{
        resourceA.minusCost(resourceB);

        expect(resourceA.get(Resources.Food)).toBe(foodA - foodB);
        expect(resourceA.get(Resources.Wood)).toBe(woodA - woodB);
    })

    test('multiplies by a constant correctly', ()=>{
        const multiplier : number = 4;
        resourceA.multiply(multiplier);

        expect(resourceA.get(Resources.Food)).toBe(foodA * multiplier);
        expect(resourceA.get(Resources.Wood)).toBe(woodA * multiplier);
    })

    test('multiplyAndRoundUp works correctly', ()=>{
        const multiplier : number = 1.4;

        resourceA.multiplyAndRoundUp(multiplier);

        expect(resourceA.get(Resources.Food)).toBe(Math.round((foodA + 1) * multiplier));
        expect(resourceA.get(Resources.Wood)).toBe(Math.round((woodA + 1) * multiplier));
    })
    
    test('canAfford returns true if all resources sufficient', ()=>{
        expect(higherResource.canAfford(lowerResource)).toBeTruthy();
    })

    test('canAfford returns false if no resources sufficient', ()=>{
        expect(lowerResource.canAfford(higherResource)).toBeFalsy();
    })

    test('canAfford returns false if only some resources are sufficient', ()=>{
        expect(higherResource.canAfford(highFoodLowWoodResource)).toBeFalsy();
    })
})
