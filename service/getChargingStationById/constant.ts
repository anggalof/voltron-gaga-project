import { gql } from 'graphql-tag';

export const PUBLIC_CHARGE_STATION = gql`
  query PublicChargeStation($stationId: bigint) {
    publicChargeStation(where: {id: {_eq: $stationId}}) {
      id
      name
      coordinates
      address
      city
      state
      postalCode
      operatingHours
      isAvailable
      type
      chargePoints(orderBy: {position: ASC}) {
        id
        isAvailable
        online
        chargePointConnectors(orderBy: {position: ASC}) {
          id
          chargePointId
          position
          connector
          maxPower
          available
          enumConnector {
            type
          }
          tariff {
            id
            priceKwh
            adminFee
            connectionFee
            currencyId
            pjnFee
            priceKwhOriginal
            connectionFeeOriginal
            discountPercentageKwh
            discountPercentageSurcharge
            discountPercentageAdminFee
            tax {
              id
              amount
            }
          }
        }
      }
      total: chargePointsAggregate {
        aggregate {
          count
        }
      }
      available: chargePointsAggregate(where: {isAvailable: {_eq: "Available"}}) {
        aggregate {
          count
        }
      }
    }
  }
`;
