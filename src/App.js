import { useState } from 'react';
import shortid from 'shortid';

import ContactForm from 'components/ContactForm';
import ContactList from 'components/ContactList';
import Filter from 'components/Filter';
import Container from 'components/Container';

import styles from './App.module.scss';

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  const addNewContact = (name, number) => {
    const contact = {
      id: shortid.generate(),
      name,
      number,
    };

    if (!name || !number) {
      alert('Please enter the correct name and number');
      return;
    }

    contacts.find(({ name }) => name === contact.name)
      ? alert(`${name} is already in contacts`)
      : setContacts(prevState => [contact, ...prevState]);
  };

  const handleChangeFilter = event => setFilter(event.currentTarget.value);

  const getContactsToShow = () =>
    contacts.filter(({ name }) =>
      name.toLowerCase().includes(filter.toLowerCase()),
    );

  const handleDeleteContact = id =>
    setContacts(prevState => prevState.filter(contact => contact.id !== id));

  return (
    <div className={styles.App}>
      <Container>
        <h1 className={styles.title}>Phonebook (hook)</h1>
        <ContactForm onSubmit={addNewContact} />

        <h2 className={styles.titleContacts}>Contacts</h2>
        <Filter value={filter} onChangeFilter={handleChangeFilter} />
        <ContactList
          contacts={getContactsToShow()}
          onDeleteContact={handleDeleteContact}
        />
      </Container>
    </div>
  );
};

export default App;
