import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/user";

import logo from "../assets/logo.svg";
import CartLink from "../components/Cart/CartLink";
import LoginLink from "../components/LoginLink";

export default function Header() {
	const { user } = useContext(UserContext);
	return (
		<header className="header">
			<img src={logo} alt="vintage-tech" className="logo"></img>
			<nav>
				<ul>
					<div>
						<li>
							<Link to="/">Home</Link>
						</li>
						<li>
							<Link to="/about">About</Link>
						</li>
						<li>
							<Link to="/products">products</Link>
						</li>
						{user.token && (
							<li>
								<Link to="/checkout">checkout</Link>
							</li>
						)}
					</div>
					<div>
						<LoginLink></LoginLink>
						<CartLink></CartLink>
					</div>
				</ul>
			</nav>
		</header>
	);
}
