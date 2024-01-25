import { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { getUserById } from '../../../services/users';
import { get, set } from '../../../services/localStorage';
import './modal.scss';

// отслеживает клик вне выбранного элемента
// по хорошему надо вынести в папку с хуками
const useClickOutside = (ref, onClose) => {
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        onClose();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, onClose]);
};

const Modal = ({ id, onClose }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const wrapperRef = useRef(null);
  useClickOutside(wrapperRef, onClose);

  // запрос на сервер, но перед этим поиск в локальном хранилище
  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      const cacheKey = `user_${id}`;
      const cachedData = get(cacheKey);

      if (cachedData) {
        setUser(cachedData);
        setLoading(false);
        return;
      }

      try {
        const userData = await getUserById(id);
        setUser(userData);
        set(cacheKey, userData);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
  }, [id]);

  return ReactDOM.createPortal(
    <>
      <div className="modal-background" onClick={onClose}></div>
      <div className="modal" ref={wrapperRef}>
        {isLoading ? null : <div>
            <p>{`ФИО: ${[user.firstName, user.lastName, user.maidenName].join(" ")}`}</p>
            <p>{`Возраст: ${user.age}`}</p>
            <p>{`Адрес: ${[user.address.address, user.address.city].join(", ")}`}</p>
            <p>{`Рост: ${user.height} см`}</p>
            <p>{`Вес: ${user.weight} кг`}</p>
            <p>{`Телефон: ${user.phone}`}</p>
            <p>{`Почта: ${user.email}`}</p>
          </div>}
      </div>
    </>,
    document.querySelector('#modal-open-place')
  );
};

export default Modal;
