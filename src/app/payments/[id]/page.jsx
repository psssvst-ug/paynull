"use client"

import { useParams } from "next/navigation"

export default function PaymentPage() {
  const params = useParams();
  const paymentId = params.id;
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 p-4">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md border border-slate-200/60 text-center">
        <div className="mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 mb-4">
            <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mb-2">Payment Details</h1>
        </div>
        
        <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
          <p className="text-xs font-medium uppercase tracking-wider text-slate-500 mb-2">Transaction ID</p>
          <p className="font-mono text-sm text-slate-900 break-all">{paymentId}</p>
        </div>
      </div>
    </div>
  )
}