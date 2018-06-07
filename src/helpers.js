export const getFormData = (...args) => {
  let [e, validate, onInvalid] = args
  if (!validate) validate = x => !!x
  if (!onInvalid) onInvalid = () => {}

  e.preventDefault()
  const children = e.target.children
  const variables = {}

  for (let i = 0; i < children.length; i++) {
    const child = children[i]
    if (child) {
      const input = child.querySelectorAll('input')[0]
      if (input && input.tagName === 'INPUT' && input.type !== 'submit') {
        const { value, name } = input
        if (validate(value, name)) {
          variables[name] = value
        } else {
          onInvalid(value, name)
          return
        }
      }
    }
  }

  return variables
}