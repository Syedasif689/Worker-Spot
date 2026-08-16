import { useEffect, useState } from "react";

import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  UserPlus,
  Users,
  Briefcase,
  ShieldCheck,
  Clock,
  HandCoins,
  Sparkles,
  CheckCircle,
  Phone,
  KeyRound,
} from "lucide-react";

import "./Userrig.css";

function CustomerRegister() {

  // =====================================================
  // STATE
  // =====================================================

  const [showPassword, setShowPassword] =
    useState(false);

  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [error, setError] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [otpLoading, setOtpLoading] =
    useState(false);

  const [verifyLoading, setVerifyLoading] =
    useState(false);

  const [mobileVerified, setMobileVerified] =
    useState(false);

  const [otpSent, setOtpSent] =
    useState(false);

  const [otp, setOtp] =
    useState("");

  const [mobileVerificationId, setMobileVerificationId] =
    useState("");


  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
    terms: false,
  });


  // =====================================================
  // MSG91 CONFIGURATION
  // =====================================================
  //
  // Widget name in MSG91:
  //
  // WorkerSpotOTP
  //
  // IMPORTANT:
  // Use the widget token here.
  // Do NOT put your MSG91 AuthKey in React.
  //
  // =====================================================

  const MSG91_WIDGET_ID =
    "366870706548333338313437";

  const MSG91_TOKEN_AUTH =
    "561254TY6eDVgBv1CE6a81eafdP1";


  const MSG91_CAPTCHA_ID =
    "workerspot-msg91-captcha";


  // =====================================================
  // LOAD MSG91 OTP WIDGET
  // =====================================================

  useEffect(() => {

    // ---------------------------------------------------
    // SUCCESS CALLBACK
    // ---------------------------------------------------

    window.handleWorkerSpotOTPSuccess = (data) => {

      console.log(
        "MSG91 OTP success:",
        data
      );


      const accessToken =
  data?.token ||
  data?.["access-token"] ||
  data?.accessToken ||
  data?.message;


      if (!accessToken) {

        console.error(
          "MSG91 verification succeeded but access token was not returned.",
          data
        );

        setMobileVerified(false);

        setMobileVerificationId("");

        setError(
          "OTP verification completed, but the verification token was not received. Please try again."
        );

        return;
      }


      // -------------------------------------------------
      // STORE VERIFIED ACCESS TOKEN
      // -------------------------------------------------

      setMobileVerificationId(
        accessToken
      );


      setMobileVerified(
        true
      );


      setOtpSent(
        false
      );


      setOtp(
        ""
      );


      setError("");


      console.log(
        "Mobile number successfully verified."
      );
    };


    // ---------------------------------------------------
    // FAILURE CALLBACK
    // ---------------------------------------------------

    window.handleWorkerSpotOTPFailure = (err) => {

      console.error(
        "MSG91 OTP failure:",
        err
      );


      setMobileVerified(
        false
      );


      setMobileVerificationId(
        ""
      );


      setVerifyLoading(
        false
      );


      setOtpLoading(
        false
      );


      setError(
        "Mobile number verification failed. Please check the OTP and try again."
      );
    };


    // ---------------------------------------------------
    // EXISTING SCRIPT
    // ---------------------------------------------------

    const existingScript =
      document.querySelector(
        'script[data-workerspot-msg91="true"]'
      );


    // ---------------------------------------------------
    // MSG91 CONFIGURATION
    // ---------------------------------------------------

    window.workerSpotMSG91Configuration = {

      widgetId:
        MSG91_WIDGET_ID,

      tokenAuth:
        MSG91_TOKEN_AUTH,

      exposeMethods:
        true,

      captchaRenderId:
        MSG91_CAPTCHA_ID,

      success:
        window.handleWorkerSpotOTPSuccess,

      failure:
        window.handleWorkerSpotOTPFailure,
    };


    // ---------------------------------------------------
    // INITIALIZE MSG91
    // ---------------------------------------------------

    const initializeMSG91 = () => {

      if (
        typeof window.initSendOTP !==
        "function"
      ) {

        console.warn(
          "MSG91 initSendOTP is not available yet."
        );

        return;
      }


      try {

        window.initSendOTP(
          window.workerSpotMSG91Configuration
        );


        console.log(
          "MSG91 OTP widget initialized."
        );

      } catch (err) {

        console.error(
          "MSG91 initialization error:",
          err
        );

        setError(
          "Unable to initialize mobile verification."
        );
      }
    };


    // ---------------------------------------------------
    // SCRIPT ALREADY LOADED
    // ---------------------------------------------------

    if (existingScript) {

      if (
        typeof window.initSendOTP ===
        "function"
      ) {

        initializeMSG91();

      } else {

        existingScript.addEventListener(
          "load",
          initializeMSG91,
          { once: true }
        );
      }


      return () => {

        delete window.handleWorkerSpotOTPSuccess;

        delete window.handleWorkerSpotOTPFailure;
      };
    }


    // ---------------------------------------------------
    // LOAD MSG91 SCRIPT
    // ---------------------------------------------------

    const script =
      document.createElement("script");


    script.src =
      "https://verify.msg91.com/otp-provider.js";


    script.async =
      true;


    script.dataset.workerspotMsg91 =
      "true";


    script.onload = () => {

      console.log(
        "MSG91 OTP script loaded."
      );


      initializeMSG91();
    };


    script.onerror = () => {

      console.error(
        "Failed to load MSG91 OTP script."
      );


      setError(
        "Unable to load mobile verification service. Please check your internet connection."
      );
    };


    document.head.appendChild(
      script
    );


    // ---------------------------------------------------
    // CLEANUP
    // ---------------------------------------------------

    return () => {

      delete window.handleWorkerSpotOTPSuccess;

      delete window.handleWorkerSpotOTPFailure;
    };

  }, []);


  // =====================================================
  // HANDLE INPUT CHANGES
  // =====================================================

  const handleChange = (e) => {

    const {
      name,
      value,
      type,
      checked,
    } = e.target;


    // ---------------------------------------------------
    // MOBILE
    // ---------------------------------------------------

    if (name === "mobile") {

      const numericValue =
        value
          .replace(/\D/g, "")
          .slice(0, 10);


      // -------------------------------------------------
      // MOBILE CHANGED
      // -------------------------------------------------

      if (
        numericValue !==
        formData.mobile
      ) {

        setMobileVerified(
          false
        );

        setMobileVerificationId(
          ""
        );

        setOtpSent(
          false
        );

        setOtp(
          ""
        );
      }


      setFormData(
        (prev) => ({
          ...prev,
          mobile:
            numericValue,
        })
      );


      setError("");

      return;
    }


    // ---------------------------------------------------
    // OTP
    // ---------------------------------------------------

    if (name === "otp") {

      const numericOtp =
        value
          .replace(/\D/g, "")
          .slice(0, 6);


      setOtp(
        numericOtp
      );


      setError("");

      return;
    }


    // ---------------------------------------------------
    // OTHER INPUTS
    // ---------------------------------------------------

    setFormData(
      (prev) => ({
        ...prev,

        [name]:
          type === "checkbox"
            ? checked
            : value,
      })
    );


    setError("");
  };


  // =====================================================
  // SEND OTP
  // =====================================================

  const handleVerifyMobile = () => {

    setError("");


    // ---------------------------------------------------
    // MOBILE VALIDATION
    // ---------------------------------------------------

    const mobile =
      formData.mobile.trim();


    if (
      !/^[6-9][0-9]{9}$/.test(
        mobile
      )
    ) {

      setError(
        "Please enter a valid 10-digit Indian mobile number."
      );

      return;
    }


    if (mobileVerified) {

      setError(
        "Mobile number is already verified."
      );

      return;
    }


    // ---------------------------------------------------
    // CHECK MSG91
    // ---------------------------------------------------

    if (
      typeof window.sendOtp !==
      "function"
    ) {

      setError(
        "Mobile verification service is still loading. Please wait a moment and try again."
      );

      console.error(
        "MSG91 sendOtp() is not available."
      );

      return;
    }


    setOtpLoading(
      true
    );


    try {

      /*
       * MSG91 expects the mobile number
       * with country code.
       *
       * India:
       *
       * 91XXXXXXXXXX
       *
       * No + sign.
       */

      const mobileWithCountryCode =
        "91" + mobile;


      console.log(
        "Sending OTP to:",
        mobileWithCountryCode
      );


      window.sendOtp(

        mobileWithCountryCode,

        (data) => {

          console.log(
            "MSG91 OTP sent successfully:",
            data
          );


          setOtpLoading(
            false
          );


          setOtpSent(
            true
          );


          setError("");
        },

        (err) => {

          console.error(
            "MSG91 send OTP error:",
            err
          );


          setOtpLoading(
            false
          );


          setOtpSent(
            false
          );


          setError(
            "Unable to send OTP. Please complete the captcha and try again."
          );
        }
      );

    } catch (err) {

      console.error(
        "OTP initiation error:",
        err
      );


      setOtpLoading(
        false
      );


      setError(
        "Unable to start OTP verification. Please try again."
      );
    }
  };


  // =====================================================
  // VERIFY OTP
  // =====================================================

  const handleVerifyOTP = () => {

    setError("");


    // ---------------------------------------------------
    // OTP VALIDATION
    // ---------------------------------------------------

    if (
      !/^[0-9]{4,6}$/.test(
        otp
      )
    ) {

      setError(
        "Please enter the OTP received on your mobile."
      );

      return;
    }


    // ---------------------------------------------------
    // MSG91 VERIFY METHOD
    // ---------------------------------------------------

    if (
      typeof window.verifyOtp !==
      "function"
    ) {

      setError(
        "OTP verification service is not ready. Please refresh the page and try again."
      );

      console.error(
        "MSG91 verifyOtp() is not available."
      );

      return;
    }


    setVerifyLoading(
      true
    );


    try {

      console.log(
        "Verifying OTP..."
      );


      window.verifyOtp(

        otp,

        (data) => {

          console.log(
            "MSG91 OTP verification response:",
            data
          );


          setVerifyLoading(
            false
          );


             const accessToken =
  data?.token ||
  data?.["access-token"] ||
  data?.accessToken ||
  data?.message;


          if (!accessToken) {

            setMobileVerified(
              false
            );

            setMobileVerificationId(
              ""
            );


            setError(
              "OTP was verified, but MSG91 did not return a verification token."
            );

            return;
          }


          // -------------------------------------------------
          // VERIFIED
          // -------------------------------------------------

          setMobileVerificationId(
            accessToken
          );


          setMobileVerified(
            true
          );


          setOtpSent(
            false
          );


          setOtp(
            ""
          );


          setError("");


          console.log(
            "Mobile number verified successfully."
          );
        },

        (err) => {

          console.error(
            "MSG91 verify OTP error:",
            err
          );


          setVerifyLoading(
            false
          );


          setMobileVerified(
            false
          );


          setMobileVerificationId(
            ""
          );


          setError(
            "Invalid OTP or OTP expired. Please try again."
          );
        }
      );

    } catch (err) {

      console.error(
        "OTP verification error:",
        err
      );


      setVerifyLoading(
        false
      );


      setError(
        "Unable to verify OTP. Please try again."
      );
    }
  };


  // =====================================================
  // RESEND OTP
  // =====================================================

  const handleResendOTP = () => {

    setOtp("");

    setError("");

    setOtpSent(false);

    handleVerifyMobile();
  };


  // =====================================================
  // SUBMIT REGISTRATION
  // =====================================================

  const handleSubmit = async (e) => {

    e.preventDefault();


    setError("");


    // ---------------------------------------------------
    // FULL NAME
    // ---------------------------------------------------

    if (
      formData.fullName.trim().length < 2
    ) {

      setError(
        "Please enter your full name."
      );

      return;
    }


    // ---------------------------------------------------
    // EMAIL
    // ---------------------------------------------------

    if (
      !formData.email.trim()
    ) {

      setError(
        "Please enter your email address."
      );

      return;
    }


    // ---------------------------------------------------
    // MOBILE
    // ---------------------------------------------------

    if (
      !/^[6-9][0-9]{9}$/.test(
        formData.mobile
      )
    ) {

      setError(
        "Please enter a valid 10-digit Indian mobile number."
      );

      return;
    }


    // ---------------------------------------------------
    // MOBILE VERIFICATION
    // ---------------------------------------------------

    if (
      !mobileVerified ||
      !mobileVerificationId
    ) {

      setError(
        "Please verify your mobile number with OTP before creating your account."
      );

      return;
    }


    // ---------------------------------------------------
    // PASSWORD
    // ---------------------------------------------------

    if (
      formData.password.length < 8
    ) {

      setError(
        "Password must be at least 8 characters."
      );

      return;
    }


    if (
      formData.password !==
      formData.confirmPassword
    ) {

      setError(
        "Passwords do not match."
      );

      return;
    }


    // ---------------------------------------------------
    // TERMS
    // ---------------------------------------------------

    if (
      !formData.terms
    ) {

      setError(
        "Please agree to the Terms and Conditions."
      );

      return;
    }


    // ---------------------------------------------------
    // START REGISTRATION
    // ---------------------------------------------------

    setLoading(
      true
    );


    try {

      const response =
        await fetch(
          "http://localhost:8080/api/auth/register/customer",
          {
            method:
              "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body:
              JSON.stringify({

                fullName:
                  formData.fullName.trim(),

                email:
                  formData.email
                    .trim()
                    .toLowerCase(),

                mobile:
                  formData.mobile.trim(),

                password:
                  formData.password,

                mobileVerificationId:
                  mobileVerificationId,
              }),
          }
        );


      // -------------------------------------------------
      // READ RESPONSE
      // -------------------------------------------------

      let data = {};


      try {

        data =
          await response.json();

      } catch {

        data = {};
      }


      console.log(
        "Backend status:",
        response.status
      );


      console.log(
        "Backend response:",
        data
      );


      // -------------------------------------------------
      // BACKEND ERROR
      // -------------------------------------------------

      if (
        !response.ok
      ) {

        throw new Error(
          data.message ||
          data.error ||
          "Customer registration failed."
        );
      }


      // -------------------------------------------------
      // SUCCESS
      // -------------------------------------------------

      alert(
        "Customer registration successful!"
      );


      // -------------------------------------------------
      // RESET
      // -------------------------------------------------

      setFormData({
        fullName: "",
        email: "",
        mobile: "",
        password: "",
        confirmPassword: "",
        terms: false,
      });


      setMobileVerified(
        false
      );


      setMobileVerificationId(
        ""
      );


      setOtpSent(
        false
      );


      setOtp(
        ""
      );


    } catch (err) {

      console.error(
        "Registration error:",
        err
      );


      setError(
        err.message ||
        "Something went wrong. Please try again."
      );

    } finally {

      setLoading(
        false
      );
    }
  };


  // =====================================================
  // UI
  // =====================================================

  return (

    <div className="customer-register-page">


      {/* =================================================
          LEFT HERO
      ================================================= */}

      <section className="customer-hero">

        <div className="customer-hero-content">

          <div className="customer-hero-badge">

            <Sparkles size={16} />

            <span>
              Worker Spot
            </span>

          </div>


          <div className="customer-hero-icon-group">

            <div className="customer-hero-icon-ring">

              <Users
                size={48}
                strokeWidth={1.5}
              />

            </div>


            <div className="customer-hero-icon-ring small">

              <Briefcase
                size={24}
                strokeWidth={1.5}
              />

            </div>


            <div className="customer-hero-icon-ring small">

              <ShieldCheck
                size={24}
                strokeWidth={1.5}
              />

            </div>

          </div>


          <h1>

            Find Trusted

            <span>
              {" "}Workers
            </span>

          </h1>


          <p className="customer-hero-subtitle">

            Connect with skilled professionals in your area.
            Find the right worker for your needs and get your
            work done with confidence.

          </p>


          <div className="customer-hero-benefits">


            <div className="customer-hero-benefit">

              <div className="customer-hero-benefit-icon">

                <HandCoins size={18} />

              </div>

              <div>

                <strong>
                  Simple Booking
                </strong>

                <span>
                  Easy way to find workers
                </span>

              </div>

            </div>


            <div className="customer-hero-benefit">

              <div className="customer-hero-benefit-icon">

                <CheckCircle size={18} />

              </div>

              <div>

                <strong>
                  Trusted Workers
                </strong>

                <span>
                  Connect with local professionals
                </span>

              </div>

            </div>


            <div className="customer-hero-benefit">

              <div className="customer-hero-benefit-icon">

                <Clock size={18} />

              </div>

              <div>

                <strong>
                  Quick Response
                </strong>

                <span>
                  Find help when you need it
                </span>

              </div>

            </div>


            <div className="customer-hero-benefit">

              <div className="customer-hero-benefit-icon">

                <ShieldCheck size={18} />

              </div>

              <div>

                <strong>
                  Safe & Secure
                </strong>

                <span>
                  Your information stays protected
                </span>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =================================================
          RIGHT FORM
      ================================================= */}

      <section className="customer-form-panel">

        <div className="customer-register-card">


          <div className="customer-register-header">

            <div className="customer-register-icon">

              <UserPlus size={28} />

            </div>


            <h1>
              Create Customer Account
            </h1>


            <p>

              Create your account and start finding
              trusted workers today.

            </p>

          </div>


          {/* =================================================
              FORM
          ================================================= */}

          <form onSubmit={handleSubmit}>


            {/* =================================================
                FULL NAME
            ================================================= */}

            <div className="form-group">

              <label htmlFor="fullName">
                Full Name
              </label>


              <div className="input-box">

                <User size={20} />


                <input
                  id="fullName"
                  type="text"
                  name="fullName"
                  placeholder="Enter your full name"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                />

              </div>

            </div>


            {/* =================================================
                EMAIL
            ================================================= */}

            <div className="form-group">

              <label htmlFor="email">
                Email Address
              </label>


              <div className="input-box">

                <Mail size={20} />


                <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />

              </div>

            </div>


            {/* =================================================
                MOBILE
            ================================================= */}

            <div className="form-group">

              <label htmlFor="mobile">
                Mobile Number
              </label>


              <div className="input-box">

                <Phone size={20} />


                <input
                  id="mobile"
                  type="tel"
                  name="mobile"
                  placeholder="Enter your mobile number"
                  value={formData.mobile}
                  onChange={handleChange}
                  maxLength="10"
                  inputMode="numeric"
                  required
                  disabled={mobileVerified}
                />

              </div>


              {/* =================================================
                  HCAPTCHA
              ================================================= */}

              {!mobileVerified && (

                <div
                  id={MSG91_CAPTCHA_ID}
                  style={{
                    marginTop: "12px",
                    minHeight: "10px",
                  }}
                />

              )}


              {/* =================================================
                  SEND OTP
              ================================================= */}

              {!mobileVerified && !otpSent && (

                <button
                  type="button"
                  className="register-button"
                  onClick={handleVerifyMobile}
                  disabled={
                    otpLoading ||
                    formData.mobile.length !== 10
                  }
                  style={{
                    marginTop: "10px",
                  }}
                >

                  <Phone size={18} />

                  {otpLoading
                    ? "Sending OTP..."
                    : "Send OTP"}

                </button>

              )}


              {/* =================================================
                  OTP INPUT
              ================================================= */}

              {!mobileVerified && otpSent && (

                <div
                  style={{
                    marginTop: "14px",
                  }}
                >

                  <label
                    htmlFor="otp"
                    style={{
                      display: "block",
                      marginBottom: "8px",
                    }}
                  >

                    Enter OTP

                  </label>


                  <div className="input-box">

                    <KeyRound size={20} />


                    <input
                      id="otp"
                      type="text"
                      name="otp"
                      inputMode="numeric"
                      maxLength="6"
                      placeholder="Enter OTP"
                      value={otp}
                      onChange={handleChange}
                      autoComplete="one-time-code"
                    />

                  </div>


                  <button
                    type="button"
                    className="register-button"
                    onClick={handleVerifyOTP}
                    disabled={
                      verifyLoading ||
                      otp.length < 4
                    }
                    style={{
                      marginTop: "10px",
                    }}
                  >

                    <CheckCircle size={18} />

                    {verifyLoading
                      ? "Verifying OTP..."
                      : "Verify OTP"}

                  </button>


                  <button
                    type="button"
                    onClick={handleResendOTP}
                    disabled={otpLoading}
                    style={{
                      marginTop: "8px",
                      width: "100%",
                      background: "transparent",
                      border: "none",
                      color: "#FF8A00",
                      cursor: "pointer",
                      fontWeight: "600",
                    }}
                  >

                    {otpLoading
                      ? "Sending..."
                      : "Didn't receive OTP? Resend"}

                  </button>

                </div>

              )}


              {/* =================================================
                  VERIFIED
              ================================================= */}

              {mobileVerified && (

                <div
                  style={{
                    marginTop: "10px",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    color: "#22c55e",
                    fontSize: "14px",
                    fontWeight: "600",
                  }}
                >

                  <CheckCircle size={18} />

                  Mobile number verified

                </div>

              )}

            </div>


            {/* =================================================
                PASSWORD
            ================================================= */}

            <div className="form-group">

              <label htmlFor="password">
                Password
              </label>


              <div className="input-box">

                <Lock size={20} />


                <input
                  id="password"
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  name="password"
                  placeholder="Create a password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />


                <button
                  type="button"
                  className="password-button"
                  onClick={() =>
                    setShowPassword(
                      (prev) => !prev
                    )
                  }
                  aria-label={
                    showPassword
                      ? "Hide password"
                      : "Show password"
                  }
                >

                  {showPassword ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}

                </button>

              </div>


              <p className="password-hint">

                Password must be at least 8 characters.

              </p>

            </div>


            {/* =================================================
                CONFIRM PASSWORD
            ================================================= */}

            <div className="form-group">

              <label htmlFor="confirmPassword">

                Confirm Password

              </label>


              <div className="input-box">

                <Lock size={20} />


                <input
                  id="confirmPassword"
                  type={
                    showConfirmPassword
                      ? "text"
                      : "password"
                  }
                  name="confirmPassword"
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />


                <button
                  type="button"
                  className="password-button"
                  onClick={() =>
                    setShowConfirmPassword(
                      (prev) => !prev
                    )
                  }
                  aria-label={
                    showConfirmPassword
                      ? "Hide confirm password"
                      : "Show confirm password"
                  }
                >

                  {showConfirmPassword ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}

                </button>

              </div>

            </div>


            {/* =================================================
                TERMS
            ================================================= */}

            <div className="terms">

              <input
                id="terms"
                type="checkbox"
                name="terms"
                checked={formData.terms}
                onChange={handleChange}
                required
              />


              <label htmlFor="terms">

                I agree to the{" "}

                <a
                  href="/terms"
                  target="_blank"
                  rel="noreferrer"
                >
                  Terms & Conditions
                </a>

                {" "}and{" "}

                <a
                  href="/privacy"
                  target="_blank"
                  rel="noreferrer"
                >
                  Privacy Policy
                </a>

                .

              </label>

            </div>


            {/* =================================================
                SAFETY
            ================================================= */}

            <div className="registration-safety">

              <ShieldCheck size={15} />


              <span>

                Please read our{" "}

                <a
                  href="/safety"
                  target="_blank"
                  rel="noreferrer"
                >
                  Safety Guidelines
                </a>

                {" "}before using Worker Spot.

              </span>

            </div>


            {/* =================================================
                ERROR
            ================================================= */}

            {error && (

              <div className="error-message">

                {error}

              </div>

            )}


            {/* =================================================
                SUBMIT
            ================================================= */}

            <button
              type="submit"
              className="register-button"
              disabled={
                loading ||
                !mobileVerified
              }
            >

              <UserPlus size={20} />


              {loading
                ? "Creating Account..."
                : "Create Customer Account"}

            </button>


            {/* =================================================
                LOGIN
            ================================================= */}

            <div className="already-account">

              <span>
                Already have an account?
              </span>


              <a href="/customer-login">
                Login as Customer
              </a>

            </div>


          </form>

        </div>

      </section>

    </div>
  );
}


export default CustomerRegister;