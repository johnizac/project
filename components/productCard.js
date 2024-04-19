/*****************************************************************************
* BTI425 – Project
* I declare that this assignment is my own work in accordance with SenecaAcademic Policy.
* No part of this assignment has been copied manually or electronically from any other source
* (including web sites) or distributed to other students.
*
* Group member:9 Name:Ahmed Shaikh 127566222 & John Mubeezi 106922222 Date: 4/19/2024
*****************************************************************************/
import React from 'react';
import { useRouter } from 'next/router';
import { useAtom } from 'jotai';
import { FavouritesAtom } from '../atoms';

export default function ProductCard({ product }) {
    const router = useRouter();
    const [favourites, setFavourites] = useAtom(FavouritesAtom);

    function addToFavourites() {

        if (!favourites.find(fav => fav.id === product.id))// Prevent adding duplicate items to favourites
        {
            setFavourites([...favourites, product]);
        }
    }

    function handleImageClick() {
        // Navigate to the product detail page when the image is clicked
        router.push(`/products/${product.id}`);
    }

    return (
        <div className="card m-3" style={{ maxWidth: '18rem' }}>
            <img src={product.thumbnail} className="card-img-top" alt={product.title} onClick={handleImageClick} style={{ cursor: 'pointer' }} />
            <div className="card-body">
                <h5 className="card-title">{product.title}</h5>
                <p className="card-text">{product.description}</p>
                <div className="d-flex justify-content-between align-items-center">
                    <strong>${product.price.toFixed(2)}</strong>
                    <button onClick={addToFavourites} className="btn btn-primary">Add To Favourites</button>
                </div>
            </div>
        </div>
    );
}