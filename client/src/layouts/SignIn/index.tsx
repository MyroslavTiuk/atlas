import { SubmitHandler, useForm, Controller } from "react-hook-form";
import styles from "./style.module.scss";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginActions } from "../../redux/slices/loginSlice";

export interface IFormInput {
  email: string;
  password: string;
}

const SignIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<IFormInput>();
  const onSumbit: SubmitHandler<IFormInput> = (data) => {
    dispatch(loginActions.addFirstStepInfo(data));
    navigate("/signIn/security");
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.container_title}>Sign in</h1>
      <section className={styles.container_form}>
        <form
          onSubmit={handleSubmit(onSumbit)}
          className={styles.container_form_content}
        >
          <div className={styles.container_form_content_item}>
            <label>Email</label>
            <Controller
              name="email"
              control={control}
              rules={{
                required: "Required",
              }}
              render={({ field }) => <input {...field} />}
            />
            {errors.email && (
              <span style={{ color: "red" }}>{errors.email.message}</span>
            )}
          </div>
          <div className={styles.container_form_content_item}>
            <label>Password</label>
            <Controller
              name="password"
              control={control}
              rules={{
                required: "Required",
                pattern: {
                  value: /^(?=.*[A-Z])(?=.*\d).{6,}$/,
                  message: "Password is required",
                },
              }}
              render={({ field }) => <input type="password" {...field} />}
            />
            {errors.password && (
              <span style={{ color: "red" }}>{errors.password.message}</span>
            )}
            <p onClick={() => navigate("/signIn/forgot-password")}>
              Forgot password?
            </p>
          </div>
          <button type="submit">Sign in</button>
          <span>
            Don’t have an account yet? <Link to="/signUp">Sign up now</Link>
          </span>
        </form>
      </section>
    </div>
  );
};

export default SignIn;
