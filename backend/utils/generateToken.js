import jwt from "jsonwebtoken";

//sign and set
const generateTokenAndSetCookie = (userId, res) => {
	// const token = jwt.sign({payload}, secretPrivatekey,{time})

	const token = jwt.sign({userId}, process.env.JWT_SECRET,{expiresIn: "30d",});
	//res is an object which has cookie property.
	//setting the token in a cookie
	//setting the token with name 'jwt' in the cookie.

	res.cookie("jwt", token, {
		maxAge: 30 * 24 * 60 * 60 * 1000, // MS --> set to 30 days
		httpOnly: true, // prevent XSS attacks cross-site scripting attacks
		sameSite: "strict", // CSRF attacks cross-site request forgery attacks
		secure: process.env.NODE_ENV !== "development",
	});
};
//export a method created to generate the token after signing in and then setting in the cookie, cookie will be sent to the server with each request from the browser.
export default generateTokenAndSetCookie;


// The res.cookie() function is used to set the cookie name to value. The value parameter may be a string or object converted to JSON.

// Syntax:

// res.cookie(name, value [, options])
// Parameters: The name parameter holds the name of the cookie and the value parameter is the value assigned to the cookie name. The options parameter contains various properties like encode, expires, domain, etc. 