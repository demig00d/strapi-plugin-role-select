import React, { useMemo, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Select, Option } from '@strapi/design-system/Select'
import { useIntl } from 'react-intl'
import { useCMEditViewDataManager, LoadingIndicatorPage, } from '@strapi/helper-plugin';
import axiosInstance from '../../utils/axiosInstance';
import { Loader } from '@strapi/design-system';



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
  const { initialData } = useCMEditViewDataManager();
  const [isLoading, setIsLoading] = useState(true);
  const [possibleOptions, setPossibleOptions] = useState([])

  const show_id = initialData.id

  useEffect(async () => {
    await axiosInstance
      .get(`/role-select/roles/${show_id}`)
      .then((res) => {
        console.log(res.data)
        setPossibleOptions(res.data)
        setIsLoading(false)
      })
      .catch((e) => {
        console.log(e)
        setIsLoading(false)
      }
      )
  }, [])

  const sanitizedValue = useMemo(() => {
    let parsedValue
    try {
      parsedValue = JSON.parse(value || '[]')
    } catch (e) {
      parsedValue = []
    }
    return Array.isArray(parsedValue)
      ? possibleOptions.filter((val) =>
        parsedValue.some((option) => option.id === val.id),
      )
      : []
  }, [value, possibleOptions])

  if (isLoading) {
    return <LoadingIndicatorPage />;
  }

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
      {possibleOptions
        .sort((a, b) => a.order - b.order)
        .map((role) => (
          <Option value={role} key={role.id}>
            {`${role.role} - ${role.name}`}
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



