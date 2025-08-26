import type { Part, Lab } from "./types";

function getRandomStatus(): "Repaired" | "Under Testing" | "Defective" {
  const statuses: ("Repaired" | "Under Testing" | "Defective")[] = ["Repaired", "Under Testing", "Defective"];
  return statuses[Math.floor(Math.random() * statuses.length)];
}

function getRandomDate(): Date {
    const start = new Date(2023, 0, 1);
    const end = new Date();
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

export const labs: Lab[] = [
  { id: "turret-elec", name: "Turret Elec" },
  { id: "hull-lab-1", name: "Hull Lab-I" },
  { id: "hull-lab-2", name: "Hull Lab-II" },
  { id: "gcs-lab", name: "GCS Lab" },
  { id: "elec-harness-lab", name: "Elec Harness Lab" },
];

const turretElecParts: Omit<Part, 'id' | 'status' | 'repairedAt' | 'repairTime' | 'testingTime'>[] = [
    { name: "Temp cont Box", labId: "turret-elec"},
    { name: "KS2 Steering cont Box", labId: "turret-elec"},
    { name: "Fan cont Relay JZ103", labId: "turret-elec"},
    { name: "Smoke screen cont Box T-25", labId: "turret-elec"},
    { name: "AAMG cont Box", labId: "turret-elec"},
    { name: "Connecting Box with support", labId: "turret-elec"},
    { name: "Gunner Dist Box", labId: "turret-elec"},
    { name: "Commd Dist Box", labId: "turret-elec"},
    { name: "Electromagnetic w/ handle", labId: "turret-elec"},
    { name: "Electromagnetic cont Assy", labId: "turret-elec"},
    { name: "Dust removing forced blower fan", labId: "turret-elec"},
    { name: "EM Traversing Motor", labId: "turret-elec"},
];

const hullLab1Parts: Omit<Part, 'id' | 'status' | 'repairedAt' | 'repairTime' | 'testingTime'>[] = [
    { name: "Voltage regulator", labId: "hull-lab-1"},
    { name: "Small fan", labId: "hull-lab-1"},
    { name: "Rectifier", labId: "hull-lab-1"},
    { name: "Oil pump motor", labId: "hull-lab-1"},
    { name: "Smoke motor", labId: "hull-lab-1"},
    { name: "Bilge pump motor", labId: "hull-lab-1"},
];

const hullLab2Parts: Omit<Part, 'id' | 'status' | 'repairedAt' | 'repairTime' | 'testingTime'>[] = [
    { name: "Emergency lamp", labId: "hull-lab-2"},
    { name: "XZN Travel Sw", labId: "hull-lab-2"},
    { name: "Steering indicator", labId: "hull-lab-2"},
    { name: "Head lamp", labId: "hull-lab-2"},
    { name: "Dvr Hatch locking device", labId: "hull-lab-2"},
    { name: "Azmith lamp", labId: "hull-lab-2"},
    { name: "Illu Lamp with Sw", labId: "hull-lab-2"},
    { name: "Number lamp", labId: "hull-lab-2"},
    { name: "Digits", labId: "hull-lab-2"},
    { name: "Leveller Illu Sw", labId: "hull-lab-2"},
    { name: "Front top light", labId: "hull-lab-2"},
    { name: "Rear top light", labId: "hull-lab-2"},
    { name: "Dvr distribution board", labId: "hull-lab-2"},
    { name: "Thermal smoke screen control box", labId: "hull-lab-2"},
    { name: "Marker lamp red", labId: "hull-lab-2"},
    { name: "Rotary base junction", labId: "hull-lab-2"},
    { name: "Marker lamp green", labId: "hull-lab-2"},
    { name: "Electric brush box", labId: "hull-lab-2"},
    { name: "Bracket body", labId: "hull-lab-2"},
    { name: "Fire Ext cont box", labId: "hull-lab-2"},
    { name: "Emergency Sw", labId: "hull-lab-2"},
    { name: "Optical detector", labId: "hull-lab-2"},
];

const gcsLabParts: Omit<Part, 'id' | 'status' | 'repairedAt' | 'repairTime' | 'testingTime'>[] = [
    { name: "SBL 53", labId: "gcs-lab"},
    { name: "AL motor", labId: "gcs-lab"},
    { name: "Loading cont box", labId: "gcs-lab"},
    { name: "Driving converter", labId: "gcs-lab"},
    { name: "Angle limiter", labId: "gcs-lab"},
    { name: "EM clutch", labId: "gcs-lab"},
    { name: "Turret motor", labId: "gcs-lab"},
    { name: "Mag solenoid", labId: "gcs-lab"},
    { name: "Voltage booster", labId: "gcs-lab"},
    { name: "Hoist solenoid", labId: "gcs-lab"},
];

const elecHarnessLabParts: Omit<Part, 'id' | 'status' | 'repairedAt' | 'repairTime' | 'testingTime'>[] = [
    { name: "Rotary cable", labId: "elec-harness-lab"},
    { name: "Shrapnel cable", labId: "elec-harness-lab"},
    { name: "Bulkhead plug cable", labId: "elec-harness-lab"},
    { name: "DDB cable", labId: "elec-harness-lab"},
    { name: "Fire Ext small cable", labId: "elec-harness-lab"},
    { name: "Indicator with cable", labId: "elec-harness-lab"},
    { name: "Hebon cylindrical cable", labId: "elec-harness-lab"},
];

const allParts = [
    ...turretElecParts,
    ...hullLab1Parts,
    ...hullLab2Parts,
    ...gcsLabParts,
    ...elecHarnessLabParts
];

export const parts: Part[] = allParts.map((part, index) => ({
  ...part,
  id: `P${(index + 1).toString().padStart(4, '0')}`,
  status: getRandomStatus(),
  repairTime: Math.floor(Math.random() * 100) + 1,
  testingTime: Math.floor(Math.random() * 24) + 1,
  repairedAt: getRandomDate(),
}));
