import React from 'react';
import GoogleFontLoader from 'react-google-font-loader';
import NoSsr from '@material-ui/core/NoSsr';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import {
  Info,
  InfoCaption,
  InfoSubtitle,
  InfoTitle,
} from '@mui-treasury/components/info';
import { useGalaxyInfoStyles } from '@mui-treasury/styles/info/galaxy';
import { useCoverCardMediaStyles } from '@mui-treasury/styles/cardMedia/cover';
import { Link } from 'gatsby';

import { formatPrice } from '../../utilities/utilities';

function ProductPrice({ price, currencyCode }) {
  return (
    <div>
      { price.min !== price.max && 'from'} {formatPrice(currencyCode, price.min)}
    </div>
  );
}

const useStyles = makeStyles(() => ({
  card: {
    borderRadius: '1rem',
    boxShadow: 'none',
    position: 'relative',
    marginRight:3,
    marginBottom:10,
    minWidth: 170,
    minHeight: 290,
    '&:after': {
      content: '""',
      display: 'block',
      position: 'absolute',
      width: '100%',
      height: '64%',
      bottom: 0,
      zIndex: 1,
      background: 'linear-gradient(to top, #000, rgba(0,0,0,0))',
    },
  },
  content: {
    position: 'absolute',
    zIndex: 2,
    bottom: 0,
    width: '100%',
  },
description : {
    overflow:'hidden',
    textOverflow:'ellipsis',
    display:'-webkit-box',
    WebkitLineClamp:2,
    WebkitBoxOrient:'vertical',
    marginTop:6
  }
}));

export const GalaxyCardDemo = ({product}) => {
  const mediaStyles = useCoverCardMediaStyles({ bgPosition: 'top' });
  const styles = useStyles();
  return (
    <>
      <NoSsr>
        <GoogleFontLoader
          fonts={[
            { font: 'Spartan', weights: [300] },
            { font: 'Montserrat', weights: [200, 400, 700] },
          ]}
        />
      </NoSsr>
   <Link to={'/products/' + product.slug}>   
      <Card className={styles.card}>
        <CardMedia
          classes={mediaStyles}
          image={product.productAsset.preview}
        />
        <Box py={3} px={2} className={styles.content}>
          <Info useStyles={useGalaxyInfoStyles}>
            <InfoSubtitle>{product.productName}</InfoSubtitle>
            <InfoTitle><ProductPrice price={product.priceWithTax} currencyCode={product.currencyCode}/></InfoTitle>
            <InfoCaption className={styles.description}>{product.description}</InfoCaption>
          </Info>
        </Box>
      </Card>
      </Link>
    </>
  );
};
export default GalaxyCardDemo