import User from '../models/user.model.js';

export const createUser = async (req, res) => {
    const user = await User.create(req.body);
    res.status(201).json({ success: true, data: user });
};

export const getUsers = async (req, res) => {
    const users = await User.find();
    res.json({ success: true, data: users });
};

export const updateUser = async (req, res) => {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ success: true, data: user });
};

export const deleteUser = async (req, res) => {
    await User.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'User deleted' });
};