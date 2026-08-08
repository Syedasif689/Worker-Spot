import { useState } from "react";
import {
    User,
    Phone,
    Mail,
    Lock,
    MapPin,
    Briefcase,
    Calendar,
    Eye,
    EyeOff,
    UserPlus,
    ShieldCheck,
    Clock,
    HandCoins,
    Users,
    Sparkles,
    CheckCircle,
} from "lucide-react";
import "./Register.css";

function Register() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [formData, setFormData] = useState({
        fullName: "",
        mobile: "",
        email: "",
        password: "",
        confirmPassword: "",
        location: "",
        category: "",
        age: "",
        terms: false,
    });

    const [error, setError] = useState("");

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        });

        setError("");
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (Number(formData.age) < 19) {
            setError("Workers must be 19 years or older.");
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        if (!formData.terms) {
            setError("Please agree to the Terms and Conditions.");
            return;
        }

        console.log("Worker Registration Data:", formData);

        alert("Worker registration successful!");

        // Later:
        // Send formData to Spring Boot API
    };

    return (
        <div className="register-page">
            <div className="register-container">

                {/* ===== LEFT PANEL — Worker Unity ===== */}
                <div className="register-hero">
                    <div className="hero-content">

                        <div className="hero-badge">
                            <Sparkles size={16} />
                            <span>Worker Spot</span>
                        </div>

                        <div className="hero-icon-group">
                            <div className="hero-icon-ring">
                                <Users size={48} strokeWidth={1.5} />
                            </div>
                            <div className="hero-icon-ring small">
                                <Briefcase size={24} strokeWidth={1.5} />
                            </div>
                            <div className="hero-icon-ring small">
                                <ShieldCheck size={24} strokeWidth={1.5} />
                            </div>
                        </div>

                        <h1>Worker Unity</h1>

                        <p className="hero-subtitle">
                            Join thousands of skilled workers connecting with
                            customers in your area. Build your reputation, grow
                            your business, and take control of your future.
                        </p>

                        <div className="hero-benefits">
                            <div className="hero-benefit">
                                <div className="hero-benefit-icon">
                                    <HandCoins size={18} />
                                </div>
                                <span>No registration fees</span>
                            </div>

                            <div className="hero-benefit">
                                <div className="hero-benefit-icon">
                                    <CheckCircle size={18} />
                                </div>
                                <span>Keep 100% of your earnings</span>
                            </div>

                            <div className="hero-benefit">
                                <div className="hero-benefit-icon">
                                    <Clock size={18} />
                                </div>
                                <span>Choose your own schedule</span>
                            </div>

                            <div className="hero-benefit">
                                <div className="hero-benefit-icon">
                                    <ShieldCheck size={18} />
                                </div>
                                <span>Get paid directly by customers</span>
                            </div>
                        </div>


                    </div>
                </div>

                {/* ===== RIGHT PANEL — Form ===== */}
                <div className="register-form-panel">

                    <div className="register-card">

                        {/* Header */}
                        <div className="register-header">
                            <div className="register-icon">
                                <UserPlus size={28} />
                            </div>

                            <h1>Worker Registration</h1>

                            <p>
                                Create your Worker Spot account and connect with
                                customers nearby.
                            </p>
                        </div>

                        <form onSubmit={handleSubmit}>

                            {/* Full Name */}
                            <div className="form-group">
                                <label>Full Name</label>

                                <div className="input-box">
                                    <User size={20} />

                                    <input
                                        type="text"
                                        name="fullName"
                                        placeholder="Enter your full name"
                                        value={formData.fullName}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>

                            {/* Mobile */}
                            <div className="form-group">
                                <label>Mobile Number</label>

                                <div className="input-box">
                                    <Phone size={20} />

                                    <input
                                        type="tel"
                                        name="mobile"
                                        placeholder="Enter your mobile number"
                                        value={formData.mobile}
                                        onChange={handleChange}
                                        pattern="[0-9]{10}"
                                        maxLength="10"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Email */}
                            <div className="form-group">
                                <label>Email</label>

                                <div className="input-box">
                                    <Mail size={20} />

                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="Enter your email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>

                            {/* Password */}
                            <div className="form-group">
                                <label>Password</label>

                                <div className="input-box">
                                    <Lock size={20} />

                                    <input
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        placeholder="Create a password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                    />

                                    <button
                                        type="button"
                                        className="password-button"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                    </button>
                                </div>
                            </div>

                            {/* Confirm Password */}
                            <div className="form-group">
                                <label>Confirm Password</label>

                                <div className="input-box">
                                    <Lock size={20} />

                                    <input
                                        type={showConfirmPassword ? "text" : "password"}
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
                                            setShowConfirmPassword(!showConfirmPassword)
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

                            {/* Location */}
                            <div className="form-group">
                                <label>Location</label>

                                <div className="input-box">
                                    <MapPin size={20} />

                                    <input
                                        type="text"
                                        name="location"
                                        placeholder="City / Town / Area"
                                        value={formData.location}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>

                            {/* Category */}
                            <div className="form-group">
                                <label>Work Category</label>

                                <div className="input-box">
                                    <Briefcase size={20} />

                                    <select
                                        name="category"
                                        value={formData.category}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value="">Select your category</option>
                                        <option value="Plumber">Plumber</option>
                                        <option value="Electrician">Electrician</option>
                                        <option value="Carpenter">Carpenter</option>
                                        <option value="Mechanic">Mechanic</option>
                                        <option value="Painter">Painter</option>
                                        <option value="AC Technician">AC Technician</option>
                                        <option value="Mason">Mason</option>
                                        <option value="Welder">Welder</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>
                            </div>

                            {/* Age */}
                            <div className="form-group">
                                <label>Age</label>

                                <div className="input-box">
                                    <Calendar size={20} />

                                    <input
                                        type="number"
                                        name="age"
                                        placeholder="Enter your age"
                                        min="19"
                                        value={formData.age}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <small>Workers must be 19 years or older.</small>
                            </div>

                            {/* Worker Independence */}
                            <div className="worker-policy">
                                <h3>🤝 Worker Independence &amp; No Worker Fees</h3>

                                <p>
                                    Workers on Worker Spot are independent service providers and
                                    are not employees, agents, partners, or representatives of
                                    Worker Spot.
                                </p>

                                <p>
                                    <strong>Worker Spot does not charge workers</strong> any
                                    registration fee, subscription fee, booking fee, commission,
                                    platform fee, or service fee for using the platform.
                                </p>

                                <p>
                                    Workers independently decide whether to accept service requests
                                    and are responsible for providing their services to customers.
                                </p>
                            </div>

                            {/* Terms */}
                            <div className="terms">

                                <input
                                    type="checkbox"
                                    name="terms"
                                    checked={formData.terms}
                                    onChange={handleChange}
                                    required
                                />

                                <span>
                                    I have read and agree to the{" "}

                                    <a
                                        href="/terms"
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        Terms &amp; Conditions
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
                                </span>

                            </div>

                            <p className="registration-safety">
                                🛡️ Please read our{" "}

                                <a
                                    href="/safety"
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    Safety Guidelines
                                </a>

                                {" "}before using Worker Spot.
                            </p>

                            {/* Error */}
                            {error && <div className="error-message">{error}</div>}

                            {/* Submit */}
                            <button type="submit" className="register-button">
                                <UserPlus size={20} />
                                Register as Worker
                            </button>

                        </form>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default Register;