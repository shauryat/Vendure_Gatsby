import React from 'react'
import { Link } from 'gatsby'
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';
import ButtonBase from '@material-ui/core/ButtonBase';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      minWidth: 300,
      width: '100%',
    },
    image: {
      position: 'relative',
      borderRadius:'20%',
      height: 197,
      marginRight:2,
      [theme.breakpoints.down('xs')]: {
        width: '100% !important', // Overrides inline-style
        height: 100,
      },
      '&:hover, &$focusVisible': {
        zIndex: 1,
        '& $imageBackdrop': {
          opacity: 0.15,
        },
        '& $imageMarked': {
          opacity: 0,
        },
        '& $imageTitle': {
          border: '0.8px solid currentColor',
        },
      },
    },
    focusVisible: {},
    imageButton: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: theme.palette.common.white,
      
    },
    imageSrc: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      backgroundSize: 'cover',
      backgroundPosition: 'center 40%',
    },
    imageBackdrop: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      backgroundColor: theme.palette.common.black,
      opacity: 0.4,
      transition: theme.transitions.create('opacity'),
    },
    imageTitle: {
      position: 'relative',
      width:'50%',
      borderRadius:5,
      fontWeight:700,
      boxShadow:theme.shadows[7],
      color:theme.palette.common.white,
      padding: `${theme.spacing(2)}px ${theme.spacing(4)}px ${theme.spacing(1) + 6}px`,
    },
    imageMarked: {
      height: 0,
      width: 28,
      backgroundColor:theme.palette.primary.main,
      position: 'absolute',
      bottom: -2,
      left: 'calc(50% - 19px)',
      transition: theme.transitions.create('opacity'),
    },
  }),
);

export const CollectionCard = ({collection}) => {
    const classes = useStyles();
    
    return (
        
        <React.Fragment>
        <ButtonBase
          focusRipple
          key={collection.id}
          className={classes.image}
          focusVisibleClassName={classes.focusVisible}
          style={{
            width:'33.1%',
          }}
        >
          <span
            className={classes.imageSrc}
            style={{
              backgroundImage: `url(${collection.featuredAsset.preview})`,
            }}
          />
          <span className={classes.imageBackdrop} />
          <span className={classes.imageButton}>
            <Typography
              component="span"
              variant="subtitle1"
              color="inherit"
              className={classes.imageTitle}
            >
              {collection.name}
              <span className={classes.imageMarked} />
            </Typography>
          </span>
        </ButtonBase>
        </React.Fragment>
        
    )
}
