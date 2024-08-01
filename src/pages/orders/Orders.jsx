import React from 'react'
import OrdersTable from './OrdersTable'

const Orders = () => {
    return (
        <div id="manage_orders_section" className="manage_orders_section main_section">
        <h4 className="text-center my-3">Manage orders</h4>
        <OrdersTable/>
    </div>

    )
}

export default Orders