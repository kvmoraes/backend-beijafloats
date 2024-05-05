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

const get_user = async (req, res) => {
	try {
		const response = await Prisma.user.findUnique({
			where: {
				id: Number(req.params.id)
			}
		})
		res.status(200).json(response)
	} catch (error) {
		res.status(400).json({
			message: error?.message || 'ERROR_TO_GET_USER',
		});	
	}
}

const update_user = async (req, res) => {
	try{
		const { 
			name, 
			email,
			password 
		} =	req.body;

		const response = await Prisma.user.update({
			where: {
				email: email
			},
			data: {
				name: name,
				password: await encrypt_password(password)
			}
		})
		res.status(200).json(response)
	} catch (error) {
		res.status(400).json({
			message: error?.message || 'ERROR_TO_UPDATE_USER',
		});	
	}
}
  
const delete_user = async (req, res) => {
	try {
		const response = await Prisma.user.delete({
			where: {
				id: Number(req.params.id)
			}
		})
		res.status(200).json(response)
	} catch (error) {
		res.status(400).json({
			message: error?.message || 'ERROR_TO_DELETE_USER',
		});	
	}
}

const authenticateUser = async (email_adress, password) => {
	const account = await user_repository.findOne({
		where: { email_adress },
	});

	if (!account) throw new Error('Invalid email');

	const isValidPassword = await verify_password(password, account?.password);

	if (!isValidPassword) throw new Error('Invalid password');

	return account;
};

module.exports = { create_user, get_user, update_user, delete_user, authenticateUser };