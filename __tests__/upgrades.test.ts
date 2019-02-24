import {Upgrade} from 'purchasable/upgrade';
import {ResourceList, ResourceId} from 'resources/resources';

function setUpUpgrade(cost?: ResourceList){
    const name = "Name";
    const description = "Description";
    return new Upgrade(name, description, cost || new ResourceList());
}

describe('Upgrades should:', ()=>{
    const doubleFoodEffect : (resources: ResourceList) => ResourceList = (resources: ResourceList) => {
        const copy = resources.copy()
        copy.add(ResourceId.Food, resources.getResource(ResourceId.Food).quantity());
        return copy;
    }

    test('start unpurchased', ()=>{
        const upgrade = setUpUpgrade();
        expect(upgrade.purchased()).toBe(false);
    })
    
    test('is marked purchased on purchase', ()=>{
        const upgrade = setUpUpgrade();
        upgrade.purchase(new ResourceList());
        expect(upgrade.purchased()).toBe(true);
    })
    
    test('apply effect to provided resources', ()=>{
        const initialWood = 6;
        const initialFood = 12;
        const initialResources = new ResourceList()
            .with(ResourceId.Food, initialFood)
            .with(ResourceId.Wood, initialWood);
        const upgrade = setUpUpgrade().with(doubleFoodEffect);
        const updatedResources = upgrade.purchase(initialResources);
        expect(upgrade.purchased()).toBe(true);
        expect(updatedResources.getResource(ResourceId.Food).quantity()).toBe(initialFood * 2);
        expect(updatedResources.getResource(ResourceId.Wood).quantity()).toBe(initialWood);
    })

    test('not apply effect twice', ()=>{
        const initialWood = 6;
        const initialFood = 12;
        const initialResources = new ResourceList()
            .with(ResourceId.Food, initialFood)
            .with(ResourceId.Wood, initialWood);
        const upgrade = setUpUpgrade().with(doubleFoodEffect);
        const firstPurchase = upgrade.purchase(initialResources);
        const secondPurchase = upgrade.purchase(firstPurchase);
        
        expect(upgrade.purchased()).toBe(true);
        expect(secondPurchase.getResource(ResourceId.Food).quantity()).toBe(firstPurchase.getResource(ResourceId.Food).quantity());
        expect(secondPurchase.getResource(ResourceId.Wood).quantity()).toBe(firstPurchase.getResource(ResourceId.Wood).quantity());
    })
})
