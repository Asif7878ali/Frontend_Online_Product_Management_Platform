import { dateFormater, formatIndianAmount } from "../../lib/date_formator";
import Icons from "../../utills/Icons";

const TableProduct = ({ item, onViewClick, onEditClick, onDeleteClick }) => {
  return (
    <>
      <td className="px-6 py-4 font-medium text-brand-text whitespace-nowrap">
        <div className="flex items-center">
          <img
            src={item?.image}
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

      <td className="px-6 py-4">
        <div className="flex flex-row gap-4">
          <span
            onClick={() => onViewClick(item)}
            className="bg-red-500 text-white p-2 rounded-md cursor-pointer"
          >
            <Icons.EyeSlash className="text-white size-5" />
          </span>
        </div>
      </td>

      <td className="px-4 py-4">
        <div className="flex flex-row gap-4">
          <span
            onClick={() => onEditClick(item)}
            className="bg-red-500 text-white p-2 rounded-md cursor-pointer"
          >
            <Icons.Edit className="text-white size-5" />
          </span>
          <span
            onClick={() => onDeleteClick(item)}
            className="bg-red-500 text-white p-2 rounded-md cursor-pointer"
          >
            <Icons.Delete className="text-white size-5" />
          </span>
        </div>
      </td>
    </>
  );
};

export default TableProduct;
