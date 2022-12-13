import React from 'react'

export default function CustomerList({ customers }) {

    function renderCustomers() {
        // create a new array from the old array with map
        return customers.map((customer, i) => {
            return <li key={i}>{customer.name}</li>
        })
    }
    
  return (
    <div>
        <ul>
            {renderCustomers()}
        </ul>
    </div>
  )
}
