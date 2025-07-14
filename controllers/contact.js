const Contact = require('../models/contact');

// GET all contacts
const getAll = async (req, res) => {
  try {
    const contacts = await Contact.getAllContacts();
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving contacts', error: error.message });
  }
};

// GET contact by ID
const getById = async (req, res) => {
  try {
    const contact = await Contact.getContactById(req.params.id);
    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    res.status(200).json(contact);
  } catch (error) {
    res.status(400).json({ message: 'Invalid contact ID', error: error.message });
  }
};

// POST create new contact
const create = async (req, res) => {
  try {
    const { firstName, lastName, email, favoriteColor, birthday } = req.body;

    // Basic validation
    if (!firstName || !lastName || !email || !favoriteColor || !birthday) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const result = await Contact.createContact(req.body);
    res.status(201).json({ id: result.insertedId });
  } catch (error) {
    res.status(500).json({ message: 'Error creating contact', error: error.message });
  }
};

// PUT update existing contact
const update = async (req, res) => {
  try {
    const { firstName, lastName, email, favoriteColor, birthday } = req.body;

    // Basic validation
    if (!firstName || !lastName || !email || !favoriteColor || !birthday) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const result = await Contact.updateContact(req.params.id, req.body);
    if (result.modifiedCount === 0) {
      return res.status(404).json({ message: 'Contact not found or no changes made' });
    }
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ message: 'Invalid contact ID', error: error.message });
  }
};

// DELETE contact by ID
const remove = async (req, res) => {
  try {
    const result = await Contact.deleteContact(req.params.id);
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ message: 'Invalid contact ID', error: error.message });
  }
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove
};
