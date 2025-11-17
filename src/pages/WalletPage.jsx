import React, { useState, useEffect } from 'react';
import Apihelper from '../service/Apihelper';

const WalletPage = () => {
  const [walletData, setWalletData] = useState({
    balance: 0,
    currency: 'USD',
    transactions: []
  });
  const [addFundsAmount, setAddFundsAmount] = useState('');
  const [loading, setLoading] = useState(true);
  const [addingFunds, setAddingFunds] = useState(false);
  const [message, setMessage] = useState('');

  const userRole = localStorage.getItem('userRole') || 'advertiser';

  useEffect(() => {
    fetchWalletData();
  }, []);

  const fetchWalletData = async () => {
    try {
      const response = await Apihelper.GetWalletData();
      setWalletData(response.data);
    } catch (error) {
      console.error('Error fetching wallet data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddFunds = async (e) => {
    e.preventDefault();
    if (!addFundsAmount || addFundsAmount <= 0) return;

    setAddingFunds(true);
    setMessage('');

    try {
      await Apihelper.AddWalletBalance({
        amount: parseFloat(addFundsAmount),
        description: 'Funds added via wallet'
      });
      
      setMessage('Funds added successfully!');
      setAddFundsAmount('');
      fetchWalletData();
    } catch (error) {
      setMessage(error.response?.data?.message || 'Error adding funds');
    } finally {
      setAddingFunds(false);
    }
  };

  if (loading) {
    return (
      <div className="p-6 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6">
      <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">Wallet</h1>

      {message && (
        <div className={`mb-4 p-4 rounded-md ${
          message.includes('successfully') 
            ? 'bg-green-50 text-green-700' 
            : 'bg-red-50 text-red-700'
        }`}>
          {message}
        </div>
      )}

      {/* Balance Card */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-4 sm:p-6 text-white mb-6">
        <h2 className="text-base sm:text-lg font-semibold mb-2">Current Balance</h2>
        <div className="text-2xl sm:text-3xl font-bold">
          {walletData.currency} {walletData.balance?.toFixed(2) || '0.00'}
        </div>
        {userRole === 'advertiser' && (
          <p className="text-blue-100 mt-2 text-sm sm:text-base">Available for ad campaigns</p>
        )}
        {userRole === 'publisher' && (
          <p className="text-blue-100 mt-2 text-sm sm:text-base">Earnings from ad displays</p>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Add Funds */}
        <div className="bg-white rounded-lg shadow p-4 sm:p-6">
          <h3 className="text-base sm:text-lg font-semibold mb-4">Add Funds</h3>
          <form onSubmit={handleAddFunds} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Amount ({walletData.currency || 'USD'})
              </label>
              <input
                type="number"
                value={addFundsAmount}
                onChange={(e) => setAddFundsAmount(e.target.value)}
                min="10"
                step="0.01"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter amount"
                required
              />
            </div>
            <button
              type="submit"
              disabled={addingFunds}
              className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 disabled:opacity-50"
            >
              {addingFunds ? 'Adding...' : 'Add Funds'}
            </button>
          </form>
        </div>



        {/* Quick Stats */}
        <div className="bg-white rounded-lg shadow p-4 sm:p-6">
          <h3 className="text-base sm:text-lg font-semibold mb-4">Quick Stats</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Total Transactions</span>
              <span className="font-semibold">{walletData.transactions?.length || 0}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Available Balance</span>
              <span className="font-semibold">{walletData.currency || 'USD'} {walletData.balance?.toFixed(2) || '0.00'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Transaction History */}
      <div className="bg-white rounded-lg shadow mt-6">
        <div className="p-4 sm:p-6 border-b">
          <h3 className="text-base sm:text-lg font-semibold">Transaction History</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px]">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase hidden sm:table-cell">Description</th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase hidden md:table-cell">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {walletData.transactions?.slice(0, 10).map((transaction, index) => (
                <tr key={index}>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-xs sm:text-sm text-gray-900">
                    {new Date(transaction.date).toLocaleDateString()}
                  </td>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      transaction.type === 'credit' || transaction.type === 'earning' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {transaction.type}
                    </span>
                  </td>
                  <td className="px-4 sm:px-6 py-4 text-xs sm:text-sm text-gray-900 hidden sm:table-cell">
                    <div className="max-w-xs truncate">{transaction.description}</div>
                  </td>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-xs sm:text-sm font-medium">
                    <span className={
                      transaction.type === 'credit' || transaction.type === 'earning' 
                        ? 'text-green-600' 
                        : 'text-red-600'
                    }>
                      {transaction.type === 'credit' || transaction.type === 'earning' ? '+' : '-'}
                      {walletData.currency} {transaction.amount?.toFixed(2)}
                    </span>
                  </td>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap hidden md:table-cell">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      transaction.status === 'completed' 
                        ? 'bg-green-100 text-green-800' 
                        : transaction.status === 'pending'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {transaction.status || 'completed'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {(!walletData.transactions || walletData.transactions.length === 0) && (
            <div className="text-center py-8 text-gray-500">
              No transactions found
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WalletPage;