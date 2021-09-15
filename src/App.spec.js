import React from 'react';
import renderer from 'react-test-renderer';
import App from './App';
import {calcZar}from './calc';

describe('App', () => {
    test('snapshot renders', () => {
      const component = renderer.create(<App />);
      let tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });

    test('Conversion permutations test',  ()=>{
        const totalAmount =  calcZar(1,1,1.18074,1)
        expect(totalAmount).toEqual(1.18);
    })

    test('Decimal places test', ()=>{
        const totalAmount =  calcZar(1,1,1.18074,1)
        const regex = new RegExp("^\s*-?\d+(\.\d{1,2})?\s*$")
        expect((regex).test(totalAmount));
    })
  });