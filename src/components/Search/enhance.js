import { compose, withState, withHandlers, withPropsOnChange, defaultProps, pure } from 'recompose'
import _ from 'lodash/fp'

const match = (query, matchable) => {
  const q = query.toLowerCase()
  if (q && matchable) {
    if (typeof matchable === 'string') {
      const m = matchable.toLowerCase()
      if (m === q) {
        return 4
      } else if (m.slice(0, q.length) === q) {
        return 2
      } else if (m.includes(q)) {
        return 1
      } else {
        return 0
      }
    } else if (Array.isArray(matchable)) {
      return matchable.reduce((acc, x) => acc + match(query,x), 0)
    } else {
      return 0
    }
  } else {
    return 0
  }
}

export default compose(
  defaultProps({
    searchableKeys: ['name'],
    displayKey: 'name',
    onSubmit: item => {
      console.log(item)
    },
    items: [],
    limit: 10
  }),
  withState('query', 'setQuery', ''),
  withState('listVisible', 'setListVisible', false),
  withState('selectedItem', 'setSelectedItem', 0),
  withPropsOnChange(
    ['query', 'items', 'searchableKeys'],
    ({ query, items, searchableKeys }) => {
      const matchingItems = (
        items
        .map(item => {
          return {
            item,
            match: searchableKeys.reduce(
              (acc, key) => acc + match(query, _.get(key)(item)),
              0
            )
          }
        })
        .filter(({ match }) => !!match)
        .sort((l, r) => {
          return r.match - l.match
        })
        .map(_.get('item'))
      )

      return { matchingItems }
    }
  ),
  withHandlers({
    onChange: ({ setQuery, setListVisible }) => e => {
      setQuery(e.target.value)
      setListVisible(true)
    },
    onKeyPress: ({ onSubmit, matchingItems }) => e => {
      if (e.key === 'Enter') {
        onSubmit(matchingItems[0])
      }
    },
    // onBlur: ({ setListVisible }) => e => {
    //   console.log(e.target, e.relatedTarget)
    //   setListVisible(false)
    // },
    onFocus: ({ setListVisible }) => () => {
      setListVisible(true)
    }
  }),
  pure
)
