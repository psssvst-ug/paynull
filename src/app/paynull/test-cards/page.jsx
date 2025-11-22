"use client";

import { useState } from "react";

export default function PayNullTestCards() {
  const [copiedCard, setCopiedCard] = useState(null);
  
  const testCards = [
    { 
      number: "4242 4242 4242 4242", 
      type: "VISA", 
      status: "Successful Payment",
      description: "Use this card for successful payment scenarios",
      icon: "✓"
    },
    { 
      number: "4000 0000 0000 9995", 
      type: "VISA", 
      status: "Authentication Required",
      description: "Simulates additional verification steps",
      icon: "🔐"
    },
    { 
      number: "4000 0000 0000 0002", 
      type: "VISA", 
      status: "Insufficient Funds",
      description: "Tests decline scenarios",
      icon: "⚠"
    },
  ];

  function copy(number) {
    navigator.clipboard.writeText(number);
    setCopiedCard(number);
    setTimeout(() => setCopiedCard(null), 2000);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 p-4">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-2xl border border-slate-200/60">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center mb-3">
            <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center mr-3">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">Development Cards</h1>
          </div>
          <p className="text-slate-600 text-base">Use these card numbers for development and integration testing</p>
        </div>

        {/* Cards Grid */}
        <div className="space-y-4">
          {testCards.map((c) => (
            <div 
              key={c.number} 
              className="border border-slate-200 p-5 rounded-xl hover:shadow-lg transition-all duration-200 bg-gradient-to-br from-white to-slate-50 hover:border-blue-300"
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-2xl">{c.icon}</span>
                    <span className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded text-xs font-semibold uppercase tracking-wide">
                      {c.type}
                    </span>
                  </div>
                  <p className="font-mono text-xl font-semibold text-slate-800 mb-1">{c.number}</p>
                  <p className="text-sm font-semibold text-slate-700 mb-1">{c.status}</p>
                  <p className="text-sm text-slate-500">{c.description}</p>
                </div>
                <button
                  className={
                    `px-4 py-2 rounded-lg font-semibold shadow-md transition-all duration-200 flex items-center space-x-2 ` +
                    (copiedCard === c.number
                      ? "bg-green-600 hover:bg-green-700 text-white"
                      : "bg-blue-600 hover:bg-blue-700 text-white hover:shadow-lg")
                  }
                  onClick={() => copy(c.number)}
                >
                  {copiedCard === c.number ? (
                    <>
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                      </svg>
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-xl">
          <div className="flex items-start space-x-3">
            <svg className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"/>
            </svg>
            <div>
              <p className="text-sm font-semibold text-blue-900 mb-1">Development Mode</p>
              <p className="text-sm text-blue-700">These cards are for testing purposes only. Use any future expiry date and any 3-digit CVV.</p>
            </div>
          </div>
        </div>

        {/* Security Badge */}
        <div className="mt-8 pt-6 border-t border-slate-200 text-center">
          <div className="flex items-center justify-center space-x-2">
            <svg className="w-5 h-5 text-slate-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
            </svg>
            <span className="text-xs font-medium text-slate-500">Secured Development Environment</span>
          </div>
        </div>
      </div>
    </div>
  );
}
