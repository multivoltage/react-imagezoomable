import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import React from 'react'
import { mount } from 'enzyme'
Enzyme.configure({ adapter: new Adapter() })

import { ImageNormal, MyImg } from './ImageNormal'
import { exportAllDeclaration } from '@babel/types'

const fakeUriPng = 'http://fake.com/one.png'

describe('<ImageNormal />', () => {
  it('img src is correct function is triggered at click', () => {
    const toogleZoom = jest.fn()
    const wrapper = mount(<ImageNormal uri={fakeUriPng} toogleZoom={toogleZoom} />)

    const img = wrapper.find('img')
    img.simulate('click')

    expect(toogleZoom).toHaveBeenCalled()
    expect(img).toHaveLength(1)
    expect(wrapper.find(MyImg).props().src).toEqual(fakeUriPng)
  })
})
