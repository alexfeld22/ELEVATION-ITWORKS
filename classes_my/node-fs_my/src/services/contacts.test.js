import {add, remove, update, getOne, clearContacts} from "./contacts";
import getDb from './db';

const db = getDb();

const mockUser = {
    name: 'John Travolta',
    email: 'travolta@gmail.com',
};
const mockEmail = 'john@mail.com';
const mockName = 'Tralala';

describe('Contact service test', ()=>{
    describe('Should be defined', () => {
        test('add',()=>{
            expect(add).toBeDefined();
        });
        test('remove',()=>{
            expect(remove).toBeDefined();
        });
        test('update',()=>{
            expect(update).toBeDefined();
        });
        test('getOne',()=>{
            expect(getOne).toBeDefined();
        });
        test('clearContacts',()=>{
            expect(clearContacts).toBeDefined();
        });
    });

    describe('Test getOne() function', () => {
        test('get a non-exist user', async ()=>{
            await clearContacts();
            expect(await getOne(mockEmail)).toBe(undefined);
        });
        test('get an exist user', async ()=>{
            await clearContacts();
            const addedUser = await add(mockUser);
            const userInDb = await getOne(mockUser.email);
            const result = addedUser.email === userInDb.email && addedUser.name === mockUser.name;
            expect(result).toBe(true);
        });
    })
})
