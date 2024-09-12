// pages/index.js
import "./globals.css";
import { Suspense } from 'react';
import { fetchProducts } from './lib/api';
import ProductList from './Components/ProductList';
import Pagination from './Components/Pagination';
import ErrorBoundary from './Components/ErrorBoundary';

export default async function Home({ searchParams }) {
  const params = new URLSearchParams(searchParams);
  const page = Number(params.get('page')) || 1;

  try {
    const products = await fetchProducts(page);

    return (
      <main>
        <h1>Our Products</h1>
        <ErrorBoundary fallback={<p>Error loading products. Please try again later.</p>}>
          <Suspense fallback={<p>Loading products...</p>}>
            <ProductList products={products} />
          </Suspense>
        </ErrorBoundary>
        <Pagination currentPage={page} />
      </main>
    );
  } catch (error) {
    return <p>Error: {error.message}</p>;
  }
}
