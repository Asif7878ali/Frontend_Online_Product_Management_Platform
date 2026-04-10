import { dateFormater, formatIndianAmount } from "../../lib/date_formator";

const AdminTableProduct = ({ item }) => {
  return (
    <>
      <td className="px-6 py-4 font-medium text-brand-text whitespace-nowrap">
        <div className="flex items-center">
          <img
            src={item?.image_url}
            alt={"property"}
            className="w-12 h-8 rounded-md object-cover"
          />
          <div>
            <h2 className="ml-3 capitalize text-slate-600 text-sm font-semibold">
              {item?.title || "Property Name Not Available"}
            </h2>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 font-medium text-brand-text whitespace-nowrap">
        {item?.description || "not available"}
      </td>

      <td className="px-6 py-4 font-medium text-brand-text whitespace-nowrap">
        {formatIndianAmount(item?.price) || "not available"}
      </td>

      <td className="px-6 py-4 font-medium text-brand-text whitespace-nowrap">
        {item?.stock || "not available"}
      </td>
      <td className="px-6 py-4 font-medium text-brand-text capitalize whitespace-nowrap">
        {item?.category?.name || "not available"}
      </td>

      <td className="px-6 py-4 capitalize text-slate-500 text-sm font-normal">
        {dateFormater(item?.created_at, "DateTime")}
      </td>

      <td className="px-6 py-4 font-medium text-brand-text capitalize whitespace-nowrap">
        {item?.user?.name || "not available"}
      </td>
    </>
  );
};

export default AdminTableProduct;
