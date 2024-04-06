import ProductCard from "../../components/productCard";
export async function getStaticProps() {
    const res = await fetch('https://dummyjson.com/products');
    //const res = await fetch('http://localhost:3001/products');
    const data = await res.json();
    return { props: { staticProducts: data.products } };
}

export default function Products(props) {
    const { staticProducts } = props;
    return (
        <>
            <div style={{ textAlign: "center" }}>
                <h1>Products</h1>
            </div>
            <div style={{ flexWrap: "wrap", display: "flex" }}>
                {staticProducts.map(prod => (
                    <div key={prod.id} style={{ width: "300px", margin: "10px" }}>
                        <ProductCard product={prod} />
                    </div>
                ))}
            </div>
        </>
    )
}