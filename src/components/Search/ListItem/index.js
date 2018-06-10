import React from 'react'
import _ from 'lodash/fp'

import enhance from './enhance'
import {
  ListItem
} from './styled'

const Comp = props => {
  const { onClick, item, displayKey } = props
  const displayValue = (
    item.__noResults || _.get(displayKey)(item)
  )
  return (
    <ListItem
      onMouseDown={onClick}
      children={displayValue}
    />
  )
}

export default enhance(Comp)