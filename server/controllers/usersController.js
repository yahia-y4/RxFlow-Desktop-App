 const { User } = require('../models/index.js');
const {generateToken} = require('../jwt.js')


 const registerUser = async (req, res) => {
    const { UserName, Email, Password } = req.body;
    try {
        const newUser = await User.create({ UserName, Email, Password});
        res.status(201).json(newUser);
    } catch (error) {
        
        res.status(500).json({ error: error.message });
    }
}


const loginUser = async (req, res) => {
    const { Email, Password } = req.body;
    try {
        const user = await User.findOne({ where: { Email, Password } });
        if (!user) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }
        const token = generateToken(user);
        res.status(200).json({ token , user : {id: user.id, UserName: user.UserName, Email: user.Email, Role: user.Role}});
    } catch (error) {
        console.error('Error logging in user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
const getUserInfo = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const user = await User.findByPk(req.user.id, {
      attributes: { exclude: ['password'] }
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


module.exports = {
    registerUser,
    loginUser,
    getUserInfo
};
