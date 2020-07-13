import React from "react";
import { ProductContext } from "../context/products";
import Loading from "../components/Loading";
//import ProductList from "../components/Products/ProductList";
import Filters from "../components/Products/Filters";
import PageProducts from "../components/Products/PageProducts";

export default function Products() {
	const { loading } = React.useContext(ProductContext);

	if (loading) {
		return <Loading></Loading>;
	} else {
		return (
			// <ProductList title="our products" products={sorted}></ProductList>
			<>
				<Filters></Filters>
				<PageProducts></PageProducts>
			</>
		);
	}
}
