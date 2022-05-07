import { ChangeEvent, InputHTMLAttributes } from 'react'
import { formatReal } from 'app/util/money';
import { maskCPF, maskDate, maskPhone } from 'app/util/mask';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    id: string;
    label: string;
    error?: string;
    columnClasses?: string;
    formatter?: (value: string) => string;
}

export const Input: React.FC<InputProps> = ({
    id,
    label,
    error,
    onChange,
    formatter,
    columnClasses,
    ...inputProps
}: InputProps) => {

    const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        const name = event.target.name;

        const formattedValue = (formatter && formatter(value as string)) || value

        onChange && onChange({
            ...event,
            target: {
              ...event.target,
                name,
                value: formattedValue                
            }
        })
    }

    return (
        <div className={`field column ${columnClasses}` }>
            <label className="label" htmlFor={id}>{label}</label>
            <div className="control">
                <input className="input" 
                    onChange={onInputChange}
                    id={id} {...inputProps} />
                {error &&
                    <p className="help is-danger">{ error }</p>
                }
            </div>
        </div>
    )
}

export const InputMoney: React.FC<InputProps> = (props: InputProps) => {
    return (
        <Input {...props} formatter={formatReal} />
    )
}

export const InputCPF: React.FC<InputProps> = (props:InputProps) => {
    return (
        <Input {...props} formatter={maskCPF} />
    )
}

export const InputTelefone: React.FC<InputProps> = (props:InputProps) => {
    return (
        <Input {...props} formatter={maskPhone}  />
    )
}

export const InputDate: React.FC<InputProps> = (props:InputProps) => {
    return (
        <Input {...props} maxLength={10} formatter={maskDate}   />
    )
}