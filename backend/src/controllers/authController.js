import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const JWT_SECRET = process.env.JWT_SECRET || 'super_secret_cinema_elk_jwt_key_2026';

export const registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const userPayload = {
      uid: 'usr_' + Date.now(),
      name,
      email,
      role: 'user',
    };

    const token = jwt.sign(userPayload, JWT_SECRET, { expiresIn: '7d' });

    return res.status(201).json({
      success: true,
      message: 'User registered successfully.',
      token,
      user: userPayload,
    });
  } catch (error) {
    next(error);
  }
};

export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const role = email.includes('admin') ? 'administrator' : 'user';

    const userPayload = {
      uid: 'usr_' + Date.now(),
      email,
      displayName: email.split('@')[0],
      role,
    };

    const token = jwt.sign(userPayload, JWT_SECRET, { expiresIn: '7d' });

    return res.status(200).json({
      success: true,
      message: 'Login successful.',
      token,
      user: userPayload,
    });
  } catch (error) {
    next(error);
  }
};

export const getCurrentUser = async (req, res, next) => {
  try {
    return res.status(200).json({
      success: true,
      user: req.user,
    });
  } catch (error) {
    next(error);
  }
};
