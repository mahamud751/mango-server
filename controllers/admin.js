import Admin from "../models/Admin.js";
export const createAdmin = async (req, res) => {
  const newUser = new Admin(req.body);
  try {
    const result = await newUser.save();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
};
export const getJWT = async (req, res, next) => {
  try {
    const email = req.query.email;
    const query = { email: email };
    const user = await Admin.findOne(query);
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
