import React from 'react'
import _ from 'lodash/fp'

import enhance from './enhance'
import {
  ListItem
} from './styled'

const Comp = props => {
  const { onClick, item, displayKey } = props
  return (
    <ListItem
      onClick={onClick}
      children={_.get(displayKey)(item)}
    />
  )
}

export default enhance(Comp)