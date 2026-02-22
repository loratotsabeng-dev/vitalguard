exports.calculateRisk = (record) => {
  if (
    record.conditions?.includes("Hypertension") &&
    record.conditions?.includes("Diabetes")
  ) {
    return "High";
  }

  return "Low";
};