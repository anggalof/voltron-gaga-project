import { gql } from 'graphql-tag';

export const GET_CHARGE_STATION = gql`
  query GetChargeStation($limit: Int, $offset: Int) {
    publicChargeStation(
      limit: $limit,
      offset: $offset,
      orderBy: { createdAt: ASC }
    ) {
      id
      name
      coordinates
      address
      city
      state
      postalCode
      operatingHours
      chargePoints {
        id
        chargePointConnectors {
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
      total: chargePointsAggregate(where: { isAvailable: { _eq: "Available" } }) {
        aggregate {
          count
        }
      }
    }
  }
`;
