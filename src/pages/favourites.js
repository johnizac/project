import { useAtom } from "jotai";
import { FavouritesAtom } from "../../atoms";
import { useEffect } from "react";
import ProductCard from "../../components/productCard";
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
                <div style={{ margin: "30px", flexGrow: "1" }}>
                    <div style={{ maxWidth: "300px", border: "1px solid #ccc", borderRadius: "8px", padding: "20px", height: "auto" }}>

                        <img src={product.images[0]} style={{ maxWidth: "100%", marginBottom: "10px" }} />
                        <h3 style={{ marginBottom: "10px" }}>{product.name}</h3>
                        <p style={{ marginBottom: "10px" }}>{product.description}</p>
                        <strong>${product.price}</strong>
                        <br></br>
                        <button onClick={e => removeFromFavourites(product)}>Remove From Favourites</button>
                    </div>
                </div>
            ))}
        </div>
        </>
    )
}