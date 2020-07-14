import React from 'react'
import { Link } from 'gatsby'

export const CollectionCard = ({collection}) => {
    return (
        <div>
        <Link to={'/collections/' + collection.slug}>   
         <p>{collection.name}</p> 
         </Link>
        </div>
    )
}
