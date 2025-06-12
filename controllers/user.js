import User from "../models/User.js";

export const createUser = async (req, res) => {
  const newUser = new User(req.body);
  try {
    const result = await newUser.save();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const email = req.params.email;
    const user = req.body;
    const filter = { email: email };
    const options = { upsert: true };
    const updateDoc = {
      $set: user,
    };
    const result = await User.updateOne(filter, updateDoc, options);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("deleted successfully");
  } catch (err) {
    next(err);
  }
};
export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

export const getAdmin = async (req, res, next) => {
  try {
    const email = req.params.email;
    const query = { email };
    const user = await usersCollection.findOne(query);
    res.send({ isAdmin: user?.role === "admin" });
  } catch (err) {
    next(err);
  }
};

export const getUsers = async (req, res, next) => {
  try {
    const query = {};
    const users = await User.find(query).toArray();
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
};

export const getJWT = async (req, res, next) => {
  try {
    const email = req.query.email;
    const query = { email: email };
    const user = await User.findOne(query);
    if (user) {
      const token = jwt.sign({ email }, process.env.ACCESS_TOKEN, {
        expiresIn: "1h",
      });
      return res.send({ accessToken: token });
    }
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};
