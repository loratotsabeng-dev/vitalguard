const { db } = require("../config/firebase");

exports.createUser = async (req, res) => {
  try {
    const userRef = await db.collection("users").add(req.body);
    res.json({ id: userRef.id, ...req.body });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getUsers = async (req, res) => {
  const snapshot = await db.collection("users").get();
  const users = snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
  res.json(users);
};