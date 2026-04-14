import { useState } from 'react';
import { ProductCard } from './components/card/card';
import { ProductDetail } from './components/card/product-detail';
import Navbar from './components/navbar/navbar';
import products from './data/data.json';
import type { Product } from './components/card/card';
import ProductAdminPanel from './admin/ProductAdminPanel';

export default function App() {
    const [selected, setSelected] = useState<Product | null>(null);

    return (
        <div>
            <Navbar />

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 p-6">
                {products.map((product) => (
                    <ProductCard
                        key={product.id}
                        product={product as Product}
                        onViewDetail={setSelected}
                    />
                ))}
            </div>

            <ProductDetail
                product={selected}
                onClose={() => setSelected(null)}
            />
            {/* <ProductAdminPanel /> */}
        </div>
    );
}
