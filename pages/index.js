import Head from 'next/head';
import { useEffect, useReducer, useRef, useState } from 'react';

export default function Home() {
  const initialState = {
    sender: '',
    billTo: '',
    shipTo: '',
    dueDate: '',
    invoiceItem: '',
    quantity: '',
    unitPrice: '',
    note: '',
  };

  function reducer(state = initialState, { field, value }) {
    return { ...state, [field]: value };
  }

  const [formFields, dispatch] = useReducer(reducer, initialState);
  const [total, setTotal] = useState(0);
  const [invoiceFields, setInvoiceFields] = useState([
    {
      itemDescription: '',
      qty: '',
      price: '',
    },
  ]);

  const handleInputChange = (e) => {
    dispatch({ field: e.target.name, value: e.target.value });
  };

  const getTotal = () => {
    return setTotal(formFields.quantity * formFields.unitPrice);
  };

  const addInvoiceItem = () => {
    setInvoiceItems([
      ...invoiceItems,
      {
        itemDescription: '',
        rate: '',
        price: '',
      },
    ]);
  };

  const handleChange = (index, event) => {
    const values = [...invoiceFields];
    console.log(event.target.name);
    if (event.target.name === 'itemDescription') {
      values[index].itemDescription = event.target.value;
    } else if (event.target.name === 'qty') {
      values[index].qty = event.target.value;
    } else if (event.target.name === 'price') {
      values[index].price = event.target.value;
    }
    setInvoiceFields(values);
  };

  useEffect(() => {
    getTotal();
  }, [
    total,
    formFields.quantity,
    formFields.unitPrice,
    formFields.invoiceItem,
  ]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Head>
        <title>Invoice Generator</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 my-12">
        <div className="w-full max-w-xl">
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
                className="block text-gray-700 text-sm font-bold my-3"
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
                type="email"
                required
                placeholder="Client's email"
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
            {invoiceFields.map((invoiceField, i) => (
              <div className="flex" key={`${invoiceField}~${i}`}>
                <label
                  className="block text-gray-700 text-sm font-bold mb-2 w-full mr-8"
                  htmlFor="itemDescription"
                >
                  Invoice Item
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                    id="itemDescription"
                    name="itemDescription"
                    type="text"
                    spellCheck="false"
                    value={invoiceField.itemDescription}
                    onChange={(event) => handleChange(i, event)}
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
                    name="qty"
                    type="number"
                    spellCheck="false"
                    value={invoiceField.qty}
                    onChange={(event) => handleChange(i, event)}
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
                    name="price"
                    type="tel"
                    spellCheck="false"
                    value={invoiceField.price}
                    onChange={(event) => handleChange(i, event)}
                  />
                </label>
              </div>
            ))}
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              // onClick={addInvoiceItem}
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
    </div>
  );
}
