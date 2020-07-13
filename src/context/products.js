// products context
import React, { useState, useEffect } from "react";
import axios from "axios";
import url from "../utils/URL";
import { featuredProducts, flattenProducts, paginate } from "../utils/helpers";

export const ProductContext = React.createContext();

export default function ProductProvider({ children }) {
	const [loading, setLoading] = useState(false);
	const [products, setProducts] = useState([]);
	const [featured, setFeatured] = useState([]);

	//extra state values
	const [sorted, setSorted] = useState([]);
	const [page, SetPage] = useState(0);
	const [filters, setFilters] = useState({
		search: "",
		category: "all",
		shipping: false,
		price: "all",
	});

	//change page
	const changePage = (index) => {
		SetPage(index);
	};

	//update filters
	const updateFilters = (e) => {
		const type = e.target.type;
		const name = e.target.name;
		const value = e.target.value;
		let filterValue;
		if (type === "checkbox") {
			filterValue = e.target.checked;
		} else if (type === "radio") {
			value === "all"
				? (filterValue = value)
				: (filterValue = parseInt(value));
		} else {
			filterValue = value;
		}
		setFilters({ ...filters, [name]: filterValue });
	};

	useEffect(() => {
		setLoading(true);
		axios.get(`${url}/products`).then((response) => {
			const featured = featuredProducts(flattenProducts(response.data));
			const products = flattenProducts(response.data);
			setSorted(paginate(products));
			setProducts(products);
			setFeatured(featured);
			setLoading(false);
		});

		return () => {};
	}, []);

	useEffect(() => {
		let newProducts = [...products].sort((a, b) => a.price - b.price);
		const { search, category, shipping, price } = filters;

		if (category !== "all") {
			newProducts = newProducts.filter(
				(item) => item.category === category
			);
		}

		if (shipping !== false) {
			newProducts = newProducts.filter(
				(item) => item.Free_shipping === shipping
			);
		}

		if (search !== "") {
			newProducts = newProducts.filter((item) => {
				let title = item.title.toLowerCase().trim();
				return title.startsWith(search.toLowerCase()) ? item : null;
			});
		}

		if (price !== "all") {
			newProducts = newProducts.filter((item) => {
				if (price === 0) {
					return item.price < 300;
				} else if (price === 300) {
					return item.price >= 300 && item.price < 650;
				} else {
					return item.price >= 650;
				}
			});
		}

		SetPage(0);
		setSorted(paginate(newProducts));
	}, [filters, products]);

	return (
		<ProductContext.Provider
			value={{
				products,
				featured,
				loading,
				sorted,
				page,
				filters,
				changePage,
				updateFilters,
			}}
		>
			{children}
		</ProductContext.Provider>
	);
}
