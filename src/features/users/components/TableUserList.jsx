import { dateFormater } from "../../lib/dateFormatter";

const TableUserList = ({ item }) => {
  return (
    <>
      <td className="px-6 py-4 font-medium text-brand-text whitespace-nowrap">
        {item?.name || "not available"}
      </td>
      <td className="px-6 py-4 font-medium text-brand-text whitespace-nowrap">
        {item?.email || "not available"}
      </td>
      <td className="px-6 py-4 font-medium text-brand-text capitalize whitespace-nowrap">
        {item?.role || "not available"}
      </td>
      <td className="px-6 py-4 font-medium text-brand-text capitalize whitespace-nowrap">
        {item?.is_verified || "not available"}
      </td>
      <td className="px-6 py-4 capitalize text-slate-500 text-sm font-normal">
        {dateFormater(item?.created_at, "DateTime")}
      </td>
      <td className="px-6 py-4 capitalize text-slate-500 text-sm font-normal">
        {dateFormater(item?.updated_at, "DateTime")}
      </td>
    </>
  );
};

export default TableUserList;
