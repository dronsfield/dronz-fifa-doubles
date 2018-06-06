import { compose, withState, withHandlers, withPropsOnChange, pure } from 'recompose'

export default compose(
  withState('errorMessage', 'setErrorMessage', ''),
  withHandlers({
    onSubmit: ({ signup, setErrorMessage }) => e => {
      e.preventDefault()
      console.log(e)
      console.log(e.target.children)

      const inputs = e.target.children

      const variables = {}

      for (let i = 0; i < inputs.length; i++) {
        const input = inputs[i]
        if (input.tagName === 'INPUT' && input.type !== 'submit') {
          const { value, name } = input
          if (value) {
            variables[name] = value
          } else {
            setErrorMessage(`${name} required`)
            return
          }
        }
      }

      return (
        signup({ variables })
        .then(x => {
          window.alert(x.data.signupUser.token)
        })
        .catch(console.error)
      )
    }
  })
)
