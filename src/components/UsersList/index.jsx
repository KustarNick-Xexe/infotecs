import Table from "../ui/Table";
import { useState } from "react";
import Modal from "../ui/Modal";
import './userlist.scss';

const UsersList = ({ users }) => {
  const [openModalId, setOpenModalId] = useState(null);

  // создаем конфиг таблицы
  const options = [
    { field: "name", name: "ФИО", sortable: true },
    { field: "age", name: "Возраст", sortable: true },
    { field: "gender", name: "Пол", sortable: true },
    { field: "phone", name: "Номер телефона", sortable: false },
    { field: "address", name: "Адрес", sortable: true },
  ];

  const handleRowClick = (userId) => {
    setOpenModalId(userId);
  };

  const closeModal = () => {
    setOpenModalId(null);
  };

  // обработка данных под таблицу
  const rowData = users.map((user) => ({
    name: [user.firstName, user.lastName, user.maidenName].join(" "),
    age: user.age,
    gender: user.gender,
    phone: user.phone,
    address: [user.address.address, user.address.city].join(", "),
    id: user.id,
  }));

  return (
    <div className="users-container">
      <Table options={options} rowData={rowData} onRowClick={handleRowClick} />
      {openModalId && <Modal id={openModalId} onClose={closeModal} />}
    </div>
  );
};

export default UsersList;
