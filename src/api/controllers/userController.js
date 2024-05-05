const prisma = require("@prisma/client");
const jwt = require("jsonwebtoken");
const { 
    encrypt_password,
    verify_password 
} = require('../utils/encrypt-password');
const lumxApi = require("../services/lumx")

const dotenv = require('dotenv');
dotenv.config();

const Prisma = new prisma.PrismaClient();

const createUser = async (req, res) => {
	try {
		const { 
			name, 
			email,
			password 
		} =	req.body;

		const wallet_data = await lumxApi.post("/wallets")
		const {id, address} = wallet_data.data

		const response = await Prisma.user.create({
			data: {
			  name: name,
			  email: email,
			  password: await encrypt_password(password),
			  wallet_id: id,
			  wallet_address: address
			}
		});
		res.status(200).json(response);	
	} catch (error) {
		res.status(400).json({
			message: error?.message || 'ERROR_TO_CREATE_USER',
		});
	}
};

const loginUser = async (req, res) => {
	try {
		const { 
			email,
			password 
		} =	req.body;
		
		const account = await authenticateUser(email, password);
		if (!account) throw new Error('Invalid credentials');

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

const getMe = async (req, res) => {
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

const getUser = async (req, res) => {
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

module.exports = { createUser, getMe, getUser, loginUser };