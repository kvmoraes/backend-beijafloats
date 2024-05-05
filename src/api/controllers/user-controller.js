const user_repository = require('../../db/models/user');
const { 
    encrypt_password,
    verify_password 
} = require('../../utils/encrypt-password');

const authenticateUser = async (email_adress, password) => {
	const account = await user_repository.findOne({
		where: { email_adress },
	});

	if (!account) throw new Error('Invalid email');

	const isValidPassword = await verify_password(password, account?.password);

	if (!isValidPassword) throw new Error('Invalid password');

	return account;
};

module.exports = { authenticateUser };