import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import styles from "./style.module.scss";

import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ReducersType } from "../../../redux/store";
import { useAuthMutation } from "../../../redux/api/auth";
import { loginActions } from "../../../redux/slices/loginSlice";
import BackArrow from "../../../assets/BackArrow.svg";
import { ClockLoader } from "react-spinners";

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
  const [loginUser, { data, isSuccess, isError, error, isLoading }]: any =
    useAuthMutation();

  const { register, handleSubmit } = useForm<IFormInput>();
  const onSumbit: SubmitHandler<IFormInput> = (data) => {
    loginUser({
      url: "login/",
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
      return navigate("/signIn");
    }

    if (isError) {
      return alert(error?.data?.detail);
    }
    if (isSuccess && data?.access) {
      localStorage.setItem("access", data?.access);
      localStorage.setItem("refresh", data?.refresh);
      dispatch(loginActions.anullateState());
      return navigate("/", { replace: true });
    }
    if (isSuccess && !data?.access) {
      navigate("/signIn/verify-login");
    }
  }, [isSuccess, isError, email]);

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
            <input
              placeholder="Answer 1"
              {...register("answer_1")}
              type="text"
            />
          </div>
          <div className={styles.container_form_content_item}>
            <h1>Question 2</h1>
            <div className={styles.container_form_content_item_text}>
              <label>What was the name of your first pet?</label>
            </div>
            <input
              placeholder="Answer 2"
              {...register("answer_2")}
              type="text"
            />
          </div>
          <div className={styles.container_form_content_item}>
            <h1>Question 3</h1>
            <div className={styles.container_form_content_item_text}>
              <label>What was your favorite subject in school?</label>
            </div>
            <input
              placeholder="Answer 3"
              {...register("answer_3")}
              type="text"
            />
          </div>
          <button disabled={isLoading} type="submit">
            Next {isLoading && <ClockLoader color="white" size={30} />}
          </button>
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
