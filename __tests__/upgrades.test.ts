import {Upgrade} from 'purchasable/upgrade';
import {ResourceList, Resources} from 'resources/resources';

function setUpUpgrade(cost?: ResourceList){
    const name = "Name";
    const description = "Description";
    return new Upgrade(name, description, cost || new ResourceList());
}

describe('Upgrades should:', ()=>{
    const doubleFoodEffect : (resources: ResourceList) => ResourceList = (resources: ResourceList) => {
        const copy = resources.copy()
        copy.add(Resources.Food, resources.get(Resources.Food));
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
            .with(Resources.Food, initialFood)
            .with(Resources.Wood, initialWood);
        const upgrade = setUpUpgrade().with(doubleFoodEffect);
        const updatedResources = upgrade.purchase(initialResources);
        expect(upgrade.purchased()).toBe(true);
        expect(updatedResources.get(Resources.Food)).toBe(initialFood * 2);
        expect(updatedResources.get(Resources.Wood)).toBe(initialWood);
    })

    test('not apply effect twice', ()=>{
        const initialWood = 6;
        const initialFood = 12;
        const initialResources = new ResourceList()
            .with(Resources.Food, initialFood)
            .with(Resources.Wood, initialWood);
        const upgrade = setUpUpgrade().with(doubleFoodEffect);
        const firstPurchase = upgrade.purchase(initialResources);
        const secondPurchase = upgrade.purchase(firstPurchase);
        
        expect(upgrade.purchased()).toBe(true);
        expect(secondPurchase.get(Resources.Food)).toBe(firstPurchase.get(Resources.Food));
        expect(secondPurchase.get(Resources.Wood)).toBe(firstPurchase.get(Resources.Wood));
    })
})
