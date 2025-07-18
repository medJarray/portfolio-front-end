import { makeRequest } from '../utils/index';
import type { Contact, CreateContact, UpdateContact } from '../types/index';

export const contactService = {
    /**
     * Retrieve all contacts
     * @returns Promise<Contact[]> - Array of contacts with id, createdAt, updatedAt
     */
    getContacts: async (): Promise<Contact[]> => {
        return makeRequest<Contact[]>('/contact');
    },

    /**
     * Retrieve a contact by its ID
     * @param id - ID of the contact
     * @returns Promise<Contact> - Contact with id, createdAt, updatedAt
     */
    getContact: async (id: string): Promise<Contact> => {
        return makeRequest<Contact>(`/contact/${id}`);
    },

    /**
     * Create a new contact
     * @param contact - Creation data (without id, createdAt, updatedAt)
     * @returns Promise<Contact> - Created contact with id, createdAt, updatedAt
     */
    createContact: async (contact: CreateContact): Promise<Contact> => {
        console.log('Creating contact:', contact);
        return makeRequest<Contact>('/contact', {
            method: 'POST',
            body: JSON.stringify(contact),
        });
    },

    /**
     * Update an existing contact
     * @param id - ID of the contact to update
     * @param contact - Update data (optional fields)
     * @returns Promise<Contact> - Updated contact
     */
    updateContact: async (id: string, contact: UpdateContact): Promise<Contact> => {
        console.log('Updating contact:', { id, contact });
        return makeRequest<Contact>(`/contact/${id}`, {
            method: 'PATCH',
            body: JSON.stringify(contact),
        });
    },

    /**
     * Delete a contact
     * @param id - ID of the contact to delete
     * @returns Promise<void>
     */
    deleteContact: async (id: string): Promise<void> => {
        await makeRequest<void>(`/contact/${id}`, {
            method: 'DELETE',
        });
    },
};

export default contactService;