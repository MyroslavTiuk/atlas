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

const SignUpThird = () => {
  const [otp, setOtp] = useState<string | undefined>();
  const [availableResend, setAvailableResend] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [resendOtp] = useAuthMutation();

  const email = useSelector(
    (state: ReducersType) => state.reducers.loginReducer.email
  );

  useEffect(() => {
    if (!email) {
      return navigate("/signIn");
    }
  }, [email]);

  const verifyHandler = () => {
    if (!otp || otp.length < 6) {
      return setError("Otp should have 6 characters");
    }

    dispatch(loginActions.addFirstStepInfo({ otp }));
    navigate("/signIn/confirm-forgot-password");
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

  const changeOtpHandler = (event: string) => {
    setError("");
    setOtp(event);
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
              onChange={changeOtpHandler}
              numInputs={6}
              containerStyle={{ gap: "20px" }}
              renderInput={(props) => <input {...props} />}
            />
            {error && <span style={{ color: "red" }}>{error}</span>}
          </div>
          <div className={styles.container_form_content_resend}>
            Don’t see a code?{" "}
            <span onClick={resendHandler}>Resend to email</span>
          </div>
          <GradientButton type="submit" onClick={verifyHandler}>
            Verify email
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
