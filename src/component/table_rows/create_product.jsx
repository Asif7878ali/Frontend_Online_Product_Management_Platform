import { dateFormater } from "../../lib/date_formator";
import Icons from "../../utills/Icons";

const CreateProduct = ({ item, onViewClick, onEditClick, onDeleteClick }) => {
  return (
    <>
      <td className="px-6 py-4 font-medium text-brand-text whitespace-nowrap">
        {item.template_title || "not available"}
      </td>

      <td className="px-6 py-4 capitalize text-slate-500 text-sm font-normal">
        {dateFormater(item?.created_at, "DateTime")}
      </td>

      <td className="px-6 py-4 text-slate-500 text-sm font-normal">
        <span
          className={`px-3 py-1 rounded-full font-semibold text-xs ${
            item?.is_active === true
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {item?.is_active ? "Active" : "In Active" || "status not available"}
        </span>
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

export default CreateProduct;
