import { Config } from 'node-json-db';
import getDb, { storeData, getData, deleteData } from './db.js';

const CONFIG = {
    separator: '/',
    contactsPath: '/contacts',
    contactsCntPath: '/contactsCnt',
    countactsCnt: 0,
}

async function clearContacts () {
    try {
        const result = await deleteData(CONFIG.contactsPath);
        CONFIG.countactsCnt = 0;
        return result;
    } catch (err) {
        console.error("We gon an error: ", err);
        return false;
    }
}

async function add({name, email}){
    try {
        const emailLowered = email.toLowerCase();
        const emailPath = CONFIG.contactsPath + CONFIG.separator + emailLowered;
        const existedUser = await getOne(emailLowered);

        const updatedDate = new Date();
        const createdDate = existedUser ? existedUser.createdDate  : updatedDate;
        const userObj = {
            name: name,
            email: emailLowered,
            createdDate: createdDate,
            updatedDate: updatedDate,
        }
        await storeData(emailPath, userObj);
        CONFIG.countactsCnt += 1;
        await storeData(CONFIG.contactsPath + CONFIG.contactsCntPath, CONFIG.countactsCnt);
        return await getOne(emailLowered);
    } catch (err) {
        console.error("We gon an error: ", err);
        return false;
    }
}

async function remove(userEmailStr){
    try {
        const userEmailLowered = userObj.email.toLowerCase();
        const userObj = await getOne(userEmailLowered);
        await deleteData();
        return userObj;
    } catch (err) {
        console.error("We gon an error: ", err);
        return false;
    }
}

async function getOne(userEmailStr){
    const userEmailLowered = userEmailStr.toLowerCase();
    const emailPath = CONFIG.contactsPath + CONFIG.path + userEmailStr;
    try {
        const isSuccess = await getData(emailPath); 
        return isSuccess;
    } catch (error) {
        console.log(`User "${userEmailStr}" doesn't exist.`);
        return undefined;
    }
}

async function update(userEmailStr,userNameStr){
    try {
        const userEmailLowered = userObj.email.toLowerCase();
        const emailPath = CONFIG.contactsPath + userEmailStr;
        const userObj = await getOne(userEmailLowered);
        if(!userObj){
            userObj.userName = userEmailStr;
            userObj.updatedDate = new Date ();
            await storeData(emailPath, userObj);
            return userObj;
        }
    } catch (err) {
        console.error("We gon an error: ", err);
        return null;
    }
}

export {clearContacts, add, remove, update, getOne};