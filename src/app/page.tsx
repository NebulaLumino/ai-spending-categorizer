'use client';

import { useState } from 'react';

export default function Page() {
  const [transactions, setTransactions] = useState('');
  const [income, setIncome] = useState('');
  const [irregular, setIrregular] = useState('');
  const [savings_target, setSavingsTarget] = useState('');
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          inputs: {
        transactions,
        income,
        irregular,
        savings_target,
          }
        }),
      });
      const data = await res.json();
      setOutput(data.result || 'No result returned.');
    } catch (err) {
      setError('Failed to generate. Check API key or try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-950 to-gray-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-2 text-pink-400">AI Spending Categorizer</h1>
        <p className="text-gray-400 mb-8">AI Spending Categorizer - Powered by DeepSeek AI</p>
        <div className="grid md:grid-cols-2 gap-6">
          <form onSubmit={handleSubmit} className="space-y-4 bg-gray-800/50 rounded-xl p-6">
          <div>
            <label htmlFor="id-transactions" className="block text-sm font-medium text-gray-300 mb-1">Transaction History</label>
            <textarea
              id="id-transactions"
              name="transactions"
              value={transactions}
              onChange={e => setTransactions(e.target.value)}
              required
              rows={4}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-pink-500/50"
            />
          </div>
          <div>
            <label htmlFor="id-income" className="block text-sm font-medium text-gray-300 mb-1">Monthly Income ($)</label>
            <input
              id="id-income"
              name="income"
              type="number"
              value={income}
              onChange={e => setIncome(e.target.value)}
              required
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-pink-500/50"
            />
          </div>
          <div>
            <label htmlFor="id-irregular" className="block text-sm font-medium text-gray-300 mb-1">Irregular Income Notes</label>
            <input
              id="id-irregular"
              name="irregular"
              type="text"
              value={irregular}
              onChange={e => setIrregular(e.target.value)}
              required
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-pink-500/50"
            />
          </div>
          <div>
            <label htmlFor="id-savings_target" className="block text-sm font-medium text-gray-300 mb-1">Savings Target ($)</label>
            <input
              id="id-savings_target"
              name="savings_target"
              type="number"
              value={savings_target}
              onChange={e => setSavingsTarget(e.target.value)}
              required
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-pink-500/50"
            />
          </div>
            <button
              type="submit"
              disabled={loading}
              className={`w-full bg-pink-600 hover:bg-pink-500 disabled:bg-gray-600/50 text-white font-medium py-2 rounded-lg transition cursor-pointer`}
            >
              {loading ? 'Generating...' : 'Generate'}
            </button>
          </form>
          <div className="bg-gray-800/50 rounded-xl p-6">
            {loading && <div className="text-pink-400 animate-pulse">Generating...</div>}
            {error && <div className="text-red-400">{error}</div>}
            {!loading && !error && (
              <div className="prose prose-invert prose-sm max-w-none text-gray-300 whitespace-pre-wrap">
                {output || 'Output will appear here.'}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
