const { Command } = require("commander");
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} = require("./contacts");

// TODO: рефакторить
async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      try {
        const contactsList = await listContacts();
        if (contactsList.length > 0) {
          console.log(`found ${contactsList.length} contacts`);
          console.table(contactsList);
        }
      } catch (error) {
        console.log("empty base");
        console.log(error);
      }

      break;

    case "get":
      try {
        const getContacts = await getContactById(id);
        if (getContacts.length > 0) {
          console.log(`contact by id: ${id} found`);
          console.table(getContacts);
        }

        console.log(`this id: ${id} does not exist in our database`);
      } catch (error) {
        console.log(error);
      }

      break;

    case "add":
      try {
        await addContact(name, email, phone);
        console.log(`contact added to database`);
      } catch (error) {
        console.log(error);
      }

      break;

    case "remove":
      try {
        await removeContact(id);
        console.log(`contact id:${id} deleted`);
      } catch (error) {
        console.log(error);
      }

      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

invokeAction(argv);
