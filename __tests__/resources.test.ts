import {ResourceList, ResourceId} from 'resources/resources';


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
            .with(ResourceId.Food, foodA)
            .with(ResourceId.Wood, woodA);
        resourceB = new ResourceList()
            .with(ResourceId.Food, foodB)
            .with(ResourceId.Wood, woodB);

        lowerResource = new ResourceList()
            .with(ResourceId.Food, 14)
            .with(ResourceId.Wood, 12);
        highFoodLowWoodResource = new ResourceList()
            .with(ResourceId.Food, 30)
            .with(ResourceId.Wood, 4);
        higherResource = new ResourceList()
            .with(ResourceId.Food, 18)
            .with(ResourceId.Wood, 12)
    })

    test('have the right number of resources', () => {
        //temporary hardcoded resource length for testing
        expect(resourceA.getAll().length).toBe(Object.values(ResourceId).length / 2); 
    })

    test('addList works correctly', ()=>{
        resourceA.addList(resourceB);

        expect(resourceA.getResource(ResourceId.Food).quantity()).toBe(foodA + foodB);
        expect(resourceA.getResource(ResourceId.Wood).quantity()).toBe(woodA + woodB);
    })

    test('add works correctly', ()=>{
        resourceA.add(ResourceId.Wood, woodB);

        expect(resourceA.getResource(ResourceId.Food).quantity()).toBe(foodA);
        expect(resourceA.getResource(ResourceId.Wood).quantity()).toBe(woodA + woodB);
    })

    test('minus correctly', ()=>{
        resourceA.minusCost(resourceB);

        expect(resourceA.getResource(ResourceId.Food).quantity()).toBe(foodA - foodB);
        expect(resourceA.getResource(ResourceId.Wood).quantity()).toBe(woodA - woodB);
    })

    test('multiplies by a constant correctly', ()=>{
        const multiplier : number = 4;
        resourceA.multiply(multiplier);

        expect(resourceA.getResource(ResourceId.Food).quantity()).toBe(foodA * multiplier);
        expect(resourceA.getResource(ResourceId.Wood).quantity()).toBe(woodA * multiplier);
    })

    test('multiplyAndRoundUp works correctly', ()=>{
        const multiplier : number = 1.4;

        resourceA.multiplyAndRoundUp(multiplier);

        expect(resourceA.getResource(ResourceId.Food).quantity()).toBe(Math.round((foodA + 1) * multiplier));
        expect(resourceA.getResource(ResourceId.Wood).quantity()).toBe(Math.round((woodA + 1) * multiplier));
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
