import { dateFormater, formatIndianAmount } from "../../lib/date_formator";

const TableOrder = ({ item }) => {
  return (
    <>
      <td className="px-6 py-4 font-medium text-brand-text whitespace-nowrap">
        {item?.id || "not available"}
      </td>

      <td className="px-6 py-4 font-medium text-brand-text whitespace-nowrap">
        <div className="flex items-center">
          <img
            src={item?.product?.image_url}
            alt={"property"}
            className="w-12 h-8 rounded-md object-cover"
          />
          <div>
            <h2 className="ml-3 capitalize text-slate-600 text-sm font-semibold">
              {item?.product?.title || "not available"}
            </h2>
          </div>
        </div>
      </td>

      <td className="px-6 py-4 font-medium text-brand-text capitalize whitespace-nowrap">
        {item?.user?.name || "not available"}
      </td>
      <td className="px-6 py-4 font-medium text-brand-text capitalize whitespace-nowrap">
        {item?.quantity || "not available"}
      </td>
      <td className="px-6 py-4 capitalize text-slate-500 text-sm font-normal">
        {formatIndianAmount(item?.price)}
      </td>

      <td className="px-6 py-4 capitalize text-slate-500 text-sm font-normal">
        {formatIndianAmount(item?.total_price)}
      </td>
      <td className="px-6 py-4 capitalize text-slate-500 text-sm font-normal">
        {dateFormater(item?.created_at, "DateTime")}
      </td>
    </>
  );
};

export default TableOrder;
