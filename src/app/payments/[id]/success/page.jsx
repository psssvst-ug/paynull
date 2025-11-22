"use client"

import { useParams } from "next/navigation"
import Link from "next/link"

export default function PaymentSuccess() {
  const params = useParams();
  const paymentId = params.id;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 p-4">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md border border-slate-200/60 text-center">
        {/* Success Icon */}
        <div className="mb-6">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 mb-4">
            <svg className="w-12 h-12 text-green-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Payment Successful!</h1>
          <p className="text-slate-600">Your transaction has been completed successfully</p>
        </div>

        {/* Payment Details */}
        <div className="mb-8 p-4 bg-slate-50 border border-slate-200 rounded-xl">
          <p className="text-xs font-medium uppercase tracking-wider text-slate-500 mb-2">Transaction ID</p>
          <p className="font-mono text-sm text-slate-900 break-all">{paymentId}</p>
        </div>

        {/* Actions */}
        <div className="space-y-3">
          <Link 
            href="/paynull/dashboard"
            className="block w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold shadow-lg transition-all duration-200 hover:shadow-xl"
          >
            View Dashboard
          </Link>
          <Link 
            href="/"
            className="block w-full px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-semibold transition-all duration-200 border border-slate-300"
          >
            Return Home
          </Link>
        </div>

        {/* Security Badge */}
        <div className="mt-8 pt-6 border-t border-slate-200">
          <div className="flex items-center justify-center space-x-2">
            <svg className="w-5 h-5 text-slate-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
            </svg>
            <span className="text-xs font-medium text-slate-500">Secured Transaction</span>
          </div>
        </div>
      </div>
    </div>
  )
}