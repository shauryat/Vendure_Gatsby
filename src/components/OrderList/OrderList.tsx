import React from 'react';
import { useQuery } from '@apollo/client';
import { ALL_ORDER_LIST } from './OrderList.vendure';
import OrderListComponent from './OrderListComponent';

const OrderList = () => {
    const { data , loading , error }= useQuery(ALL_ORDER_LIST)
    if (loading){
        return(<div>loading </div>)
    }
    if (error){
        return(<div>error </div>)
    }
    return (
        <div>
            { data.activeCustomer.orders.items.map(item => (<OrderListComponent order={item}/>))}
        </div>
    );
};

export default OrderList;