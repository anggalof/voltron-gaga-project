import Link from 'next/link';
import { serviceChargeStation } from '../../service/getChargingStation';
import styles from './style.module.css';

export default function Home() {
  const { loading, error, data } = serviceChargeStation();

  if (loading) return <p className="flex items-center justify-center">Loading...</p>;
  if (error) return <p className="flex items-center justify-center">Error: {error.message}</p>;
  if (!data) return <div className="flex items-center justify-center">No data available</div>;

  return (
    <div className={styles.root}>
      <div className="overflow-x-auto py-0 px-auto md:py-10 md:px-10">
        <div className="text-xl mt-4 ml-2 md:mt-0 md:ml-0 font-semibold text-[#04524E] mb-4">Pilih Charge Station</div>
        <div className={styles.card}>
          {data && data?.publicChargeStation?.map((item: any) => {
            return (
              <div
                key={item.id}
                className="border-[1px] border-[#ff6b00] p-4 hover:border-[#04524E] cursor-pointer rounded-none md:rounded-md"
              >
                <Link href={`/charge-station/${item.id}`}>
                  <div className="flex justify-center items-center md:block md:p-0">
                    <div className="w-[80%] md:w-auto">
                      <div className="text-sm font-semibold">{item.name}</div>
                      <div className="text-sm font-normal whitespace-nowrap overflow-hidden overflow-ellipsis">
                        <span>{item.address}</span>
                        <span> {item.city}</span>
                        <span> {item.state}</span>
                        <span> {item.postalCode}</span>
                      </div>
                    </div>
                    <div className="text-xs mt-2 w-[20%] md:w-auto mr-auto">
                      <div className="flex justify-end md:block">2 tersedia</div>
                      <div className="flex justify-end md:block">5.43 km</div>
                    </div>
                  </div>
                  <div className={styles.chargePoints}>
                    {item.chargePoints && item.chargePoints.map((i: any) => {
                      return (
                        <div className="border-2 border-grey-600 p-2 rounded-md flex items-center hover:bg-[#FFF]" key={i.id}>
                          <img src="/images/electric.png" alt="electric" className="w-6 mr-2" />
                          <div className="">
                            <div className="text-sm">{i.chargePointConnectors[0].connector}</div>
                            <div className="text-xs text-gray-400">{i.chargePointConnectors[0].maxPower} kW</div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
