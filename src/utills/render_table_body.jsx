import CreateProduct from "../component/table_rows/create_product";

function renderTableBody({
  key,
  item,
  onEditClick,
  onDeleteClick,
  onViewClick,
}) {
  switch (key) {
    case "sms_template":
      return (
        <CreateProduct
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
