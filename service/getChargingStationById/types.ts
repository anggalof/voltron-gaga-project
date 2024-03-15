interface ChargePoint {
  id: string;
  isAvailable: boolean;
  online: boolean;
  chargePointConnectors: ChargePointConnector[];
}

interface ChargePointConnector {
  id: string;
  chargePointId: string;
  position: number;
  connector: string;
  maxPower: number;
  available: boolean;
  enumConnector: {
    type: string;
  };
  tariff: {
    id: string;
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
    tax: {
      id: string;
      amount: number;
    };
  };
}

export interface PublicChargeStation {
  id: string;
  name: string;
  coordinates: string;
  address: string;
  city: string;
  state: string;
  postalCode: string;
  operatingHours: string;
  isAvailable: boolean;
  type: string;
  chargePoints: ChargePoint[];
  total: {
    aggregate: {
      count: number;
    };
  };
  available: {
    aggregate: {
      count: number;
    };
  };
}
