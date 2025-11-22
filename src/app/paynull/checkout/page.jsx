"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation"; 

export default function PayNullCheckout() {
  const params = useSearchParams();
  const pi = params.get("pi");
  const router = useRouter();
  const [card, setCard] = useState("");
  const [status, setStatus] = useState("ready");
  const [darkMode, setDarkMode] = useState(false);
  const [error, setError] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  // Auto-detect system dark mode
  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    setDarkMode(mq.matches);
    const handler = (e) => setDarkMode(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // Format card number with spaces every 4 digits
  const formatCardNumber = (value) => {
    // Remove all non-digits
    const cleaned = value.replace(/\D/g, '');
    // Add space every 4 digits
    const formatted = cleaned.match(/.{1,4}/g)?.join(' ') || cleaned;
    return formatted;
  };

  const handleCardInput = (e) => {
    const value = e.target.value;
    const formatted = formatCardNumber(value);
    setCard(formatted);
    if (error) setError("");
  };

  async function handlePayment() {
    // Remove spaces from card number for backend processing
    const cleanCard = card.replace(/\s/g, '');
    
    if (!cleanCard) {
      setError("Please enter a card number");
      return;
    }

    if (cleanCard.length < 13) {
      setError("Please enter a valid card number");
      return;
    }

    setError("");
    setIsProcessing(true);
    setStatus("Processing payment...");

    try {
      const res = await fetch("/api/paynull/confirm", {
        method: "POST",
        body: JSON.stringify({ paymentIntentId: pi }),
      });

      const data = await res.json();
      if (data.ok) {
        setStatus("Payment successful!");
        setTimeout(() => {
          router.push("/payments/"+pi+"/success");
        }, 1000);
      } else {
        setError("Payment failed. Please try again.");
        setStatus("ready");
        setIsProcessing(false);
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
      setStatus("ready");
      setIsProcessing(false);
    }
  }

  return (
    <div className={
      `min-h-screen flex items-center justify-center transition-all duration-300 ` +
      (darkMode ? "bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" : "bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100")
    }>
      <div className={
        `shadow-2xl rounded-2xl p-8 w-full max-w-md border transition-all duration-300 ` +
        (darkMode ? "bg-slate-900/90 border-slate-700/50 backdrop-blur-sm" : "bg-white border-slate-200/60 backdrop-blur-sm")
      }>
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <div className={
              `w-10 h-10 rounded-lg flex items-center justify-center mr-3 ` +
              (darkMode ? "bg-blue-600" : "bg-blue-600")
            }>
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
            </div>
            <h1 className={
              `text-2xl font-bold tracking-tight ` +
              (darkMode ? "text-white" : "text-slate-900")
            }>Secure Checkout</h1>
          </div>
          <button
            className={
              `px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-200 ` +
              (darkMode 
                ? "bg-slate-800 text-slate-200 border-slate-600 hover:bg-slate-700 hover:border-slate-500" 
                : "bg-slate-100 text-slate-700 border-slate-300 hover:bg-slate-200 hover:border-slate-400")
            }
            onClick={() => setDarkMode((d) => !d)}
            aria-label="Toggle theme"
          >
            {darkMode ? "☀️" : "🌙"}
          </button>
        </div>

        {/* Payment ID */}
        <div className="mb-6">
          <span className={
            `text-xs font-medium uppercase tracking-wider ` +
            (darkMode ? "text-slate-400" : "text-slate-500")
          }>Transaction ID</span>
          <div className={
            `text-sm font-mono rounded-lg px-3 py-2 mt-2 border ` +
            (darkMode ? "text-slate-300 bg-slate-800/50 border-slate-700" : "text-slate-700 bg-slate-50 border-slate-200")
          }>{pi}</div>
        </div>

        {/* Card Number Input */}
        <div className="mb-6">
          <label htmlFor="card" className={
            `block text-sm font-semibold mb-2 ` +
            (darkMode ? "text-slate-300" : "text-slate-700")
          }>Card Number</label>
          <div className="relative">
            <input
              id="card"
              type="text"
              maxLength="19"
              className={
                `w-full border px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-200 font-mono text-base ` +
                (error 
                  ? (darkMode 
                      ? "border-red-500 bg-red-900/10 text-red-200 focus:ring-red-500" 
                      : "border-red-300 bg-red-50 text-red-900 focus:ring-red-500")
                  : (darkMode
                      ? "border-slate-600 bg-slate-800/50 text-slate-100 focus:ring-blue-500 focus:border-blue-500"
                      : "border-slate-300 bg-white text-slate-900 focus:ring-blue-500 focus:border-blue-500"))
              }
              placeholder="1234 5678 9012 3456"
              value={card}
              onChange={handleCardInput}
              disabled={isProcessing}
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <svg className={
                `w-8 h-5 ` +
                (darkMode ? "text-slate-600" : "text-slate-400")
              } fill="currentColor" viewBox="0 0 32 20">
                <rect width="32" height="20" rx="3" fill="currentColor" fillOpacity="0.1"/>
                <rect x="2" y="2" width="28" height="16" rx="2" fill="none" stroke="currentColor" strokeWidth="1"/>
              </svg>
            </div>
          </div>
          {error && (
            <p className="mt-2 text-sm text-red-500 font-medium flex items-center">
              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"/>
              </svg>
              {error}
            </p>
          )}
        </div>

        {/* Pay Button */}
        <button
          className={
            `w-full font-semibold py-3.5 rounded-lg shadow-lg transition-all duration-200 text-base flex items-center justify-center space-x-2 ` +
            (isProcessing
              ? (darkMode ? "bg-slate-700 text-slate-400 cursor-not-allowed" : "bg-slate-300 text-slate-500 cursor-not-allowed")
              : (darkMode 
                  ? "bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white shadow-blue-500/20 hover:shadow-blue-500/40" 
                  : "bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white hover:shadow-xl"))
          }
          onClick={handlePayment}
          disabled={isProcessing}
        >
          {isProcessing ? (
            <>
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>Processing...</span>
            </>
          ) : (
            <>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <span>Complete Payment</span>
            </>
          )}
        </button>

        {/* Status Message */}
        {status !== "ready" && (
          <div className={
            `mt-6 text-center py-3 rounded-lg border ` +
            (status === "Payment successful!" 
              ? (darkMode ? "bg-green-900/20 border-green-700 text-green-400" : "bg-green-50 border-green-200 text-green-700")
              : (darkMode ? "bg-blue-900/20 border-blue-700 text-blue-400" : "bg-blue-50 border-blue-200 text-blue-700"))
          }>
            <div className="flex items-center justify-center space-x-2">
              {status === "Payment successful!" ? (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                </svg>
              ) : null}
              <span className="text-sm font-medium">{status}</span>
            </div>
          </div>
        )}

        {/* Security Badge */}
        <div className={
          `mt-8 pt-6 border-t text-center ` +
          (darkMode ? "border-slate-700" : "border-slate-200")
        }>
          <div className="flex items-center justify-center space-x-2">
            <svg className={
              `w-5 h-5 ` +
              (darkMode ? "text-slate-500" : "text-slate-400")
            } fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
            </svg>
            <span className={
              `text-xs font-medium ` +
              (darkMode ? "text-slate-400" : "text-slate-500")
            }>Secured by 256-bit SSL encryption</span>
          </div>
        </div>
      </div>
    </div>
  );
}
