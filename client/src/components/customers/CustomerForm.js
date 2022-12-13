import axios from "axios";
import React, { useState } from "react";

export default function CustomerForm({ getCustomers }) {
    // send a new customer to the backend

    const [customerName, setCustomerName] = useState("")

    // avoid refreshing the page
    async function saveCustomer(e) {
        e.preventDefault();

        try {
            // send post request to server
            // create customer data
            const customerData = {
                name: customerName
            }
            await axios.post("http://localhost:5000/customer/", customerData);
            // run the get customers function from parent component
            getCustomers();
        } catch(err) {
            console.log(err)
        }
    }

  return (
    <div>
        <form onSubmit={saveCustomer}>
            <input 
                type="text" 
                placeholder="Customer Name"
                onChange={(e) => {
                    setCustomerName(e.target.value);
                }}
                value = {customerName} 
            />
            <button type="submit">Save New Customer</button>
        </form>
    </div>
  )
}
