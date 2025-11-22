"use client"

export default function Home() {
  const go = async () => {
    const res = await fetch("/api/paynull/create-intent", {
      method: "POST",
      body: JSON.stringify({ amount: 5000, currency: "INR" }),
    });
    const data = await res.json();
    console.log(data.paymentIntent.id);

    if (data) {
      const res = await fetch("/api/paynull/session", {
        method: "POST",
        body: JSON.stringify({ paymentIntentId: data.paymentIntent.id }),
      });

      window.location.href = (await res.json()).url;

    }

  }
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 font-sans">
      <div className="text-center">
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-blue-600 mb-4 shadow-lg">
            <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Payment Gateway</h1>
          <p className="text-slate-600">Secure and reliable payment processing</p>
        </div>
        <button 
          onClick={go}
          className="px-8 py-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold shadow-lg transition-all duration-200 hover:shadow-xl text-base"
        >
          Create Payment Session
        </button>
      </div>
    </div>
  );
}
