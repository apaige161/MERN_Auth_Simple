import axios from 'axios';
import React, { useEffect, useState } from 'react'
import CustomerForm from './CustomerForm'
import CustomerList from './CustomerList'

export default function Customers() {

    const [customers, setCustomers] = useState([]);


    // Load all customers -> then pass customers to the CustomerList
    async function getCustomers() {
        const customersRes = await axios.get("http://localhost:5000/customer/");
        setCustomers(customersRes.data); // array of customers set
    }
    
    // empty array means it will only run once
    useEffect(() => {
        getCustomers()
    }, [])


  return (
    <div>
        <CustomerForm getCustomers={getCustomers} />
        <CustomerList customers={customers} />
    </div>
  )
}
