import { Component } from 'react';
import PropTypes from 'prop-types';

import shortid from 'shortid';

import styles from './ContactForm.module.scss';

class ContactForm extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };

  state = {
    name: '',
    number: '',
  };

  handleChange = event => {
    const { name, value } = event.currentTarget;
    this.setState({ [name]: value });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    const { name, number } = this.state;
    const { contacts } = this.props;

    if (!name || !number) {
      alert('Please enter the correct name and number');
      return;
    }

    const contact = {
      id: shortid.generate(),
      name,
      number,
    };

    const checkSameName = contacts.find(({ name }) => name === contact.name);
    if (checkSameName) {
      alert(`${name} is already in contacts`);
      return;
    }

    this.props.onSubmit(contact);
    this.reset();
  };

  reset = () => {
    this.setState({ name: '', number: '' });
  };

  render() {
    const { name, number } = this.state;

    return (
      <form className={styles.ContactForm} onSubmit={this.handleFormSubmit}>
        <label className={styles.formLabel}>
          <span className={styles.formText}>Name</span>
          <input
            className={styles.formInput}
            type="text"
            placeholder="Enter contact's name"
            name="name"
            value={name}
            onChange={this.handleChange}
          />
        </label>
        <label className={styles.formLabel}>
          <span className={styles.formText}>Number</span>
          <input
            className={styles.formInput}
            type="tel"
            placeholder="Enter contact's number"
            name="number"
            value={number}
            onChange={this.handleChange}
          />
        </label>

        <button className={styles.formBtn} type="submit">
          Add contact
        </button>
      </form>
    );
  }
}

export default ContactForm;
