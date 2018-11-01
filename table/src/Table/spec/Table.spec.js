import React from 'react'
import { shallow } from 'enzyme'
import Table from '../'

describe('Table', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(<Table />)
  });

  it('should render correctly', () => {
    expect(wrapper.exists()).toBeTruthy();
  });
})
