import Table from "../ui/Table";
import './userlist.scss';

const UsersList = ({ users }) => {
  const options = [
    { field: "name", name: "ФИО" },
    { field: "age", name: "Возраст" },
    { field: "gender", name: "Пол" },
    { field: "phone", name: "Номер телефона" },
    { field: "address", name: "Адрес" },
  ];

  const rowData = users.map((user) => ({
    name: [user.firstName, user.lastName, user.maidenName].join(" "),
    age: user.age,
    gender: user.gender,
    phone: user.phone,
    address: [user.address.address, user.address.city].join(", "),
  }));

  return (
    <div className="users-container">
      <Table options={options} rowData={rowData} />
    </div>
  );
};

export default UsersList;
