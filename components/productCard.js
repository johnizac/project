

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
     <div className="m-3 d-flex flex-grow-1">
            <div className="card" style={{ maxWidth: '18rem' }}>
                <img src={product.images[0]} className="card-img-top" alt={product.title} />
                <div className="card-body">
                    <h5 className="card-title">{product.title}</h5>
                    <p className="card-text">{product.description}</p>
                    <div className="d-flex justify-content-between align-items-center">
                        <strong>${product.price}</strong>
                        <button onClick={() => addToFavourites(product)} className="btn btn-primary">Add To Favourites</button>
                    </div>
                </div>
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
