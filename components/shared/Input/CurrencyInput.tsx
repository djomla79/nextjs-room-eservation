import {
  Control,
  Controller,
  FieldError,
  FieldErrorsImpl,
  Merge,
} from 'react-hook-form';
import { NumericFormat } from 'react-number-format';

type CurrencyInputProps = {
  name: string;
  error?: Merge<FieldError, FieldErrorsImpl<{}>> | null;
  control: Control<any, any> | undefined;
  defaultValue?: string | number;
};

const CurrencyInput = ({
  name,
  error = null,
  control,
  defaultValue = '',
}: CurrencyInputProps) => {
  return (
    <>
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        render={({ field: { ref, ...rest } }) => (
          <NumericFormat
            placeholder='Price'
            className={`p-2 rounded-xl bg-default-100 border-default border-medium focus-visible:outline-none ${
              error ? 'bg-danger-50' : ''
            }`}
            thousandSeparator=','
            decimalSeparator='.'
            suffix='€'
            decimalScale={2}
            getInputRef={ref}
            {...rest}
          />
        )}
      />
      {!!error && (
        <span className='text-danger text-tiny p-1'>{error?.message}</span>
      )}
    </>
  );
};

export default CurrencyInput;
