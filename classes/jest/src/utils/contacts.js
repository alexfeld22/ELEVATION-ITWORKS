import { contacts } from "../data/contacts.js";

// console.log(contacts.results[0]);

export default function getName(){
    return contacts.results[0].name.first;
}