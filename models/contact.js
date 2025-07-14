const { ObjectId } = require('mongodb');
const { getDb } = require('../database/connection');

// Get all contacts
const getAllContacts = async () => {
    const db = getDb();
    return await db.collection('contacts').find().toArray();
};

// Get a single contact by ID
const getContactById = async (id) => {
    const db = getDb();
    return await db.collection('contacts').findOne({ _id: new ObjectId(id) });
};

// Create a new contact
const createContact = async (data) => {
    const db = getDb();
    return await db.collection('contacts').insertOne(data);
};

// Update an existing contact
const updateContact = async (id, data) => {
    const db = getDb();
    return await db.collection('contacts').updateOne(
        { _id: new ObjectId(id) },
        { $set: data }
    );
};

// Delete a contact
const deleteContact = async (id) => {
    const db = getDb();
    return await db.collection('contacts').deleteOne({ _id: new ObjectId(id) });
};

module.exports = {
    getAllContacts,
    getContactById,
    createContact,
    updateContact,
    deleteContact
};
