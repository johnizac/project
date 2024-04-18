import { useRouter } from 'next/router';

import ProductCard from '../../../components/productCard';
import { Button, Pagination } from 'react-bootstrap';

export async function getServerSideProps(context) {
    const { q, page = 1 } = context.query;
    const limit = 10;  
    const start = (page - 1) * limit;
  
    const res = await fetch(`https://dummyjson.com/products?skip=${start}&limit=${limit}`);
    const data = await res.json();
    const { products, total } = data;
  
    if (q) {
      const filtered = products.filter((product) =>
        product.title.toLowerCase().includes(q.toLowerCase())
      );
      
      return { props: { products: filtered, page, total: filtered.length } };
    }
  
    return { props: { products, page: Number(page), total } };
  }
  

export default function Products({ products, page, total }) {
  const router = useRouter();
  const { q } = router.query;
  const totalPages = Math.ceil(total / 10);

  const handlePagination = (page) => {
    const query = q ? `&q=${q}` : '';
    router.push(`/products?page=${page}${query}`);
  };

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
      <Pagination className="d-flex justify-content-center my-4 w-100">
        {[...Array(totalPages)].map((_, idx) => (
          <Pagination.Item key={idx + 1} active={idx + 1 === page} onClick={() => handlePagination(idx + 1)}>
            {idx + 1}
          </Pagination.Item>
        ))}
      </Pagination>
      <style jsx>{`
        .pagination {
          display: flex;
          justify-content: center;
          width: 100%;  // Make the pagination container full width
        }
        .pagination-item {
          flex-grow: 1;  // Allow each page number to grow and fill the container
          text-align: center;
        }
      `}</style>
    </>
    
  );
}
