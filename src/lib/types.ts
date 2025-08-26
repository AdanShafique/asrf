export type PartStatus = "Functional" | "Under Testing" | "Defective";

export type Part = {
  id: string;
  name: string;
  labId: string;
  status: PartStatus;
  repairTime: number; // in hours
  testingTime: number; // in hours
  repairedAt: Date;
};

export type Lab = {
  id:string;
  name: string;
};
