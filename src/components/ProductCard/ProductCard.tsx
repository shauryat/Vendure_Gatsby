import { Link } from 'gatsby';
import React from 'react';

import { formatPrice } from '../../utilities/utilities';

import styles from './ProductCard.module.scss';

import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CenterFocusStrongOutlinedIcon from '@material-ui/icons/CenterFocusStrongOutlined';

const useStyles = makeStyles((theme: Theme) =>
createStyles({
  root: {
    maxWidth: 325,
    boxShadow:theme.shadows[0],
    marginRight:-5,
    borderRadius:8
    
  },
  image:{
    height:'160px'
  },
  description : {
    overflow:'hidden',
    textOverflow:'ellipsis',
    display:'-webkit-box',
    WebkitLineClamp:4,
    WebkitBoxOrient:'vertical',
    marginTop:6
  }
}));

export function ProductCard({ product }: { product: any }) {
  const classes = useStyles();
  return (

    <Card className={classes.root} variant="outlined" >
      <CardActionArea>  
      <CardMedia className={classes.image}
      component="img"
      image={product.productAsset.preview}
      />
      <CardContent>
        <div>
            <Typography variant="subtitle1">{product.productName}</Typography>
            <ProductPrice price={product.priceWithTax} currencyCode={product.currencyCode}/>
          </div>
                <Typography variant="subtitle2" className={classes.description}>
                  {product.description}</Typography>
        </CardContent>
    </CardActionArea>
    <Button color='primary' size='small'>
    <CenterFocusStrongOutlinedIcon/> 
    </Button>
  </Card>

  
  );
}

function ProductPrice({ price, currencyCode }) {
  return (
    <Typography variant="subtitle2" color="primary">
      { price.min !== price.max && 'from'} {formatPrice(currencyCode, price.min)}
      </Typography>
  );
}
