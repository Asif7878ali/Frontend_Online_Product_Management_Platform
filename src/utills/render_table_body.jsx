import AdminTableProduct from "../component/table_rows/admin_table_product";
import TableOrder from "../component/table_rows/table_order";
import TableProduct from "../component/table_rows/table_product";
import TableUserList from "../component/table_rows/table_user_list";

function renderTableBody({
  key,
  item,
  onEditClick,
  onDeleteClick,
  onViewClick,
}) {
  switch (key) {
    case "table_product":
      return (
        <TableProduct
          item={item}
          onViewClick={onViewClick}
          onEditClick={onEditClick}
          onDeleteClick={onDeleteClick}
        />
      );

    case "admin_table_product":
      return <AdminTableProduct item={item} />;

    case "table_user_list":
      return <TableUserList item={item} />;

    case "table_order":
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
