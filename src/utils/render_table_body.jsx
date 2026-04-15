import AdminTableProduct from "../components/table-rows/admin_TableProduct";
import TableOrder from "../features/orders/components/TableOrder";
import TableProduct from "../components/table-rows/TableProduct";
import TableUserList from "../components/table-rows/TableUser_list";

function renderTableBody({
  key,
  item,
  onEditClick,
  onDeleteClick,
  onViewClick,
}) {
  switch (key) {
    case "TableProduct":
      return (
        <TableProduct
          item={item}
          onViewClick={onViewClick}
          onEditClick={onEditClick}
          onDeleteClick={onDeleteClick}
        />
      );

    case "admin_TableProduct":
      return <AdminTableProduct item={item} />;

    case "TableUser_list":
      return <TableUserList item={item} />;

    case "TableOrder":
      return <TableOrder item={item} />;

    default:
      return (
        <td className="px-6 py-4 text-gray-500 col-span-full text-center">
          Unknown data type
        </td>
      );
  }
}

export default renderTableBody;
