

export default function ProductCard(props)
{
    const { product } = props;

    return(
        <>
      <div style={{ margin: "30px", flexGrow: "1" }}>
  <div style={{ maxWidth: "300px", border: "1px solid #ccc", borderRadius: "8px", padding: "20px" ,height:"auto" }}>
    
    <img src={product.images[0]} style={{ maxWidth: "100%", marginBottom: "10px" }} />
    <h3 style={{ marginBottom: "10px" }}>{product.name}</h3>
    <p style={{ marginBottom: "10px" }}>{product.description}</p>
    <strong>${product.price}</strong>
  </div>
</div>

        </>
    )
}