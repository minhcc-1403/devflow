export type Trip = {
  id: string;
  date: string;
  route: string;

  departTime: string;
  departStation: string;

  arriveTime: string;
  arriveStation: string;

  duration: string;
  price: number;
  vehicleType: string;
};

export interface TimelineStop {
  time: string;
  title: string;
  address: string;
  type: "start" | "stop" | "end";
}

export interface TransferRule {
  title: string;
  items: string[];
}
