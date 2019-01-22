import React from 'react'
import { shallow } from 'enzyme'
import Table from '../'

describe('Table', () => {
  let wrapper
  const dataArray = [
    {
      "name": "Luke Skywalker",
      "height": "172",
      "created": "12/9/2014",
    },
    {
      "name": "C-3PO",
      "height": "167",
      "created": "12/10/2014"
    },
    {
      "name": "R2-D2",
      "height": "96",
      "created": "12/10/2014"
    }
  ]

  beforeEach(() => {
    wrapper = shallow(<Table />)
    wrapper.setState({
      dataArray 
    })
  });

  test('should render correctly', () => {
    expect(wrapper.exists()).toBeTruthy();
  });

  test('sortData should sort array of objects by string property', () => {
    wrapper.setState({ activeSort: "name" });

    expect(wrapper.instance().sortData()[0].name).toEqual("C-3PO");
  });
  
  test('sortData should sort array of objects by number property', () => {
    wrapper.setState({ activeSort: "height" });

    expect(wrapper.instance().sortData()[0].height).toEqual("96");
  });
  
  test('sortData should sort array of objects by date property', () => {
    wrapper.setState({ activeSort: "created" });
    expect(wrapper.instance().sortData()[0].name).toEqual("Luke Skywalker");
  });
})
