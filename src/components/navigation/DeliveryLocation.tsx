import { FaMapMarkerAlt } from "react-icons/fa";

export default function DeliveryLocation() {
  return (
    <div className="flex items-end mr-8 cursor-pointer">
      <FaMapMarkerAlt color="white" className="mr-1 mb-1.5" />
      <div className="flex-col">
        <p className="text-sm text-grey-500">Delivering to Sydney 2000</p>
        <div className="flex items-center">
          <p className="text-md text-white whitespace-nowrap">
            Click to change delivery location
          </p>
        </div>
      </div>
    </div>
  );
}