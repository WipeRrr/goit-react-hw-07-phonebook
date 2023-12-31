import css from './ContactList.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { fetchContacts, deleteContact } from '../../Redux/operations';
import { useEffect } from 'react';
import {
  selectError,
  selectVisibleContacts,
  selectIsLoading,
  selectContacts,
} from '../../Redux/selectors';
import { ClipLoader } from 'react-spinners';
const ContactList = () => {
  const filteredContacts = useSelector(selectVisibleContacts);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <>
      {error && <p>{error}</p>}
      <ul className={css.contactList}>
        {filteredContacts.map(({ id, name, phone }) => (
          <li className={css.contactList__item} key={id}>
            {name}:
            <span className={css.contactList__item__number}>{phone}</span>
            <button
              className={css.contactList__item__button}
              type="button"
              onClick={() => dispatch(deleteContact(id))}
              disabled={isLoading}
            >
              {isLoading && <ClipLoader color="#fff" size={10} />}
              Delete
            </button>
          </li>
        ))}
      </ul>
      {!contacts.length && !error && !isLoading && (
        <p>Your phonebook is empty. Please add contact.</p>
      )}
    </>
  );
};

export default ContactList;
