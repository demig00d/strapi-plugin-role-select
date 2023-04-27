import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import { Select, Option } from '@strapi/design-system/Select'
import { useIntl } from 'react-intl'

const RoleSelect = ({
  value,
  onChange,
  name,
  intlLabel,
  required,
  attribute,
  description,
  placeholder,
  disabled,
  error,
}) => {
  const { formatMessage } = useIntl()

  const possibleOptions =
    [
      { roleTitle: 'Роль1', actor: 'Актёр1', id: 1 },
      { roleTitle: 'Роль2', actor: 'Актёр2', id: 34 },
      { roleTitle: 'Роль3', actor: 'Актёр3', id: 50 },
      { roleTitle: 'Роль4', actor: 'Актёр4', id: 60 },
      { roleTitle: 'Роль5', actor: 'Актёр5', id: 20 },
      { roleTitle: 'Маленький принц, ', actor: 'Герасимов Евгений', id: 10 },
      { roleTitle: 'Географ, Деловой человек, Король, Пьяница, Фонарщик, Честолюбец', actor: 'Ронжин Захар', id: 340 },
      { roleTitle: 'Роль8', actor: 'Актёр3', id: 500 },
      { roleTitle: 'Роль9', actor: 'Актёр4', id: 600 },
      { roleTitle: 'Роль5', actor: 'Актёр5', id: 23 }
    ]


  const sanitizedValue = useMemo(() => {
    let parsedValue
    try {
      parsedValue = JSON.parse(value || '[]')
    } catch (e) {
      parsedValue = []
    }
    return Array.isArray(parsedValue)
      ? parsedValue.filter((id) =>
        possibleOptions.some((option) => option.id === id),
      )
      : []
  }, [value, possibleOptions])

  return (
    <Select
      name={name}
      id={name}
      label={formatMessage(intlLabel)}
      error={
        error || (required && !possibleOptions.length ? 'No options' : null)
      }
      disabled={disabled || possibleOptions.length === 0}
      required={required}
      hint={description && formatMessage(description)}
      onChange={(v) => {
        onChange({
          target: {
            name: name,
            value: JSON.stringify(v.filter(Boolean)),
            type: attribute.type,
          },
        })
      }}
      placeholder={placeholder}
      multi
      value={sanitizedValue}
      withTags>
      {possibleOptions.map(({ roleTitle, actor, id }) => (
        <Option value={id} key={id}>
          {`${roleTitle} - ${actor}`}
        </Option>
      ))}
    </Select>
  )
}

RoleSelect.defaultProps = {
  description: null,
  disabled: false,
  error: null,
  labelAction: null,
  required: false,
  value: '',
}

RoleSelect.propTypes = {
  intlLabel: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  attribute: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.object,
  disabled: PropTypes.bool,
  error: PropTypes.string,
  labelAction: PropTypes.object,
  required: PropTypes.bool,
  value: PropTypes.string,
}

export default RoleSelect
