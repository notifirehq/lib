import { getInputProps, WidgetProps } from '@rjsf/utils';
import { Input } from '../../components/input/Input';

export const InputWidget = (props: WidgetProps) => {
  const { type, value, label, schema, onChange, options, required, readonly, rawErrors, disabled } = props;
  const inputProps = getInputProps(schema, type, options);

  return (
    <Input
      description={props.schema.description}
      onChange={(event) => onChange(event.target.value)}
      value={value}
      required={required}
      label={label}
      type={inputProps.type}
      error={rawErrors}
      readOnly={readonly}
      disabled={disabled}
    />
  );
};
