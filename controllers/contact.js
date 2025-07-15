const Contact = require('../models/contact');

// GET all contacts
const getAll = async (req, res) => {
  try {
    const contacts = await Contact.find(); // Mongoose method to get all documents
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving contacts', error: error.message });
  }
};

// GET contact by ID
const getById = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id); // Mongoose findById
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

    const newContact = new Contact(req.body);
    const savedContact = await newContact.save(); // Mongoose save()
    res.status(201).json({ id: savedContact._id });
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

    const updatedContact = await Contact.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!updatedContact) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    res.status(204).send(); // No content
  } catch (error) {
    res.status(400).json({ message: 'Invalid contact ID', error: error.message });
  }
};

// DELETE contact by ID
const remove = async (req, res) => {
  try {
    const deletedContact = await Contact.findByIdAndDelete(req.params.id);

    if (!deletedContact) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    res.status(204).send(); // No content
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
