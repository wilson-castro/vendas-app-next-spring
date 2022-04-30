import { InputHTMLAttributes } from "react";
import {formatReal} from "app/util/money";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  currency?: boolean;
  columnClasses?: string;
  onChange?: (value:any) => void;
  error?: string;
}


export const Input: React.FC<InputProps> = ({
  id,
  error,
  label,
  currency,
  onChange,
  columnClasses = "",
  ...inputProps
}: InputProps) => {

  const onInputChange = (event : any ) => {
    let value = event.target.value && currency ?
      formatReal(event.target.value) : event.target.value;
    onChange && onChange(value);
  }
  
  
  return (
    <div className={`field column ${columnClasses}`}>
      <label className="label" htmlFor={id}>{label}</label>
      <input className="input" 
        id={id} {...inputProps}
        onChange={ event => onInputChange(event) }
      />
      {error &&
        <p className="help is-danger"> { error }</p>
      }
    </div>
  )
}