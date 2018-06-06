import React from 'react'

import enhance from './enhance'
import {
  Foo
} from './styled'

const Comp = props => {
  return (
    <Foo>
      lol
    </Foo>
  )
}

export default enhance(Comp)