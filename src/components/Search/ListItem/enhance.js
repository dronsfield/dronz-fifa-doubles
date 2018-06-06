import { compose, withState, withHandlers, pure } from 'recompose'

export default compose(
  withHandlers({
    onClick: ({ onSubmit, item }) => e => {
      e.preventDefault()
      onSubmit(item)
    }
  }),
  pure
)
