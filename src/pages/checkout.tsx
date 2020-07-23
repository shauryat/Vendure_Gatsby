import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { ACTIVE_CUSTOMER_AND_CUSTOMER } from './checkout.vendure';
import { ConfirmationStage } from '../components/ConfirmationStage/ConfirmationStage';
import Layout from '../components/layout';
import { PaymentStage } from '../components/PaymentStage/PaymentStage';
import { ShippingStage } from '../components/ShippingStage/ShippingStage';
import { CartContentsList } from '../components/ShoppingCart/ShoppingCart';
import { GET_ACTIVE_ORDER } from '../components/ShoppingCart/ShoppingCart.vendure';
import { SignInStage } from '../components/SignInStage/SignInStage';

import * as styles from './checkout.module.scss';

function useProgress(initialStage = 0) {
  const [currentStage, setStage] = useState(initialStage);
  return {
    currentStage,
    setStage,
    nextStage: () => currentStage < 3 && setStage(currentStage + 1),
    prevStage: () => currentStage > 0 && setStage(currentStage - 1),
  };
}

const CheckoutPage = () => {
  const { data: LastData , error: LastError, loading: LastLoading } = useQuery(ACTIVE_CUSTOMER_AND_CUSTOMER);
  const { data, error: ProcessError, loading: ProcessLoading } = useQuery(GET_ACTIVE_ORDER);
  const { currentStage, setStage, nextStage, prevStage } = useProgress();
  useEffect(() => {
  
    { LastData && LastData.activeCustomer ? setStage(1) : setStage(0)}
    
    if (data.activeOrder && data.activeOrder.state === 'ArrangingPayment') {
      setStage(2);
    }
    
  }, [LastData,data]);
  if (ProcessLoading) {
    return <div>Loading...</div>;
  }
  if (ProcessError) {
    return <div>Error! {ProcessError ? ProcessError.message : 'No active order'}</div>;
  }
  if (LastLoading) {
    return <div>Loading...</div>;
  }
  if (LastError) {
    return <div>Error! {LastError ? LastError.message : 'No active order duh'}</div>;
  }
  const stages = [
    { name: 'Sign in', render: () => <SignInStage nextStage={nextStage} /> },
    { name: 'Shipping', render: () => <ShippingStage nextStage={nextStage} /> },
    {
      name: 'Payment',
      render: () => (
        <PaymentStage nextStage={nextStage} prevStage={prevStage} />
      ),
    },
    {
      name: 'Confirmation',
      render: () => <ConfirmationStage nextStage={nextStage} />,
    },
  ];
  return (
  <Layout>
    <div className='mt-32'>
      <div>
          {stages[currentStage].render()}
      </div>
    </div>
   </Layout>
  );
};

export default CheckoutPage;
