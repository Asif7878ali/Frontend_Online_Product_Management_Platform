import TableProduct from "../component/table_rows/table_product";

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

    default:
      return (
        <td className="px-6 py-4 text-gray-500 col-span-full text-center">
          Unknown data type
        </td>
      );
  }
}

export default renderTableBody;
