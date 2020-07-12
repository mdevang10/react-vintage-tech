import React, { useContext } from "react";
import { CartContext } from "../context/cart";
import { UserContext } from "../context/user";
import EmptyCart from "../components/Cart/EmptyCart";
import CartItem from "../components/Cart/CartItem";
import { Link } from "react-router-dom";
//import {UserContext} from "../context/user"

export default function Cart() {
	let { user } = useContext(UserContext);
	const { cart, total } = useContext(CartContext);

	if (cart.length === 0) {
		return <EmptyCart></EmptyCart>;
	} else {
		return (
			<section className="cart-items section">
				<h2>your cart</h2>
				{cart.map((item) => {
					return <CartItem key={item.id} {...item}></CartItem>;
				})}
				<h2>Total : ${total}</h2>
				{user.token ? (
					<Link to="/checkout" className="btn btn-block btn-primary">
						checkout
					</Link>
				) : (
					<Link to="/login" className="btn btn-block btn-primary">
						login
					</Link>
				)}
			</section>
		);
	}
}
