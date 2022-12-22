const { nanoid } = require("nanoid");
const path = require("path");
const fs = require("fs/promises");

const contactsPath = path.join(__dirname, "./db/contacts.json");
// TODO: задокументувати кожну функцію

async function listContacts() {
  const contactsList = await fs.readFile(contactsPath, { encoding: "utf8" });
  const parseContactsList = JSON.parse(contactsList);
  return parseContactsList;
}

async function writeContact(contact) {
  await fs.writeFile(contactsPath, JSON.stringify(contact, null, 2));
}

async function getContactById(contactId) {
  const contactsList = await listContacts();

  const getContactById = contactsList.filter(
    (contact) => contact.id === contactId
  );

  return getContactById;
}

async function removeContact(contactId) {
  const contactsList = await listContacts();

  const uptateContact = contactsList.filter(
    (contact) => contact.id !== contactId
  );

  return await writeContact(uptateContact);
}

async function addContact(name, email, phone) {
  const id = nanoid();
  const newObject = { id, name, email, phone };

  const contactsList = await listContacts();
  contactsList.push(newObject);
  return await writeContact(contactsList);
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
