import React from 'react';
import { DISPLAY_ORDER } from './confirmation.vendure';
import { useQuery } from '@apollo/client';
import { CartContentsList } from '../ShoppingCart/ShoppingCart'

export const ConfirmationStage = ({ nextStage }) => 
{
const { data, error, loading } = useQuery(DISPLAY_ORDER)

if (loading) {
  return <div>Loading...</div>;
}
if (error) {
  return <div>Error! {error ? error.message : 'No active order'}</div>;
}

  return (
  <div>Confirmation
    
    </div>
    );
}


