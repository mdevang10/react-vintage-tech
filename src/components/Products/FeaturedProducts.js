import React, { useContext } from "react";
import ProductList from "./ProductList";
import Loading from "../Loading";
import { ProductContext } from "../../context/products";

export default function FeaturedProducts() {
	const { loading, featured } = useContext(ProductContext);

	if (loading) {
		return <Loading></Loading>;
	} else {
		return (
			<ProductList
				title="featured products"
				products={featured}
			></ProductList>
		);
	}
}
