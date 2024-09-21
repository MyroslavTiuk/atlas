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

const SignUpThird = () => {
  const [otp, setOtp] = useState<string | undefined>();
  const [isAvailableRequest, setIsAvailableRequest] = useState<boolean>(true);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [verifyOtp, { data: tokens, isSuccess }] = useAuthMutation();
  const [resendOtp, { isSuccess: successResend }] = useAuthMutation();

  const email = useSelector(
    (state: ReducersType) => state.reducers.loginReducer.email
  );

  useEffect(() => {
    if (successResend) {
      alert("Resent");
    }
    if (isSuccess) {
      dispatch(loginActions.anullateState());
      if (tokens.access) {
        localStorage.setItem("access", tokens?.access);
      }
      if (tokens.refresh) {
        localStorage.setItem("refresh", tokens?.refresh);
      }
      return navigate("/", { replace: true });
    }
  }, [isSuccess]);

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
    if (!isAvailableRequest) return;
    resendOtp({
      url: "user/send-otp/",
      method: "POST",
      body: {
        email,
      },
    });
    setIsAvailableRequest(false);
    setTimeout(() => setIsAvailableRequest(true), 120000);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.container_title}>Verify your email</h1>
      <section className={styles.container_form}>
        <div className={styles.container_form_content}>
          <div className={styles.container_form_content_items}>
            <div className={styles.container_form_content_item}>
              We just sent a 6 digit code to <br /> <span>name@gmail.com</span>
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
          </div>
          <div className={styles.container_form_content_resend}>
            Don’t see a code?{" "}
            <span onClick={resendHandler}>Resend to email</span>
          </div>
          <button type="submit" onClick={verifyHandler}>
            Verify email
          </button>
        </div>
      </section>
      <Link to="/signUp/security" className={styles.container_back_arrow}>
        <img src={BackArrow} alt="BackArrow" />
        <div>Back</div>
      </Link>
    </div>
  );
};

export default SignUpThird;
