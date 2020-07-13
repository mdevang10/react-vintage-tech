import React, { useContext } from "react";
import { ProductContext } from "../../context/products";

export const Filters = () => {
	const {
		filters: { search, category, shipping, price },
		updateFilters,
		sorted,
	} = useContext(ProductContext);
	return (
		<section className="filters-section">
			<h2 className="section-title">search products</h2>
			<form className="filters-form">
				<div>
					{/* search input */}
					<div className="form-group">
						<label htmlFor="search">search term</label>
						<input
							type="text"
							id="search"
							name="search"
							value={search}
							onChange={updateFilters}
							className="form-control"
						></input>
					</div>
					{/* end of search input */}

					{/* select category */}
					<div className="form-group">
						<label htmlFor="category">category</label>
						<select
							id="category"
							name="category"
							value={category}
							onChange={updateFilters}
							className="form-control"
						>
							<option value="all">all</option>
							<option value="phone">phone</option>
							<option value="computer">computer</option>
							<option value="radio">radio</option>
						</select>
					</div>
					{/* end of select category */}

					{/* free shipping */}
					<div className="form-group">
						<input
							type="checkbox"
							id="shipping"
							name="shipping"
							checked={shipping}
							onChange={updateFilters}
							className="form-control"
						></input>
						<label htmlFor="shipping">free shipping</label>
					</div>
					{/* end of free shipping */}
				</div>
				<div className="price-group">
					{/* price */}
					<p>price </p>
					<label>
						<input
							type="radio"
							value="all"
							name="price"
							checked={price === "all"}
							onChange={updateFilters}
						></input>
						all
					</label>
					<label>
						<input
							type="radio"
							value="0"
							name="price"
							checked={price === 0}
							onChange={updateFilters}
						></input>
						$0 - $300
					</label>
					<label>
						<input
							type="radio"
							value="300"
							name="price"
							checked={price === 300}
							onChange={updateFilters}
						></input>
						$330 - $650
					</label>
					<label>
						<input
							type="radio"
							value="650"
							name="price"
							checked={price === 650}
							onChange={updateFilters}
						></input>
						Over $650
					</label>
					{/* end of proce */}
				</div>
			</form>
			<h6>total products : {sorted.flat().length}</h6>
		</section>
	);
};

export default Filters;
