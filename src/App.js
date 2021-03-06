import { Component } from 'react';

import ContactForm from 'components/ContactForm';
import ContactList from 'components/ContactList';
import Filter from 'components/Filter';
import Container from 'components/Container';

import styles from './App.module.scss';

class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    this.setState({ contacts: JSON.parse(localStorage.getItem('contacts')) });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.contacts.length !== this.state.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  addNewContact = contact =>
    this.setState(({ contacts }) => ({ contacts: [contact, ...contacts] }));

  handleChangeFilter = event =>
    this.setState({ filter: event.currentTarget.value });

  getContactsToShow = () => {
    const { filter, contacts } = this.state;

    return contacts.filter(({ name }) =>
      name.toLowerCase().includes(filter.toLowerCase()),
    );
  };

  handleDeleteContact = id =>
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));

  render() {
    const { contacts, filter } = this.state;
    const contactsToShow = this.getContactsToShow();

    return (
      <div className={styles.App}>
        <Container>
          <h1 className={styles.title}>Phonebook</h1>
          <ContactForm contacts={contacts} onSubmit={this.addNewContact} />

          <h2 className={styles.titleContacts}>Contacts</h2>
          <Filter value={filter} onChangeFilter={this.handleChangeFilter} />
          <ContactList
            contacts={contactsToShow}
            onDeleteContact={this.handleDeleteContact}
          />
        </Container>
      </div>
    );
  }
}

export default App;
