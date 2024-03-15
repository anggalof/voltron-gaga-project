interface Tax {
  id: number;
  amount: number;
}

interface Tariff {
  id: number;
  priceKwh: number;
  adminFee: number;
  connectionFee: number;
  currencyId: string;
  pjnFee: number;
  priceKwhOriginal: number;
  connectionFeeOriginal: number;
  discountPercentageKwh: number;
  discountPercentageSurcharge: number;
  discountPercentageAdminFee: number;
  tax: Tax;
}

interface EnumConnector {
  type: string;
}

interface ChargePointConnectors {
  id: number;
  chargePointId: number;
  position: number;
  connector: string;
  maxPower: number;
  available: string;
  enumConnector: EnumConnector;
  tariff: Tariff;
}

interface ChargePoints {
  id: number;
  chargePointConnectors: ChargePointConnectors;
}

interface Aggregate {
  count: number;
}

interface Total {
  aggregate: Aggregate;
}

export interface ChargingStationData {
  [x: string]: any;
  id: number;
  name: string;
  coordinates: any;
  address: string;
  city: string;
  state: string;
  postalCode: string;
  operatingHours: any;
  chargePoints: ChargePoints;
  total: Total;
}
