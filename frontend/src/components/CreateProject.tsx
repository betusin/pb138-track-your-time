import { SubmitHandler, useForm } from 'react-hook-form';
import { Navbar } from './Navbar';

export interface IFormProjectInput {
  name: string,
  customer: string,
  isActive: boolean,
  hourly_rate: number,
}

export const CreateProject = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormProjectInput>();

  const onSubmit: SubmitHandler<IFormProjectInput> = (data: IFormProjectInput) => {
    window.alert("new project would be created with data: " + data);
    console.log(data)
  };

  return (
    <div className="App">
      <Navbar />
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div><label>Project Name*</label></div>
          <input
            className={`text-field ${errors.name && "text-field--error"}`}
            type="text"
            {...register('name', { required: true })}
          />

          <div><label>Customer</label></div>
          <input
            className={`text-field ${errors.name && "text-field--error"}`}
            type="text"
            {...register('customer')}
          />

          <div>
            <input
              className={`number-field ${errors.name && "number-field--error"}`}
              type="checkbox"
              {...register('isActive')}
            />
            <label>is active?</label>
          </div>

          <div><label>Hourly rate</label></div>
          <input
            className={`text-field ${errors.name && "text-field--error"}`}
            type="number"
            step={10}
            min={0}
            {...register('hourly_rate', {valueAsNumber: true})}
          />

          <div className="btn-wrapper">
            <input className="btn btn--primary" type="submit" value="Create a project" />
          </div>

        </form>
      </div>
    </div>
  );
}