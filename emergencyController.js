const { db } = require("../config/firebase");
const { sendNotification } = require("../services/notificationService");

exports.triggerEmergency = async (req, res) => {
  try {
    const { userId, location } = req.body;

    const alertRef = await db.collection("emergencyAlerts").add({
      userId,
      location,
      timestamp: new Date(),
      status: "Pending"
    });

    const userDoc = await db.collection("users").doc(userId).get();
    const user = userDoc.data();

    if (user?.fcmToken) {
      await sendNotification(
        user.fcmToken,
        "🚑 Emergency Alert",
        "Ambulance has been notified!"
      );
    }

    res.json({ message: "Emergency triggered", alertId: alertRef.id });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

    