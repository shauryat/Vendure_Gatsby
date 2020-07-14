import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/react-hooks';

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
    nextStage: () => currentStage < 2 && setStage(currentStage + 1),
    prevStage: () => currentStage > 0 && setStage(currentStage - 1),
  };
}

const CheckoutPage = () => {
  const { data: ProcessindData , error: ProcessError, loading: ProcessLoading } = useQuery(GET_ACTIVE_ORDER);
  const { currentStage, setStage, nextStage, prevStage } = useProgress();
  useEffect(() => {
    if (ProcessindData.activeOrder && ProcessindData.activeOrder.state === 'ArrangingPayment') {
      setStage(1);
    }
  }, [ProcessindData]);
  if (ProcessLoading) {
    return <div>Loading...</div>;
  }
  if (ProcessError) {
    return <div>Error! {ProcessError ? ProcessError.message : 'No active order'}</div>;
  }
  const stages = [
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
      <div className="columns">
        <div className="column is-three-quarters">
          <div className={styles.checkoutStageIndicator}>
            <ol>
              {stages.map((stage, index) => (
                <li
                  key={stage.name}
                  className={
                    index === currentStage ? styles.active : ''
                  }
                >
                  {stage.name}
                </li>
              ))}
            </ol>
          </div>
          {stages[currentStage].render()}
        </div>
      </div>
    </Layout>
  );
};

export default CheckoutPage;
