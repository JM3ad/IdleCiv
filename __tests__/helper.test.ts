import {helper} from '../src/helper';

test('basic', ()=>{
    let integ :number = 4;
    integ = new helper().demo(integ);
    
    expect(integ).toBe(5);
})