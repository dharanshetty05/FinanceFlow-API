import User from '../models/user.model.js';

export const createUser = async (data) => {
    return await User.create(data);
};

export const getUsers = async () => {
    return await User.find().select('-__v');
};

export const getUserById = async (id) => {
    return await User.findById(id);
};

export const updateUser = async (id, data) => {
    return await User.findByIdAndUpdate(id, data, {
        new: true,
        runValidators: true
    });
};

export const deleteUser = async (id) => {
    return await User.findByIdAndDelete(id);
};