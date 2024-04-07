

import {useAtom} from "jotai";
import { FavouritesAtom } from "../atoms";
export default function ProductCard(props)
{
    const { product } = props;

    const [favourites, setFavourites] = useAtom(FavouritesAtom);

    function addToFavourites(product){
        for(let i=0; i<favourites.length; i++)
        {
            if(favourites[i] ==product) return;//prevent duplicate data.
        }
        setFavourites([...favourites, product]);
      }

    return(
        <>
      <div style={{ margin: "30px", flexGrow: "1" }}>
  <div style={{ maxWidth: "300px", border: "1px solid #ccc", borderRadius: "8px", padding: "20px" ,height:"auto" }}>
    
    <img src={product.images[0]} style={{ maxWidth: "100%", marginBottom: "10px" }} />
    <h3 style={{ marginBottom: "10px" }}>{product.title}</h3>
    <p style={{ marginBottom: "10px" }}>{product.description}</p>
    <strong>${product.price}</strong>
    <br></br>
    <button onClick={e=>addToFavourites(product)}>Add To Favourites</button>
  </div>
</div>


{/* <div style={{ margin: "30px", flexGrow: "1" }}>
  <div style={{ maxWidth: "300px", border: "1px solid #ccc", borderRadius: "8px", padding: "20px" ,height:"auto" }}>
    
    <img src={product.images[0]} style={{ maxWidth: "100%", marginBottom: "10px" }} />
    <h3 style={{ marginBottom: "10px" }}>{product.name}</h3>
    <p style={{ marginBottom: "10px" }}>{product.description}</p>
    <strong>${product.price}</strong>
  </div>
</div> */}


        </>
    )
}