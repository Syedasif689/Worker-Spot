import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    CreditCard,
    History,
    CheckCircle,
    Clock,
    XCircle,
    AlertCircle,
    Wallet,
    Receipt,
    Package,
    ArrowLeft
} from "lucide-react";

import "./CustomerPayments.css";

const API_URL = import.meta.env.VITE_API_URL;

export default function CustomerPayments() {

    const navigate = useNavigate();

    const [transactions, setTransactions] = useState([]);
    const [credits, setCredits] = useState(0);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        loadPaymentData();
    }, []);

    const getToken = () => {
        return localStorage.getItem("token");
    };

    const loadPaymentData = async () => {

        try {

            setLoading(true);
            setError("");

            const token = getToken();

            if (!token) {
                throw new Error("Please login again.");
            }

            const headers = {
                Authorization: `Bearer ${token}`
            };

            // =========================================
            // CURRENT CREDIT BALANCE
            // =========================================

            const balanceResponse = await fetch(
                `${API_URL}/api/booking-credits/balance`,
                {
                    method: "GET",
                    headers
                }
            );

            if (!balanceResponse.ok) {
                throw new Error(
                    "Unable to load credit balance."
                );
            }

            const balanceData =
                await balanceResponse.json();

            setCredits(
                balanceData.credits ?? 0
            );


            // =========================================
            // PURCHASE HISTORY
            // =========================================

            const transactionResponse = await fetch(
                `${API_URL}/api/booking-credits/transactions`,
                {
                    method: "GET",
                    headers
                }
            );

            if (!transactionResponse.ok) {
                throw new Error(
                    "Unable to load payment history."
                );
            }

            const transactionData =
                await transactionResponse.json();

            setTransactions(
                Array.isArray(transactionData)
                    ? transactionData
                    : []
            );

        } catch (err) {

            console.error(
                "Payment history error:",
                err
            );

            setError(
                err.message ||
                "Something went wrong."
            );

        } finally {

            setLoading(false);
        }
    };


    // =========================================
    // FORMAT DATE
    // =========================================

    const formatDate = (date) => {

        if (!date) {
            return "—";
        }

        return new Date(date).toLocaleString(
            "en-IN",
            {
                day: "2-digit",
                month: "short",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit"
            }
        );
    };


    // =========================================
    // STATUS
    // =========================================

    const getStatusIcon = (status) => {

        switch (status) {

            case "PAID":
                return <CheckCircle size={17} />;

            case "FAILED":
                return <XCircle size={17} />;

            case "PAYMENT_PENDING":
                return <Clock size={17} />;

            default:
                return <AlertCircle size={17} />;
        }
    };


    const getStatusClass = (status) => {

        switch (status) {

            case "PAID":
                return "status-paid";

            case "FAILED":
                return "status-failed";

            case "PAYMENT_PENDING":
                return "status-pending";

            default:
                return "status-created";
        }
    };


    // =========================================
    // TOTAL PURCHASED CREDITS
    // =========================================

    const totalPurchasedCredits =
        transactions
            .filter(
                transaction =>
                    transaction.status === "PAID"
            )
            .reduce(
                (total, transaction) =>
                    total +
                    (transaction.credits || 0),
                0
            );


    // =========================================
    // TOTAL AMOUNT PAID
    // =========================================

    const totalAmountPaid =
        transactions
            .filter(
                transaction =>
                    transaction.status === "PAID"
            )
            .reduce(
                (total, transaction) =>
                    total +
                    (transaction.amount || 0),
                0
            );


    // =========================================
    // LOADING
    // =========================================

    if (loading) {

        return (
            <div className="payments-page">

                <div className="payments-loading">

                    <div className="loading-spinner"></div>

                    <p>
                        Loading payment history...
                    </p>

                </div>

            </div>
        );
    }


    // =========================================
    // PAGE
    // =========================================

    return (

        <div className="payments-page">

            <div className="payments-container">

                {/* ================================= */}
                {/* BACK BUTTON */}
                {/* ================================= */}

                <button
                    type="button"
                    className="payments-back-button"
                    onClick={() => navigate("/customer-dashboard")}
                >
                    <ArrowLeft size={19} />
                    <span>Back to Dashboard</span>
                </button>


                {/* ================================= */}
                {/* HEADER */}
                {/* ================================= */}

                <div className="payments-header">

                    <div className="payments-header-content">

                        <div className="header-icon">
                            <CreditCard size={28} />
                        </div>

                        <div>

                            <h1>
                                Payments & Purchases
                            </h1>

                            <p>
                                View your Worker Spot booking-credit
                                purchases and payment history.
                            </p>

                        </div>

                    </div>

                </div>


                {/* ================================= */}
                {/* ERROR */}
                {/* ================================= */}

                {error && (

                    <div className="payment-error">

                        <AlertCircle size={20} />

                        <span>
                            {error}
                        </span>

                    </div>

                )}


                {/* ================================= */}
                {/* SUMMARY */}
                {/* ================================= */}

                <div className="payment-summary">

                    {/* CURRENT CREDITS */}

                    <div className="summary-card">

                        <div className="summary-icon">
                            <Wallet size={22} />
                        </div>

                        <div>

                            <span>
                                Available Credits
                            </span>

                            <strong>
                                {credits}
                            </strong>

                        </div>

                    </div>


                    {/* TOTAL PURCHASES */}

                    <div className="summary-card">

                        <div className="summary-icon">
                            <Receipt size={22} />
                        </div>

                        <div>

                            <span>
                                Successful Purchases
                            </span>

                            <strong>
                                {
                                    transactions.filter(
                                        transaction =>
                                            transaction.status === "PAID"
                                    ).length
                                }
                            </strong>

                        </div>

                    </div>


                    {/* TOTAL CREDITS */}

                    <div className="summary-card">

                        <div className="summary-icon">
                            <Package size={22} />
                        </div>

                        <div>

                            <span>
                                Credits Purchased
                            </span>

                            <strong>
                                {totalPurchasedCredits}
                            </strong>

                        </div>

                    </div>


                    {/* TOTAL SPENT */}

                    <div className="summary-card">

                        <div className="summary-icon">
                            <CreditCard size={22} />
                        </div>

                        <div>

                            <span>
                                Total Paid
                            </span>

                            <strong>
                                ₹{totalAmountPaid.toFixed(2)}
                            </strong>

                        </div>

                    </div>

                </div>


                {/* ================================= */}
                {/* HISTORY */}
                {/* ================================= */}

                <div className="purchase-section">

                    <div className="section-title">

                        <div>

                            <History size={22} />

                            <h2>
                                Purchase History
                            </h2>

                        </div>

                        <span>
                            {transactions.length} transaction
                            {transactions.length !== 1
                                ? "s"
                                : ""}
                        </span>

                    </div>


                    {/* NO TRANSACTIONS */}

                    {transactions.length === 0 ? (

                        <div className="empty-history">

                            <CreditCard size={42} />

                            <h3>
                                No purchases yet
                            </h3>

                            <p>
                                Your booking-credit purchases
                                will appear here.
                            </p>

                        </div>

                    ) : (

                        <div className="transaction-list">

                            {transactions.map(
                                (transaction) => (

                                    <div
                                        className="transaction-card"
                                        key={
                                            transaction.transactionId
                                        }
                                    >

                                        {/* PLAN */}

                                        <div className="transaction-plan">

                                            <div className="plan-icon">

                                                <Package
                                                    size={22}
                                                />

                                            </div>

                                            <div>

                                                <h3>
                                                    {
                                                        transaction.plan
                                                    }
                                                </h3>

                                                <span>
                                                    {
                                                        transaction.credits
                                                    }{" "}
                                                    booking credit
                                                    {
                                                        transaction.credits !== 1
                                                            ? "s"
                                                            : ""
                                                    }
                                                </span>

                                            </div>

                                        </div>


                                        {/* AMOUNT */}

                                        <div className="transaction-amount">

                                            <span>
                                                Amount
                                            </span>

                                            <strong>
                                                ₹
                                                {
                                                    Number(
                                                        transaction.amount
                                                    ).toFixed(2)
                                                }
                                            </strong>

                                        </div>


                                        {/* STATUS */}

                                        <div className="transaction-status">

                                            <span>
                                                Status
                                            </span>

                                            <div
                                                className={`status-badge ${getStatusClass(
                                                    transaction.status
                                                )}`}
                                            >

                                                {
                                                    getStatusIcon(
                                                        transaction.status
                                                    )
                                                }

                                                {
                                                    transaction.status
                                                }

                                            </div>

                                        </div>


                                        {/* DATE */}

                                        <div className="transaction-date">

                                            <span>
                                                Date
                                            </span>

                                            <strong>
                                                {
                                                    formatDate(
                                                        transaction.createdAt
                                                    )
                                                }
                                            </strong>

                                        </div>


                                        {/* PAYMENT IDS */}

                                        <div className="payment-details">

                                            <div>

                                                <span>
                                                    Order ID
                                                </span>

                                                <code>
                                                    {
                                                        transaction.paymentOrderId
                                                        || "—"
                                                    }
                                                </code>

                                            </div>


                                            <div>

                                                <span>
                                                    Payment ID
                                                </span>

                                                <code>
                                                    {
                                                        transaction.paymentId
                                                        || "—"
                                                    }
                                                </code>

                                            </div>

                                        </div>

                                    </div>

                                )
                            )}

                        </div>

                    )}

                </div>

            </div>

        </div>
    );
}