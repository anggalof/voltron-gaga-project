import { useState } from "react";
import { NextPageContext } from "next";
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faChevronUp, faChevronDown, faHeart, faLocationArrow, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import serviceChargeStationDetail, { ChargeStationDetailResponse } from "../../service/getChargingStationById";
import styles from "./style.module.css";

const ChargeStationDetail: React.FC = (props: any) => {
  const router = useRouter();
  const [collapse, setCollapse] = useState<number | null>(null);
  const { chargeStationDetail } = props;
  if (!chargeStationDetail) return <div className="flex items-center justify-center">No data available</div>;

  const handleCollapse = (id: any) => {
    setCollapse(collapse === id ? null : id);
  };

  return (
    <div className={styles.root}>
      <div className="bg-white pb-4 px-4 md:py-4 md:px-10">
        <div className="flex py-4">
          <div className="cursor-pointer" onClick={() => router.back()}>
            <div className="bg-[#04524E] text-white px-[0.5rem] py-[0.2rem] rounded-[50%]">
              <FontAwesomeIcon icon={faArrowLeft} />
            </div>
          </div>
          <div className="flex items-center">
            <div className="text-[#2B2D29] pl-2 text-sm">Back</div>
          </div>
        </div>
        <div className="text-[#04524E]">
          <div className="text-xl font-semibold">{chargeStationDetail.name}</div>
          <div className="text-sm">{chargeStationDetail.address}</div>
          <div className="text-xs py-4">
            <FontAwesomeIcon icon={faLocationDot} />
            <span className="ml-2">5.43 km</span>
          </div>
          <div className="flex">
            <div className="bg-[#04524E] text-white rounded-md px-6 py-2 cursor-pointer">
              <FontAwesomeIcon icon={faLocationArrow} />
              <span className="ml-2">Navigasi</span>
            </div>
            <div className="bg-white text-[#04524E] border-[1px] border-[#04524E] rounded-md px-6 py-2 ml-2 cursor-pointer">
              <FontAwesomeIcon icon={faHeart} />
            </div>
          </div>
          <div className="flex py-4">
            <div className="text-sm flex items-center">1/2 tersedia</div>
            <div className="ml-4 p-2 rounded-md border-[1px] border-gray-400 text-xs">
              max. {chargeStationDetail.chargePoints[0].chargePointConnectors[0].maxPower} kW
            </div>
          </div>
          <div className="text-md font-semibold text-[#04524E]">
            Selalu Buka
          </div>
        </div>
      </div>
      <div className="bg-gray-100 p-4 md:py-4 md:px-10">
        <div className="text-lg font-semibold text-[#04524E]">
          Titik Pengisian
        </div>
        <div className="text-sm text-black">Pilih untuk memulai isi daya</div>
        {chargeStationDetail.chargePoints.map((item: any) => {
          return (
            <div className="bg-white p-4 rounded-md flex my-4 cursor-pointer" key={item.id} onClick={() => handleCollapse(item.id)}>
              <div className="px-2 rounded-md border-[1px] border-[#04524E] text-[#04524E] text-md font-semibold h-[1.6rem]">
                {item.chargePointConnectors[0].chargePointId}
              </div>
              <div className={`rounded-md border-[1px] ${collapse === item.id ? 'border-[#04524E]' : 'border-gray-200'} p-2 ml-2 w-full`}>
                <div className="flex">
                  <div className="rounded-md border-[1px] p-2 border-gray-200 flex">
                    <span className="text-[#04524E]">01</span>
                    <div className="flex items-center">
                      <span className="ml-2 bg-[#04524E] w-2 h-2"></span>
                    </div>
                  </div>
                  <div className="flex w-full">
                    <div className="flex items-center px-2">
                      <img src="/images/electric.png" alt="electric" className="w-5 h-5" />
                    </div>
                    <div className="flex justify-between w-full">
                      <div>
                        <div className="text-md font-semibold text-[#04524E]">
                          {item.chargePointConnectors[0].maxPower} kW
                        </div>
                        <div className="text-gray-400 text-xs">
                          <span>{item.chargePointConnectors[0].connector}</span>
                          <span className="ml-1">{item.chargePointConnectors[0].enumConnector.type}</span>
                        </div>
                      </div>
                      <div className="ml-2 text-sm font-medium md:font-normal text-[#00713B] flex items-center">
                        {collapse === item.id ?
                          <FontAwesomeIcon icon={faChevronUp} className="ml-2" /> : 
                          <FontAwesomeIcon icon={faChevronDown} className="ml-2" />
                        }
                      </div>
                    </div>
                  </div>
                </div>
                {collapse === item.id && (
                  <div className="mt-4 border-t-[1px] border-gray-300 flex justify-between text-[14px] text-[#04524E] py-2">
                    <div className="">Harga per kWh</div>
                    <div className="">Rp. {item.chargePointConnectors[0].tariff.priceKwh}</div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
      <div className="p-4 md:py-4 md:px-10">
        <img src="/images/ev-charging.jpeg" alt="ev-charging" className="rounded-md bg-cover m-auto" />
        <div className=" h-20 md:h-auto"></div>
      </div>
      <div className="fixed bottom-0 p md:relative p-4 bg-white w-full">
        <div className={`p-2 text-center text-lg text-white bg-[#04524E] rounded-md cursor-pointer ${!collapse && 'pointer-events-none opacity-80'}`}>
          Pilih Konektor
        </div>
      </div>
    </div>
  )
}

export default ChargeStationDetail;

export async function getServerSideProps(context: NextPageContext) {
  const id = context.query.param?.toString().split(',')[0];
  try {
    const chargeStationDetail: ChargeStationDetailResponse | null = await serviceChargeStationDetail(id);

    return {
      props: {
        chargeStationDetail,
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
}
