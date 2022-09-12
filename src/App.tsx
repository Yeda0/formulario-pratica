import './App.css';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';




type UserSubmitForm = {
  cpf : string,
  fullname: string,
  email: string;
  password: string;
  confirmPassword: string;
  acceptTerms: boolean;
};

export function App() {


  const validationSchema = Yup.object().shape({
    fullname: Yup.string().required('Insira seu nome completo'),
    cpf : Yup.string()
    .required('CPF requerido')
    .min(11, 'CPF tem que conter no minimo 11 caracteres')
    .max(11, 'O cpf deve ter no máximo 11 caracteres')
    ,
    email: Yup.string()
      .required('Email é obrigatório')
      .email('Email é inválido'),
    password: Yup.string()
      .required('Senha é obrigatória')
      .min(6, 'A senha deve ter pelo menos 6 caracteres')
      .max(40, 'A senha não deve exceder 40 caracteres'),
    confirmPassword: Yup.string()
      .required('Confirmar senha é necessária')
      .oneOf([Yup.ref('password'), null], 'As senhas nao combinam'),
    acceptTerms: Yup.bool().oneOf([true], 'Aceitar Termos é obrigatório')
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<UserSubmitForm>({
    resolver: yupResolver(validationSchema)
  });

  const onSubmit = (data: UserSubmitForm) => {
    console.log(JSON.stringify(data, null, 2));
  };

  return (
    <div className="register-form">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label>Nome completo</label>
          <input
            type="text"
            {...register('fullname')}
            className={`form-control ${errors.fullname ? 'is-invalid' : ''}`}
          />
          <div className="invalid-feedback">{errors.fullname?.message}</div>
        </div>

        <div className="form-group">
          <label>CPF</label>
          <input
            type="text"
            {...register('cpf')}
            className={`form-control ${errors.cpf ? 'is-invalid' : ''}`}
          />
          <div className="invalid-feedback">{errors.cpf?.message}</div>
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            type="text"
            {...register('email')}
            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
          />
          <div className="invalid-feedback">{errors.email?.message}</div>
        </div>

        <div className="form-group">
          <label>Senha</label>
          <input
            type="password"
            {...register('password')}
            className={`form-control ${errors.password ? 'is-invalid' : ''}`}
          />
          <div className="invalid-feedback">{errors.password?.message}</div>
        </div>
        <div className="form-group">
          <label>Confirme a senha</label>
          <input
            type="password"
            {...register('confirmPassword')}
            className={`form-control ${
              errors.confirmPassword ? 'is-invalid' : ''
            }`}
          />
          <div className="invalid-feedback">
            {errors.confirmPassword?.message}
          </div>
        </div>

        <div className="form-group form-check">
          <input
            type="checkbox"
            {...register('acceptTerms')}
            className={`form-check-input ${
              errors.acceptTerms ? 'is-invalid' : ''
            }`}
          />
          <label htmlFor="acceptTerms" className="form-check-label">
            Eu aceito os termos
          </label>
          <div className="invalid-feedback">{errors.acceptTerms?.message}</div>
        </div>

        <div className="form-group">
          <button onClick={handleSubmit(onSubmit)} type="submit" className="btn btn-primary">
            Register
          </button>
          <button
            type="button"
            onClick={() => reset()}
            className="btn btn-warning float-right"
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
};

export default App;
