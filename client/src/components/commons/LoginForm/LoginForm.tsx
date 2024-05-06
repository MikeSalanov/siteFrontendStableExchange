import * as yup from "yup"
import { useForm } from "react-hook-form"
 import {yupResolver} from "@hookform/resolvers/yup"
 import styles from "./LoginForm.module.scss"

const validationSchema = yup
.object()
  .shape({
    email: yup.string().email("Некорректный email").required("Укажите email"),
    password: yup.string().required("Укажите пароль")
  })
  .required();

  type RegValues = yup.InferType<typeof validationSchema>

function LoginForm(): JSX.Element {

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
    resolver: yupResolver(validationSchema)
  })

console.log(errors );


  const onSubmit = async (values: RegValues) => {
    const {email, password} = values
    try {
    await fetch('http://localhost:3000/api/signIn', {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({email, password})
    })
    
      
    } catch (error) {
      console.log(error);
    }
  }


  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.inputContainer} >
      <label className={styles.label} htmlFor="email">Email</label>
      <input type="text" id="email"  {...register("email")}/>
      {errors?.email &&  <span className={styles.errorText}>{errors.email.message}</span>}
      </div>
      <div className={styles.inputContainer} >
      <label className={styles.label} htmlFor="password">Пароль</label>
      <input type="password"  id="password" {...register("password")}/>
      {errors?.password &&  <span className={styles.errorText}>{errors.password.message}</span>}
      </div>
      <button className={styles.btn}  type="submit">Авторизоваться</button>
    </form>
  );
}

export default LoginForm;