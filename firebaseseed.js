// firebaseSeed.js
import { db } from "./firebase.js";
import { collection, doc, setDoc, serverTimestamp, Timestamp } from "firebase/firestore";

// ----------------------
// Helper Functions
// ----------------------
const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const randomChoice = (arr) => arr[Math.floor(Math.random() * arr.length)];
const randomArray = (arr, count) => {
  const result = [];
  const pool = [...arr];
  while (result.length < count && pool.length > 0) {
    const index = Math.floor(Math.random() * pool.length);
    result.push(pool.splice(index, 1)[0]);
  }
  return result;
};

// Sample data pools
const firstNames = ["John","Alice","Robert","Maria","James","Emma","Michael","Olivia","David","Sophia"];
const lastNames = ["Doe","Smith","Johnson","Brown","Taylor","Anderson","Lee","Martinez","Wilson","Thomas"];
const genders = ["Male","Female","Other"];
const conditions = ["Hypertension","Diabetes Type 2","Asthma","Allergy","Migraine","High Cholesterol"];
const medications = ["Amlodipine","Metformin","Salbutamol","Ibuprofen","Paracetamol","Atorvastatin"];
const allergiesPool = ["Penicillin","Dust","Peanuts","Seafood","Pollen","None"];
const roles = ["patient","doctor","admin"];
const loginStatuses = ["Success","Failed"];
const alertStatuses = ["Active","Resolved"];

// ----------------------
// Generate 50 Users
// ----------------------
const users = [];
for (let i = 1; i <= 50; i++) {
  const fullName = `${randomChoice(firstNames)} ${randomChoice(lastNames)}`;
  users.push({
    userID: `user_${i}`,
    fullName,
    // FIX: replace ALL spaces, not just the first one
    email: `${fullName.replace(/\s+/g, "").toLowerCase()}@example.com`,
    phone: `+2677${randomInt(1000000, 9999999)}`,
    passwordHash: `hashedpassword${i}`,
    role: randomChoice(roles),
    createdAt: serverTimestamp()
  });
}

// ----------------------
// Generate MedicalRecords
// ----------------------
const medicalRecords = [];
for (let i = 1; i <= 50; i++) {
  medicalRecords.push({
    recordID: `record_${i}`,
    userID: `user_${i}`,
    age: randomInt(18, 70),
    gender: randomChoice(genders),
    condition: randomChoice(conditions),
    allergies: randomArray(allergiesPool, randomInt(0, 2)),
    currentMedication: randomArray(medications, randomInt(1, 2)),
    lastCheckup: serverTimestamp(),
    nextCheckup: serverTimestamp(),
    riskLevel: randomChoice(["Low","Medium","High"])
  });
}

// ----------------------
// Generate Prescriptions
// ----------------------
const prescriptions = [];
for (let i = 1; i <= 50; i++) {
  prescriptions.push({
    prescriptionID: `presc_${i}`,
    medicalRecordID: `record_${i}`,
    userID: `user_${i}`,
    medicineName: randomChoice(medications),
    dosage: `${randomInt(1, 2)} pill(s)`,
    frequency: randomChoice(["Once daily","Twice daily","Three times daily"]),
    startDate: serverTimestamp(),
    endDate: serverTimestamp(),
    refillDate: serverTimestamp(),
    reminderTimes: ["08:00","20:00"]
  });
}

// ----------------------
// Generate Dashboards
// ----------------------
const dashboards = [];
for (let i = 1; i <= 50; i++) {
  dashboards.push({
    dashboardID: `dash_${i}`,
    userID: `user_${i}`,
    // FIX: serverTimestamp() is not allowed inside arrays — use Timestamp.now() instead
    upcomingCheckups: [Timestamp.now()],
    upcomingRefills: [Timestamp.now()],
    riskLevel: randomChoice(["Low","Medium","High"]),
    notifications: [
      { message: "Checkup due", timestamp: Timestamp.now(), readStatus: false }
    ]
  });
}

// ----------------------
// Generate EmergencyAlerts
// ----------------------
const emergencyAlerts = [];
for (let i = 1; i <= 50; i++) {
  emergencyAlerts.push({
    alertID: `alert_${i}`,
    userID: `user_${i}`,
    timestamp: serverTimestamp(),
    status: randomChoice(alertStatuses)
  });
}

// ----------------------
// Generate Logins
// ----------------------
const logins = [];
for (let i = 1; i <= 50; i++) {
  logins.push({
    loginID: `login_${i}`,
    userID: `user_${i}`,
    email: `user_${i}@example.com`,
    password: `password${i}`,
    lastLogin: serverTimestamp(),
    loginStatus: randomChoice(loginStatuses)
  });
}

// ----------------------
// Upload Data
// FIX: removed the duplicate seedCollection definition
// ----------------------
async function seedCollection(name, dataArray) {
  try {
    for (let data of dataArray) {
      const docRef = doc(collection(db, name), data[Object.keys(data)[0]]);
      await setDoc(docRef, data);
    }
    console.log(`✅ Seeded ${name}`);
  } catch (error) {
    console.error(`❌ Error seeding ${name}:`, error.message);
  }
}

// Run the seed
async function seedDatabase() {
  await seedCollection("users", users);
  await seedCollection("medicalRecords", medicalRecords);
  await seedCollection("prescriptions", prescriptions);
  await seedCollection("dashboards", dashboards);
  await seedCollection("emergencyAlerts", emergencyAlerts);
  await seedCollection("logins", logins);
  console.log("🎉 Database fully seeded!");
}

seedDatabase();