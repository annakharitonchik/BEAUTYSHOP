import React from "react";
import "./BeautyItem.css";
import "./BeautyShop.css";
import BeautyShopData from "./BeautyShopData";
import BeautyItem from "./BeautyItem";
export const CartPage = () => (
  <BeautyShopData>
    {({ filteredItems }) => {
      let id = 495;
      let choseItem = filteredItems.find((item) => item.id === id);
      <div className="Product">
        choseItem &&
        <BeautyItem key={choseItem.id} info={choseItem} />
      </div>;
    }}
  </BeautyShopData>
);

// const HomePage = () => {
//   const headers = [
//     "Фамилия",
//     "Имя",
//     "Отчество",
//     "Баланс",
//     "Статус",
//     "Редактировать",
//     "Удалить",
//   ];

//   return (
//     <BeautyShopData>
//       {({
//         companyName,
//         filteredClients,
//         setClientsFilter,
//         dataLoadState,
//         dataLoadError,
//         doAddClient,
//       }) =>
//         dataLoadState === 3 ? (
//           <div style={{ color: "red" }} className="MobileCompany">
//             {dataLoadError}
//           </div>
//         ) : dataLoadState === 2 ? (
//           <div className="HomePage">
//             <p className="NameCompany">{companyName}</p>
//             <div className="ThreeButtons">
//               <button
//                 onClick={() => {
//                   setClientsFilter("all");
//                 }}
//               >
//                 Все
//               </button>
//               <button
//                 onClick={() => {
//                   setClientsFilter("active");
//                 }}
//               >
//                 Активные
//               </button>
//               <button
//                 onClick={() => {
//                   setClientsFilter("blocked");
//                 }}
//               >
//                 Заблокированные
//               </button>
//             </div>
//             <div className="InfoHeaders">
//               {headers.map((header, index) => (
//                 <h3 key={index + 10}>{header}</h3>
//               ))}
//             </div>
//             <div className="Clients">
//               {filteredClients.map((client) => (
//                 <MobileClient key={client.id} info={client} />
//               ))}
//             </div>

//             <button className="AddClient" onClick={() => doAddClient()}>
//               Добавить клиента
//             </button>
//           </div>
//         ) : (
//           <div className="MobileCompany ">
//             <div className="loading-container">
//               <div className="spinner"></div>
//               <p>Loading...</p>
//             </div>
//           </div>
//         )
//       }
//     </BeautyShopData>
//   );
// };

// export default HomePage;

// import React, { useState, useRef } from "react";
// import "./BeautyItem.css";
// import PropTypes from "prop-types";
// import { clientEvents } from "./events";

// const BeautyItem = React.memo((props) => {
//   const surnameRef = useRef(props.info.fam);
//   const nameRef = useRef(props.info.im);
//   const middleNameRef = useRef(props.info.otch);
//   const balanceRef = useRef(props.info.balance);

//   const [isEdit, setIsEdit] = useState(false);

//   const startEdit = () => {
//     setIsEdit(true);
//   };

//   const saveEdit = () => {
//     if (
//       surnameRef.current &&
//       nameRef.current &&
//       middleNameRef.current &&
//       balanceRef.current
//     ) {
//       let newSurname = surnameRef.current.value;
//       let newName = nameRef.current.value;
//       let newMiddleName = middleNameRef.current.value;
//       let newBalance = Number(balanceRef.current.value);

//       clientEvents.emit("ETextChanged", {
//         id: props.info.id,
//         fam: newSurname,
//         im: newName,
//         otch: newMiddleName,
//         balance: newBalance,
//       });
//     }

//     setIsEdit(false);
//   };
//   console.log("MobileClient name = " + props.info.im + " render");
//   return (
// <div className={`Client ${props.info.className || ""}`}>
//   {isEdit ? (
//     <React.Fragment>
//       <input defaultValue={props.info.fam} ref={surnameRef}></input>
//       <input defaultValue={props.info.im} ref={nameRef}></input>
//       <input defaultValue={props.info.otch} ref={middleNameRef}></input>
//       <input defaultValue={props.info.balance} ref={balanceRef}></input>
//       <p
//         className={
//           props.info.balance > 0 ? "StatusActive" : "StatusBlocked"
//         }
//       >
//         {props.info.balance > 0 ? "active" : "blocked"}
//       </p>
//       <p>
//         <button className="Save" onClick={saveEdit}>
//           Сохранить
//         </button>
//       </p>
//     </React.Fragment>
//   ) : (
//     <React.Fragment>
//       <p className="Surname">{props.info.fam}</p>
//       <p className="Name">{props.info.im}</p>
//       <p className="MiddleName">{props.info.otch}</p>
//       <p className="Balance">{props.info.balance}</p>
//       <p
//         className={
//           props.info.balance > 0 ? "StatusActive" : "StatusBlocked"
//         }
//       >
//         {props.info.balance > 0 ? "active" : "blocked"}
//       </p>
//       <p>
//         <button className="Edit" onClick={startEdit}>
//           Редактировать
//         </button>
//       </p>
//     </React.Fragment>
//   )}

//   <p>
//     <button
//       className="Delete"
//       onClick={() => clientEvents.emit("EDelClient", props.info.id)}
//     >
//       Удалить
//     </button>
//   </p>
// </div>
//   );
// });
// BeautyItem.propTypes = {
//   info: PropTypes.shape({
//     id: PropTypes.number.isRequired,
//     fam: PropTypes.string.isRequired,
//     im: PropTypes.string.isRequired,
//     otch: PropTypes.string.isRequired,
//     balance: PropTypes.number.isRequired,
//   }).isRequired,
// };
// export default BeautyItem;
