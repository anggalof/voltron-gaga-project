import { useQuery } from "@apollo/client";
import { GET_CHARGE_STATION } from "./constant";
import { ChargingStationData } from "./types";
import client from "../../lib/appoloClient";


interface QueryResult {
  loading: boolean;
  error?: any;
  data?: {
    publicChargeStation: ChargingStationData;
  };
}

export const serviceChargeStation = (): QueryResult => {
  const { loading, data } = useQuery(GET_CHARGE_STATION, {
    client,
    variables: {
      limit: 10,
      offset: 0,
    },
  });
  return { loading, data };
};
