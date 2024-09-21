import { useEffect, useState } from "react";
import styles from "./style.module.scss";
import BackArrow from "../../../assets/BackArrow.svg";
import Pencil from "../../../assets/Pencil.svg";
import { Link, useNavigate } from "react-router-dom";
import OTPInput from "react-otp-input";
import { useAuthMutation } from "../../../redux/api/auth";
import { useDispatch, useSelector } from "react-redux";
import { ReducersType } from "../../../redux/store";
import { loginActions } from "../../../redux/slices/loginSlice";
import { GradientButton } from "../../../components/GradientButton";
import { ClockLoader } from "react-spinners";

const SignUpThird = () => {
  const [otp, setOtp] = useState<string | undefined>();
  const [availableResend, setAvailableResend] = useState<boolean>(true);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [
    verifyOtp,
    { data: tokens, isSuccess, isLoading, error, isError },
  ]: any = useAuthMutation();

  const [resendOtp] = useAuthMutation();

  const email = useSelector(
    (state: ReducersType) => state.reducers.loginReducer.email
  );

  useEffect(() => {
    if (!email) {
      return navigate("/signIn");
    }
    if (isSuccess) {
      dispatch(loginActions.addFirstStepInfo({ otp }));
      if (tokens.access) {
        localStorage.setItem("access", tokens?.access);
      }
      if (tokens.refresh) {
        localStorage.setItem("refresh", tokens?.refresh);
      }
      return navigate("/", { replace: true });
    }
  }, [isSuccess, email]);

  const verifyHandler = () => {
    verifyOtp({
      url: "verify-otp/",
      method: "POST",
      body: {
        email,
        otp,
      },
    });
  };

  const resendHandler = () => {
    if (!availableResend) return;
    resendOtp({
      url: "send-otp/",
      method: "POST",
      body: {
        email,
      },
    });
    setAvailableResend(false);
    setTimeout(() => setAvailableResend(true), 120000);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.container_title}>Verify your email</h1>
      <section className={styles.container_form}>
        <div className={styles.container_form_content}>
          <div className={styles.container_form_content_items}>
            <div className={styles.container_form_content_item}>
              We just sent a 6 digit code to <br /> <span>{email}</span>
            </div>
            <img src={Pencil} alt="Pencil" width={24} height={24} />
          </div>
          <div className={styles.container_form_content_item}>
            <label>Code:</label>
            <OTPInput
              value={otp}
              onChange={setOtp}
              numInputs={6}
              containerStyle={{ gap: "20px" }}
              renderInput={(props) => <input {...props} />}
            />
            {isError && (
              <span style={{ color: "red" }}>
                {error?.data?.otp?.map((item: string) => (
                  <>{item}</>
                ))}
              </span>
            )}
          </div>
          <div className={styles.container_form_content_resend}>
            Don’t see a code?{" "}
            <span onClick={resendHandler}>Resend to email</span>
          </div>
          <GradientButton
            disabled={isLoading}
            type="submit"
            onClick={verifyHandler}
          >
            Verify email {isLoading && <ClockLoader color="white" size={30} />}
          </GradientButton>
        </div>
      </section>
      <Link to="/signIn" className={styles.container_back_arrow}>
        <img src={BackArrow} alt="BackArrow" />
        <div>Back</div>
      </Link>
    </div>
  );
};

export default SignUpThird;
