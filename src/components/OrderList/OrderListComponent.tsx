import React from 'react';
import styles from './Order.module.scss';
import { formatPrice } from '../../utilities/utilities'




const OrderListComponent = ({order}) => {
    return (
        <div>
        
      <div className={styles.cartContents}>
        {order.lines.map(line => (
            <CartContentsRow
                line={line}
                  key={line.id}
            />
        ))}
        <div className={styles.totalRow}>
          <span>Total:</span>
          <span>{formatPrice(order.currencyCode, order.total)}</span>
        </div>
      </div>
    </div>
    );
};

const CartContentsRow = ({line}) => {
    return (
        <div className={styles.cartRow}>
          <div className={styles.rowImage}>
            <img src={`${line.featuredAsset.preview}?preset=tiny`} />
          </div>
          <div className={styles.rowDetail}>
            <div>{line.productVariant.name}</div>
              <div className={styles.rowTotal}>{formatPrice(line.productVariant.currencyCode, line.totalPrice)}</div>
            </div>
          </div>
        
    );
}

export default OrderListComponent;