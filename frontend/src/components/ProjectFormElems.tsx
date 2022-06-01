import { FormState, UseFormRegister, UseFormReset } from 'react-hook-form';
import { IFormProjectInput } from './CreateProject';

export interface IProjectFormElemsProps {
  formState: FormState<IFormProjectInput>,
  register: UseFormRegister<IFormProjectInput>,
  buttonText: string,
}

export const ProjectFormElems = ({formState, register, buttonText}: IProjectFormElemsProps) => {
  return (
    <div>
      <div><label>Project Name*</label></div>
      <input
        className={`text-field ${formState.errors.name && "text-field--error"}`}
        type="text"
        {...register('name', { required: true })}
      />

      <div><label>Customer</label></div>
      <input
        className={`text-field ${formState.errors.name && "text-field--error"}`}
        type="text"
        {...register('customer')}
      />

      <div>
        <input
          className={`number-field ${formState.errors.name && "number-field--error"}`}
          type="checkbox"
          {...register('isActive')}
        />
        <label>is active?</label>
      </div>

      <div><label>Hourly rate</label></div>
      <input
        className={`text-field ${formState.errors.name && "text-field--error"}`}
        type="number"
        step={10}
        min={0}
        {...register('hourly_rate', {valueAsNumber: true})}
      />

      <div className="btn-wrapper">
        <input className="btn btn--primary" type="submit" value={buttonText} />
      </div>

    </div>
  );
}