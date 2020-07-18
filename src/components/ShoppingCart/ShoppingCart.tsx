import { faMinus, faPlus, faShoppingBag } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';

import { IconButton , Badge} from '@material-ui/core';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

import { formatPrice } from '../../utilities/utilities';

import styles from './ShoppingCart.module.scss';
import { ADJUST_ITEM_QUANTITY, GET_ACTIVE_ORDER } from "./ShoppingCart.vendure";
import { Link } from "gatsby"

export function ShoppingCart() {
  const { data, error, loading } = useQuery(GET_ACTIVE_ORDER, {pollInterval:500});
  const [opened, setOpened] = useState(false);
  const [adjustItemQuantity] = useMutation(ADJUST_ITEM_QUANTITY);
  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error! {error.message}</div>;
  }
  return (
      <>
        <IconButton color="inherit" onClick={() => setOpened(true)}>
          <Badge badgeContent={data.activeOrder === null
              ? 0: data.activeOrder.lines.reduce(
                  (total, line) => total + line.quantity,
                  0,
              )
              }>
                <ShoppingCartIcon/>
          </Badge>
        </IconButton>
        <div
            className={[styles.cartTray, opened && styles.opened]
                .filter(Boolean)
                .join(' ')}
        >
          <button className="delete" onClick={() => setOpened(false)} />
          <h3 className="title is-3">Cart</h3>
          {data.activeOrder === null ? (
              <div>Empty!</div>
          ): (
              <>
              <CartContentsList
                  order={data.activeOrder}
                  adjustQuantity={(id, quantity) =>
                      adjustItemQuantity({
                        variables: { id, quantity },
                      })
                  }
              />
                <Link className="button is-primary" to="/checkout">Checkout</Link>
              </>
          )  }
        </div>
      </>
  );
}

export function CartContentsList({ order, adjustQuantity }: { order: any, adjustQuantity?: Function }) {
  return (
      <div className={styles.cartContents}>
        {order.lines.map(line => (
            <CartContentsRow
                line={line}
                adjustQuantity={adjustQuantity}
                key={line.id}
            />
        ))}
        <div className={styles.totalRow}>
          <span>Total:</span>
          <span>{formatPrice(order.currencyCode, order.total)}</span>
        </div>
      </div>
  );
}

function CartContentsRow({ line, adjustQuantity }: { line: any, adjustQuantity?: Function }) {
  return (
      <div className={styles.cartRow}>
        <div className={styles.rowImage}>
          <img src={`${line.featuredAsset.preview}?preset=tiny`} />
        </div>
        <div className={styles.rowDetail}>
          <div>{line.productVariant.name}</div>
          <div className={styles.qtyRow}>
            {adjustQuantity && <button
                className={styles.adjustQuantity}
                onClick={() => adjustQuantity(line.id, line.quantity - 1)}
            >
                <FontAwesomeIcon icon={faMinus} color="#999"/>
            </button>}
            {line.quantity}
            {adjustQuantity && <button
                className={styles.adjustQuantity}
                onClick={() => adjustQuantity(line.id, line.quantity + 1)}
            >
              <FontAwesomeIcon icon={faPlus} color="#999"/>
            </button>}
            <div className={styles.rowTotal}>{formatPrice(line.productVariant.currencyCode, line.totalPrice)}</div>
          </div>
        </div>
      </div>
  );
}
