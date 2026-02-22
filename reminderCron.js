const cron = require("node-cron");
const { db } = require("../config/firebase");
const { sendNotification } = require("../services/notificationService");

cron.schedule("0 9 * * *", async () => {
  const today = new Date().toISOString().split("T")[0];

  const snapshot = await db.collection("prescriptions")
    .where("refillDate", "==", today)
    .get();

  snapshot.forEach(async (doc) => {
    const prescription = doc.data();

    const userDoc = await db.collection("users")
      .doc(prescription.userId)
      .get();

    const user = userDoc.data();

    if (user?.fcmToken) {
      await sendNotification(
        user.fcmToken,
        "💊 Refill Reminder",
        `Time to refill ${prescription.medication}`
      );
    }
  });
});