import getDb from './services/db.js';
import { add, remove, getOne, update, clearContacts } from './services/contacts.js';


// const db = getDb();

// (async () => {
//   await db.push("/test1","super test");
//     const data = await db.getData('/');
//     console.info(data);
// })();


const db = getDb();

const mockUserObj = {
  name: "Alex",
  email: "alex@alex.com",
};

(async () => {
  console.log(await clearContacts());
  // const isInit = await initContacts();
  // const data = await db.getData('/');
  // console.log(data);
  // const contactsDB = await initContacts();
  console.log(await add(mockUserObj));
  console.log(await add(mockUserObj));
  console.log(await db.getData('/'));
})();