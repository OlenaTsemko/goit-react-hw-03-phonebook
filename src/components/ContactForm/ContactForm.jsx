import { useState } from 'react';
import PropTypes from 'prop-types';

import shortid from 'shortid';
import PhoneInput from 'react-phone-number-input';

import styles from './ContactForm.module.scss';
import 'react-phone-number-input/style.css';

const ContactForm = ({ contacts, onSubmit }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleChange = event => {
    const { name, value } = event.currentTarget;
    if (name === 'name') {
      setName(value);
    }
    // if (name === 'number') {
    //   setNumber(value);
    // }
  };

  const handleFormSubmit = event => {
    event.preventDefault();

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
    const checkSameNumber = contacts.find(
      ({ number }) => number === contact.number,
    );

    if (checkSameNumber) {
      const { name, number } = checkSameNumber;
      alert(`This number already exists: "${name}: ${number}"`);
      return;
    }

    if (checkSameName) {
      alert(`${name} is already in contacts`);
      return;
    }

    onSubmit(contact);
    reset();
  };

  const reset = () => {
    setName('');
    setNumber('');
  };

  return (
    <form className={styles.ContactForm} onSubmit={handleFormSubmit}>
      <label className={styles.formLabel}>
        <span className={styles.formText}>Name</span>
        <input
          className={styles.formInput}
          type="text"
          placeholder="Enter contact's name"
          name="name"
          value={name}
          onChange={handleChange}
          autoComplete="off"
        />
      </label>
      <label className={styles.formLabel}>
        <span className={styles.formText}>Number</span>
        <PhoneInput
          // name="number"
          value={number}
          onChange={setNumber}
          defaultCountry="UA"
          international
          autoComplete="off"
        />
      </label>

      <button className={styles.formBtn} type="submit">
        Add contact
      </button>
    </form>
  );
};

ContactForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default ContactForm;
