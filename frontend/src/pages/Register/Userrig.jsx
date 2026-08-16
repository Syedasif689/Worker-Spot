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

  const [mobileVerified, setMobileVerified] =
    useState(false);

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

  const MSG91_WIDGET_ID =
    "366870706548333338313437";

  const MSG91_TOKEN_AUTH =
    "561254TY6eDVgBv1CE6a81eafdP1";


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


      /*
       * MSG91 returns the verified access token.
       *
       * Depending on the widget response format,
       * the token may be available as:
       *
       * data.token
       * data["access-token"]
       * data.accessToken
       */

      const accessToken =
        data?.token ||
        data?.["access-token"] ||
        data?.accessToken;


      if (!accessToken) {

        console.error(
          "MSG91 verification succeeded but no access token was returned.",
          data
        );

        setError(
          "Mobile verification completed, but verification token was not received. Please try again."
        );

        setMobileVerified(false);

        return;
      }


      // -------------------------------------------------
      // STORE VERIFIED TOKEN
      // -------------------------------------------------

      setMobileVerificationId(
        accessToken
      );


      setMobileVerified(
        true
      );


      setError("");


      console.log(
        "Mobile number successfully verified."
      );

    };


    // ---------------------------------------------------
    // FAILURE CALLBACK
    // ---------------------------------------------------

    window.handleWorkerSpotOTPFailure = (error) => {

      console.error(
        "MSG91 OTP failure:",
        error
      );


      setMobileVerified(
        false
      );

      setMobileVerificationId(
        ""
      );


      setError(
        "Mobile number verification failed. Please try again."
      );

    };


    // ---------------------------------------------------
    // CHECK IF SCRIPT ALREADY EXISTS
    // ---------------------------------------------------

    const existingScript =
      document.querySelector(
        'script[data-workerspot-msg91="true"]'
      );


    if (existingScript) {

      initializeMSG91();

      return () => {

        delete window.handleWorkerSpotOTPSuccess;
        delete window.handleWorkerSpotOTPFailure;

      };
    }


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


      success:
        window.handleWorkerSpotOTPSuccess,


      failure:
        window.handleWorkerSpotOTPFailure,
    };


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
        "Unable to load mobile verification service. Please check your internet connection and try again."
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


    // ===================================================
    // INITIALIZE MSG91
    // ===================================================

    function initializeMSG91() {

      if (
        typeof window.initSendOTP !==
        "function"
      ) {

        console.warn(
          "MSG91 initSendOTP is not available yet."
        );

        return;
      }


      window.initSendOTP(
        window.workerSpotMSG91Configuration
      );

    }

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
    // MOBILE CHANGE
    // ---------------------------------------------------

    if (name === "mobile") {

      /*
       * Only allow numbers.
       */

      const numericValue =
        value.replace(
          /\D/g,
          ""
        ).slice(
          0,
          10
        );


      /*
       * If mobile number changes after verification,
       * the previous verification is no longer valid.
       */

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
  // SEND / OPEN OTP VERIFICATION
  // =====================================================

  const handleVerifyMobile = () => {

    setError("");


    // ---------------------------------------------------
    // VALIDATE MOBILE
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


    if (
      mobileVerified
    ) {

      setError(
        "Mobile number is already verified."
      );

      return;
    }


    // ---------------------------------------------------
    // MSG91 AVAILABILITY
    // ---------------------------------------------------

    if (
      typeof window.sendOtp !==
      "function" &&
      typeof window.initSendOTP !==
      "function"
    ) {

      setError(
        "Mobile verification service is still loading. Please wait a moment and try again."
      );

      return;
    }


    setOtpLoading(
      true
    );


    try {

      /*
       * MSG91's widget normally exposes its own
       * verification UI/methods.
       *
       * If the widget has exposed methods enabled,
       * try to trigger OTP using the mobile number.
       */

      if (
        typeof window.sendOtp ===
        "function"
      ) {

        window.sendOtp(
          mobile
        );

      } else {

        console.log(
          "MSG91 widget initialized. Use the widget verification UI."
        );

      }


      /*
       * Give the widget a moment to open/display.
       */

      setTimeout(() => {

        setOtpLoading(
          false
        );

      }, 1000);


    } catch (err) {

      console.error(
        "OTP initiation error:",
        err
      );


      setOtpLoading(
        false
      );


      setError(
        "Unable to start mobile verification. Please try again."
      );

    }

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
      formData.fullName.trim().length <
      2
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
      formData.password !==
      formData.confirmPassword
    ) {

      setError(
        "Passwords do not match."
      );

      return;
    }


    if (
      formData.password.length <
      8
    ) {

      setError(
        "Password must be at least 8 characters."
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
                  formData.email.trim().toLowerCase(),

                mobile:
                  formData.mobile.trim(),

                password:
                  formData.password,

                /*
                 * MSG91 verified access token.
                 *
                 * Backend will validate this token
                 * directly with MSG91.
                 */

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
      // RESET FORM
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
          LEFT HERO SECTION
      ================================================= */}

      <section className="customer-hero">

        <div className="customer-hero-content">


          {/* Brand Badge */}

          <div className="customer-hero-badge">

            <Sparkles size={16} />

            <span>
              Worker Spot
            </span>

          </div>


          {/* Hero Icons */}

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


          {/* Main Heading */}

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


          {/* Benefits */}

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
          RIGHT REGISTRATION SECTION
      ================================================= */}

      <section className="customer-form-panel">


        <div className="customer-register-card">


          {/* Form Header */}

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
              REGISTRATION FORM
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
                MOBILE NUMBER
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
                  VERIFY MOBILE BUTTON
              ================================================= */}

              {!mobileVerified ? (

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
                    ? "Starting Verification..."
                    : "Verify Mobile with OTP"}

                </button>

              ) : (

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
                SAFETY NOTICE
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
                EXISTING ACCOUNT
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