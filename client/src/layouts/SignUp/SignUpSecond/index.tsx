import { useEffect } from "react";
import { SubmitHandler, useForm, Controller } from "react-hook-form";
import styles from "./style.module.scss";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ReducersType } from "../../../redux/store";
import { useAuthMutation } from "../../../redux/api/auth";
import { loginActions } from "../../../redux/slices/loginSlice";
import BackArrow from "../../../assets/BackArrow.svg";

interface IFormInput {
  answer_1: string;
  answer_2: string;
  answer_3: string;
}

const SignUpSecond = () => {
  const navigate = useNavigate();

  const { email, password } = useSelector(
    (state: ReducersType) => state.reducers.loginReducer
  );
  const dispatch = useDispatch();
  const [loginUser, { data, isSuccess, isError, error }]: any =
    useAuthMutation();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IFormInput>();
  const onSumbit: SubmitHandler<IFormInput> = (data) => {
    loginUser({
      url: "register/",
      method: "POST",
      body: {
        email,
        password,
        ...data,
      },
    });
  };

  useEffect(() => {
    if (!email || !password) {
      return navigate("/signUp");
    }

    if (isError) {
      return alert(error?.data?.email.map((item: string) => <>{item}</>));
    }
    if (isSuccess && !data?.access) {
      dispatch(loginActions.anullateState());
      navigate("/signIn");
    }
  }, [isSuccess, isError]);

  return (
    <div className={styles.container}>
      <h1 className={styles.container_title}>Security update questions</h1>
      <section className={styles.container_form}>
        <form
          onSubmit={handleSubmit(onSumbit)}
          className={styles.container_form_content}
        >
          <div className={styles.container_form_content_item}>
            <h1>Question 1</h1>
            <div className={styles.container_form_content_item_text}>
              <label>What was your favorite dish as a child?</label>
            </div>
            <Controller
              name="answer_1"
              control={control}
              rules={{
                required: "Required",
                pattern: {
                  value: /^.{3,}$/,
                  message: "Minimum 3 characters",
                },
              }}
              render={({ field }) => <input {...field} />}
            />
            {errors.answer_1 && (
              <span style={{ color: "red" }}>{errors.answer_1.message}</span>
            )}
          </div>
          <div className={styles.container_form_content_item}>
            <h1>Question 2</h1>
            <div className={styles.container_form_content_item_text}>
              <label>What was the name of your first pet?</label>
            </div>
            <Controller
              name="answer_2"
              control={control}
              rules={{
                required: "Required",
                pattern: {
                  value: /^.{3,}$/,
                  message: "Minimum 3 characters",
                },
              }}
              render={({ field }) => <input {...field} />}
            />
            {errors.answer_2 && (
              <span style={{ color: "red" }}>{errors.answer_2.message}</span>
            )}
          </div>
          <div className={styles.container_form_content_item}>
            <h1>Question 3</h1>
            <div className={styles.container_form_content_item_text}>
              <label>What was your favorite subject in school?</label>
            </div>
            <Controller
              name="answer_3"
              control={control}
              rules={{
                required: "Required",
                pattern: {
                  value: /^.{3,}$/,
                  message: "Minimum 3 characters",
                },
              }}
              render={({ field }) => <input {...field} />}
            />
            {errors.answer_3 && (
              <span style={{ color: "red" }}>{errors.answer_3.message}</span>
            )}
          </div>
          <button type="submit">Next</button>
        </form>
        <Link to="/signIn" className={styles.container_back_arrow}>
          <img src={BackArrow} alt="BackArrow" />
          <div>Back</div>
        </Link>
      </section>
    </div>
  );
};

export default SignUpSecond;
