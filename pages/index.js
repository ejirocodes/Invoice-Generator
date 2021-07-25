import Head from 'next/head';
import { useEffect, useReducer, useState } from 'react';
import axios from 'axios';

export default function Home() {
  const initialState = {
    sender: '',
    billTo: '',
    shipTo: '',
    dueDate: '',
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

  const addInvoiceItem = () => {
    // const values = [...invoiceFields];
    // values.push({
    //   itemDescription: '',
    //   qty: '',
    //   price: '',
    // });
    // setInvoiceFields(values);

    setInvoiceFields([
      ...invoiceFields,
      {
        itemDescription: '',
        qty: '',
        price: '',
      },
    ]);
  };

  const handleRemoveInvoice = (index) => {
    const values = [...invoiceFields];
    if (values.length === 1) return false;
    values.splice(index, 1);
    setInvoiceFields(values);
  };

  const handleChange = (index, event) => {
    const values = [...invoiceFields];
    if (event.target.name === 'itemDescription') {
      values[index].itemDescription = event.target.value;
    } else if (event.target.name === 'qty') {
      values[index].qty = event.target.value;
    } else if (event.target.name === 'price') {
      values[index].price = event.target.value;
    }
    setInvoiceFields(values);
  };

  const getTotal = () => {
    let computedTotal = 0;
    invoiceFields.forEach((field) => {
      const quantityNumber = parseFloat(field.qty);
      const rateNumber = parseFloat(field.price);
      const amount =
        quantityNumber && rateNumber ? quantityNumber * rateNumber : 0;
      computedTotal += amount;
    });
    return setTotal(computedTotal);
  };

  useEffect(() => {
    getTotal();
  }, [total, invoiceFields]);

  const handleSendInvoice = async () => {
    try {
      let { billTo, dueDate, note, sender, shipTo } = formFields;
      const { data } = await axios.post('http://localhost:1337/invoices', {
        billTo,
        dueDate,
        note,
        sender,
        shipTo,
        invoiceItemDetails: invoiceFields,
        total,
      });
      console.log(data);
      window.print();
    } catch (error) {
      console.error(error);
    }
  };

  const handlePrintInvoice = () => {
    window.print();
  };

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
                name="shipTo"
                type="email"
                required
                placeholder="Client's email"
                onChange={handleInputChange}
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
                name="dueDate"
                type="date"
                onChange={handleInputChange}
              />
            </div>
            {invoiceFields.map((invoiceField, i) => (
              <div
                className="flex justify-center items-center"
                key={`${invoiceField}~${i}`}
              >
                <label
                  className="block text-gray-700 text-sm font-bold mb-2 w-full mr-5"
                  htmlFor={`${invoiceField.itemDescription}~${i}`}
                >
                  Invoice Item
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                    id={`${invoiceField.itemDescription}~${i}`}
                    name="itemDescription"
                    type="text"
                    spellCheck="false"
                    value={invoiceField.itemDescription}
                    onChange={(event) => handleChange(i, event)}
                  />
                </label>
                <label
                  className="block text-gray-700 text-sm font-bold mb-2 w-full mr-5"
                  htmlFor={`${invoiceField.qty}~${i}`}
                >
                  Quantity
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                    id={`${invoiceField.qty}~${i}`}
                    name="qty"
                    type="number"
                    spellCheck="false"
                    value={invoiceField.qty}
                    onChange={(event) => handleChange(i, event)}
                  />
                </label>
                <label
                  className="block text-gray-700 text-sm font-bold mb-2 w-full  mr-5"
                  htmlFor={`${invoiceField.price}~${i}`}
                >
                  Unit Price
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                    id={`${invoiceField.price}~${i}`}
                    name="price"
                    type="tel"
                    spellCheck="false"
                    value={invoiceField.price}
                    onChange={(event) => handleChange(i, event)}
                  />
                </label>
                <button
                  className="bg-red-500 hover:bg-red-700 h-8 px-5 py-3 flex items-center justify-center text-white font-bold rounded focus:outline-none focus:shadow-outline"
                  type="button"
                  onClick={() => handleRemoveInvoice(i)}
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={addInvoiceItem}
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
              {/* <pre>{JSON.stringify(invoiceFields, null, 2)}</pre> */}
            </div>
            <div className="mb-6 flex justify-between font-bold text-xl">
              <p>Total:</p>
              <p>{total}</p>
            </div>
            <div className="flex items-center justify-between">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
                onClick={handleSendInvoice}
              >
                Send Invoice
              </button>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
                onClick={handlePrintInvoice}
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
