import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

export const login = async (req, res) => {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
        return res.status(404).json({ success: false, message: 'User not found' });
    }

    if (user.status !== 'active') {
        return res.status(403).json({ success: false, message: 'User inactive' });
    }

    const token = jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '1d' }
    );

    res.json({
        success: true,
        data: {
        token,
        user
        }
    });
};