import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import ProductCard from '../../components/productCard';

export async function getServerSideProps(context) {
  const { q } = context.query;
  const res = await fetch('https://dummyjson.com/products');
  const data = await res.json();
  const products = data.products;

  if (q) {
    const filtered = products.filter((product) =>
      product.title.toLowerCase().includes(q.toLowerCase())
    );
    
    return { props: { products: filtered } };
  }

  return { props: { products } };
}

export default function Products({ products }) {
  const router = useRouter();
  const { q } = router.query;

  return (
    <>
      <div className="text-center mt-5">
  <h1 className="mb-3">Products</h1>
  {q && <p className="lead">Search Results for: <strong>{q}</strong></p>}
</div>
<div className="d-flex flex-wrap justify-content-center">
  {products && products.length > 0 ? (
    products.map((prod) => (
      <div key={prod.id} className="m-2">
        <ProductCard product={prod} />
      </div>
    ))
  ) : (
    <p>No products found.</p>
  )}
</div>

    </>
    
  );
}