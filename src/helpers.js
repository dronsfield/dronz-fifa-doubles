import { compose, withState, withHandlers } from 'recompose'

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

export const capitalizeFirst = str => {
  return str.slice(0, 1).toUpperCase() + str.slice(1)
}

const getSetterName = (propName) => {
  return `set${capitalizeFirst(propName)}`
}

export const withStateEz = (propName) => {
  return withState(propName, getSetterName(propName), '')
}

export const withStateForInput = (propName) => {
  return compose(
    withStateEz(propName),
    withHandlers({
      [`onChange${capitalizeFirst(propName)}`]: props => e => {
        const setter = props[getSetterName(propName)]
        setter(e.target.value)
      }
    })
  )
}

export const withStateForInputs = (propNames) => {
  return compose(
    ...propNames.map(withStateForInput)
  )
}

const getMutationString = (...varNames) => {
  return `
    mutation (
${varNames.map(varName => `      $${varName}: String!`).join('\n')}
    ) {
      someMutation(
${varNames.map(varName => `        ${varName}: $${varName}`).join('\n')}
      ) {
        
      }
    }
  `
}

window.getMutationString = getMutationString