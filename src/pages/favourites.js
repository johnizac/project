import { useAtom } from "jotai";
import { FavouritesAtom } from "../../atoms";
import { useEffect } from "react";
//import ProductCard from "../../components/productCard";
export default function Favourites() {
    const [favourites, setFavourites] = useAtom(FavouritesAtom);
    console.log(favourites);
    useEffect(() => {
        
        
      }, [favourites]);
      function removeFromFavourites(product) {
        const updatedFavourites = favourites.filter(item => item !== product);
        setFavourites(updatedFavourites);
      }
    return (
        <>
        {favourites.length==0 &&<h1>No favourites added</h1>}
        <div style={{ flexWrap: "wrap", display: "flex" }}>
            {favourites.map(product => (
              <div className="m-3 d-flex flex-grow-1">
              <div className="card" style={{ maxWidth: '18rem' }}>
                  <img src={product.images[0]} className="card-img-top" alt={product.title} />
                  <div className="card-body">
                      <h5 className="card-title">{product.title}</h5>
                      <p className="card-text">{product.description}</p>
                      <div className="d-flex justify-content-between align-items-center">
                          <strong>${product.price}</strong>
                          <button onClick={() => removeFromFavourites(product)} className="btn btn-primary">Remove From Favourites</button>
                      </div>
                  </div>
              </div>
          </div>
            ))}

            
        </div>
        </>
    )
}