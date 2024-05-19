import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import styles from './RegConfirmForm.module.scss';
import { useContext } from 'react';
import { Context } from '../../../main';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { AxiosError } from 'axios';

const validationSchema = yup
  .object()
  .shape({
    email: yup.string().email('Некорректный email').required('Укажите email'),
    password: yup.string().required('Укажите пароль'),
  })
  .required();

type RegValues = yup.InferType<typeof validationSchema>;

function RegConfirmForm(): JSX.Element {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
    reset,
  } = useForm({
    mode: 'onSubmit',
    resolver: yupResolver(validationSchema),
  });

  console.log(errors);

  const [searchParams] = useSearchParams();
  const { store } = useContext(Context);
  const navigate = useNavigate();

  const onSubmit = async (values: RegValues) => {
    const { email, password } = values;
    const confirmationCode = searchParams.get('confirmationCode');
    try {
      const res = await store.confirmRegister(
        email,
        password,
        confirmationCode
      );

      if (res.status === 200) {
        reset();
        navigate('/');
      }
    } catch (e) {
      const error = e as AxiosError<{ message: string }>;
      console.log('ERROR', error);
      const errorMessage = error.message;
      setError('password', { type: 'custom', message: errorMessage });
    }
  };

  return (
    <>
      <h1>Подтвердите email и пароль</h1>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.inputContainer}>
          <label className={styles.label} htmlFor="email">
            Email
          </label>
          <input type="text" id="email" {...register('email')} />
          {errors?.email && (
            <span className={styles.errorText}>{errors.email.message}</span>
          )}
        </div>
        <div className={styles.inputContainer}>
          <label className={styles.label} htmlFor="password">
            Пароль
          </label>
          <input type="password" id="password" {...register('password')} />
          {errors?.password && (
            <span className={styles.errorText}>{errors.password.message}</span>
          )}
        </div>
        <button className={styles.btn} type="submit">
          Авторизоваться
        </button>
      </form>
    </>
  );
}

export default RegConfirmForm;
