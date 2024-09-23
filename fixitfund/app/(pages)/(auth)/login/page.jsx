"use client";
import React, { useState } from "react";
import { Mail, Lock, LogIn } from "lucide-react";
import { signInWithEmailAndPassword, signInWithPopup } from "@firebase/auth";
import { auth, provider } from "../../../_lib/firebase";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/navigation";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link"; // Import Link for navigation

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const router = useRouter();

	function LoginWithEmail(event) {
		event.preventDefault();
		if (email.trim() === "" || password.trim() === "") {
			setEmail("");
			setPassword("");
			return toast.error("Please do not leave inputs blank!", {
				position: toast.POSITION.TOP_RIGHT,
			});
		}

		signInWithEmailAndPassword(auth, email, password)
			.then((userCredentials) => {
				const uid = userCredentials.user.uid;
				console.log(uid);
				userCredentials.user
					.getIdToken()
					.then((token) => {
						localStorage.setItem("Token", token);
					})
					.catch((error) => {
						alert(error.message);
					});

				toast.success("Success!");
				setTimeout(() => {
					router.push(`/`);
				}, 1000);
			})
			.catch((error) => {
				return toast.error(error.message);
			});
	}

	function GoogleSignIn(event) {
		event.preventDefault();
		signInWithPopup(auth, provider)
			.then((userCredentials) => {
				const uid = userCredentials.user.uid;

				userCredentials.user
					.getIdToken()
					.then((token) => {
						localStorage.setItem("Token", token);
					})
					.catch((error) => {
						return toast.error(error.message);
					});

				toast.success("Success!");
				setTimeout(() => {
					router.push("/");
				}, 1000);
			})
			.catch((error) => {
				return toast.error(error.message);
			});
	}

	return (
		<div className="min-h-screen bg-[#FFFAF1] flex items-center justify-center">
			<ToastContainer />
			<div className="bg-white shadow-lg rounded-lg max-w-md w-full p-8">
				<h1 className="text-3xl font-bold text-center text-black mb-6">
					Sign In
				</h1>
				<form className="space-y-6">
					<div>
						<label
							htmlFor="email"
							className="block mb-2 font-medium text-black"
						>
							<Mail className="inline-block w-5 h-5 mr-2" />
							Email
						</label>
						<input
							id="email"
							type="email"
							required
							className="w-full p-3 border border-gray-300 rounded-md text-black focus:ring-purple-500 focus:border-purple-500"
							placeholder="example@gmail.com"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
					</div>
					<div>
						<label
							htmlFor="password"
							className="block mb-2 font-medium text-black"
						>
							<Lock className="inline-block w-5 h-5 mr-2" />
							Password
						</label>
						<input
							id="password"
							type="password"
							required
							className="w-full p-3 border border-gray-300 text-black rounded-md focus:ring-purple-500 focus:border-purple-500"
							placeholder="Enter your password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
					</div>
					<button
						type="submit"
						onClick={LoginWithEmail}
						className="w-full bg-lightblue text-white px-6 py-3 rounded-md text-lg font-semibold hover:bg-purple-700 transition duration-300"
					>
						<LogIn className="inline-block w-5 h-5 mr-2" />
						Login
					</button>
				</form>
				<div className="mt-6">
					<button
						onClick={GoogleSignIn}
						className="w-full bg-white border border-gray-300 text-gray-700 px-6 py-3 rounded-md text-lg font-semibold hover:bg-gray-50 transition duration-300 flex items-center justify-center"
					>
						<svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
							<path
								fill="#4285F4"
								d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
							/>
							<path
								fill="#34A853"
								d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
							/>
							<path
								fill="#FBBC05"
								d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
							/>
							<path
								fill="#EA4335"
								d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
							/>
							<path fill="none" d="M1 1h22v22H1z" />
						</svg>
						Login with Google
					</button>
				</div>
				<div className="mt-4 text-center">
					<p className="text-black">
						Don't have an account?{" "}
						<Link href="/signup" className="text-blue-600 hover:underline">
							Sign Up
						</Link>
					</p>
				</div>
			</div>
		</div>
	);
};

export default Login;
