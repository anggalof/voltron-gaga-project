import { PUBLIC_CHARGE_STATION } from "./constant";
import { PublicChargeStation } from "./types";
import client from "../../lib/appoloClient";

export interface ChargeStationDetailResponse {
  publicChargeStation: PublicChargeStation | null;
}

const serviceChargeStationDetail = async (stationId: string | undefined): Promise<ChargeStationDetailResponse | null> => {
  try {
    const { data } = await client.query({
      query: PUBLIC_CHARGE_STATION,
      variables: { stationId },
    });

    return data.publicChargeStation[0];
  } catch (error) {
    console.error('Error fetching charge station detail:', error);
    return null;
  }
};

export default serviceChargeStationDetail;
