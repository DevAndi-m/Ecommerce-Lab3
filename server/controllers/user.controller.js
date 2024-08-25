const User = require('../models/user.model.schema.js');

// GET all users
const getUsers = async (req, res) => {
    try {   
        const users = await User.find({}).lean();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

// GET single user
const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id).lean();
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// CREATE usr
const createUser = async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// UPDATE user
const updateUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const filter = { _id: id };
        const updatedUser = await User.findOneAndUpdate(filter, req.body, { new: true });

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found!" });
        }

        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// DELLET user
const deleteUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const filter = { _id: id };

        const user = await User.findByIdAndDelete(filter);
        if (!user) {
            return res.status(404).json({ message: "User not found!" });
        }

        res.status(200).json({ message: `User with ID ${id} has been deleted` });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUserById,
    deleteUserById
};
