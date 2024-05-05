const prisma = require("@prisma/client");
const { 
    encrypt_password,
    verify_password 
} = require('../utils/encrypt-password');

const Prisma = new prisma.PrismaClient();

const create_user = async (req, res) => {
	try {
		const { 
			name, 
			email,
			password 
		} =	req.body;
		
		const response = await Prisma.user.create({
			data: {
			  name: name,
			  email: email,
			  password: await encrypt_password(password)
			}
		});
		res.status(200).json(response);	
	} catch (error) {
		res.status(400).json({
			message: error?.message || 'ERROR_TO_CREATE_USER',
		});
	}
};

const login_user = async (req, res) => {
	try {
		const { 
			email,
			password 
		} =	req.body;
		
		const account = await authenticateUser(email, password);
		if (!account) throw new Error('Invalid credentials');

		const jwt = require("jsonwebtoken");

		const userData = {
			name: account.name,
			email: account.email,
			id: account.id
		};

		const token = jwt.sign(userData, process.env.SECRET, {
			expiresIn: 300
		});

		res.status(200).json({
			data: userData,
			"access-token": token
		});
	} catch (error) {
		res.status(401).json({
			message: error?.message || 'Login error',
		});
	}
};

const get_me = async (req, res) => {
	try {
		const response = await Prisma.user.findUnique({
			where: {
				id: Number(req.params.id)
			}
		});
		res.status(200).json(response);
	} catch (error) {
		res.status(400).json({
			message: error?.message || 'ERROR_TO_GET_USER',
		});	
	}
};

const get_user = async (req, res) => {
	try {
		const response = await Prisma.user.findUnique({
			where: {
				id: Number(req.params.id)
			}
		});
		res.status(200).json(response);
	} catch (error) {
		res.status(400).json({
			message: error?.message || 'ERROR_TO_GET_USER',
		});	
	}
};

// const update_user = async (req, res) => {
// 	try{
// 		const { 
// 			name, 
// 			email,
// 			password 
// 		} =	req.body;

// 		const response = await Prisma.user.update({
// 			where: {
// 				email: email
// 			},
// 			data: {
// 				name: name,
// 				password: await encrypt_password(password)
// 			}
// 		})
// 		res.status(200).json(response)
// 	} catch (error) {
// 		res.status(400).json({
// 			message: error?.message || 'ERROR_TO_UPDATE_USER',
// 		});	
// 	}
// }
  
// const delete_user = async (req, res) => {
// 	try {
// 		const response = await Prisma.user.delete({
// 			where: {
// 				id: Number(req.params.id)
// 			}
// 		})
// 		res.status(200).json(response)
// 	} catch (error) {
// 		res.status(400).json({
// 			message: error?.message || 'ERROR_TO_DELETE_USER',
// 		});	
// 	}
// }

const authenticateUser = async (email_adress, password) => {
	const account = await Prisma.user.findFirst({
		where: { 
			email: email_adress
		 },
	});

	if (!account) throw new Error('Invalid email');

	const isValidPassword = await verify_password(password, account?.password);

	if (!isValidPassword) throw new Error('Invalid password');

	return account;
};

module.exports = { create_user, get_me, get_user, login_user };