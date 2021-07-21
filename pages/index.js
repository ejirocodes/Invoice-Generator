import Head from 'next/head';
import { useReducer, useState } from 'react';

export default function Home() {
  const initialState = {
    billTo: '',
    shipTo: '',
    dueDate: '',
    note: '',
  };

  function reducer(state = initialState, { field, value }) {
    return { ...state, [field]: value };
  }

  const [state, dispatch] = useReducer(reducer, initialState);
  const [total, setTotal] = useState(0);

  const handleInputChange = (e) => {
    dispatch({ field: e.target.name, value: e.target.value });

    console.log(state);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Head>
        <title>Invoice Generator</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center justify-center w-full flex-1 px-20">
        <div className="w-full max-w-6xl">
          <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="sender"
              >
                Your email address
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="sender"
                name="sender"
                type="email"
                required
                placeholder="Who is this invoice from? (required)"
                onChange={handleInputChange}
              />
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="billTo"
              >
                Bill To
              </label>
              <textarea
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="billTo"
                name="billTo"
                type="email"
                required
                placeholder="Who is this invoice to? (required)"
                onChange={handleInputChange}
              />
              {state.billTo}
            </div>
            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="shipTo"
              >
                Ship To
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="shipTo"
                type="text"
                required
                placeholder="******************"
              />
            </div>
            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="dueDate"
              >
                Due Date
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="dueDate"
                type="date"
                onChange={handleInputChange}
              />
            </div>
            <div className="flex">
              <label
                className="block text-gray-700 text-sm font-bold mb-2 w-full mr-8"
                htmlFor="invoiceItem"
              >
                Invoice Item
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                  id="invoiceItem"
                  type="text"
                  spellCheck="false"
                  onChange={handleInputChange}
                />
              </label>
              <label
                className="block text-gray-700 text-sm font-bold mb-2 w-full mr-8"
                htmlFor="quantity"
              >
                Quantity
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                  id="quantity"
                  type="number"
                  spellCheck="false"
                  onChange={handleInputChange}
                />
              </label>
              <label
                className="block text-gray-700 text-sm font-bold mb-2 w-full"
                htmlFor="unitPrice"
              >
                Unit Price
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                  id="unitPrice"
                  type="tel"
                  spellCheck="false"
                  onChange={handleInputChange}
                />
              </label>
            </div>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
            >
              Add Item
            </button>
            <div className="my-6 flex flex-col">
              <label
                htmlFor="note"
                className="block text-gray-700 text-sm font-bold mb-2 w-full"
              >
                Invoice Notes
              </label>
              <textarea
                id="note"
                name="note"
                onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-6 flex justify-between font-bold text-xl">
              <p>Total:</p>
              <p>{total}</p>
            </div>
            <div className="flex items-center justify-between">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
              >
                Send Invoice
              </button>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
              >
                Download Invoice
              </button>
            </div>
          </form>
        </div>
      </main>

      <footer className="flex items-center justify-center w-full h-24 border-t">
        <a
          className="flex items-center justify-center"
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel Logo" className="h-4 ml-2" />
        </a>
      </footer>
    </div>
  );
}
