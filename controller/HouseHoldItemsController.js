import HouseHoldItems from "../models/categories.js";




export const getAllHouseHoldItems = async (req, res) => {

        const householditems = await HouseHoldItems.findAll();

        res.json(householditems)
};

export const getAllHouseHoldItemsById = async (req, res) => {

    const householditem = await HouseHoldItems.findByPk(req.params.id);

    if (!householditem) return res.status(404).json({message: "Item not found"});

        res.status(200).json(householditem)
};

export const getAllHouseHoldItemsByCategory = async (req, res) => {
    try {
        const { category } = req.params;
        
        const householditems = await HouseHoldItems.findAll({
            where: { category: category}
    });

    if (householditems.length === 0) {
            return res.status(404).json({ message: "No items found in this category" });
        }

        res.status(200).json(householditems);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


export const createHouseHoldItem = async (req, res) => {

    try {

       const items = readItems();

        const bodyFields = Object.keys(req.body);

        if (bodyFields.length > 9) {
            return res.status(400).json({
                error: `Too many fields. Maximum 9 fields allowed, but you sent ${bodyFields.length} fields.`,
                receivedFields: bodyFields
            });
        } 

        const newId = items.length > 0 
            ? Math.max(...items.map(item => item.id)) + 1 
            : 1;

        const newhouseholditem = await HouseHoldItems.create(req.body);

        res.status(201).json(newhouseholditem)
    } catch (error) {

        res.status(400).json({error: error.message});

    }
};

export const updateHouseHoldItem = async (req, res) => {

        const householditem = await HouseHoldItems.findByPk(req.params.id);

        if (!householditem) return res.status(404).json({message: "Item Not Found"});

        await householditem.update(req.body)

        res.json(householditem);
};

export const deleteHouseHoldItem = async (req, res) => {

        const householditem = await HouseHoldItems.findByPk(req.params.id);

        if (!householditem) return res.status(404).json({message: "Item Not Found"});

        await householditem.destroy()

        res.json({message: "Item destroyed"});
};

/*import fs from 'fs';
import path from 'path';
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Path to items JSON file
const itemsPath = path.join(__dirname, '../data/items.json');


// Initialize file if not exists

const initializeFile = () => {
    if (!fs.existsSync(itemsPath)) {
        const dir = path.dirname(itemsPath);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
        fs.writeFileSync(itemsPath, JSON.stringify([], null, 2), 'utf8');
    }
};


// Read items from JSON file

const readItems = () => {
    initializeFile();
    const jsonString = fs.readFileSync(itemsPath, 'utf8');
    return JSON.parse(jsonString);
};


// Write items to JSON file

const writeItems = (items) => {
    const jsonString = JSON.stringify(items, null, 2);
    fs.writeFileSync(itemsPath, jsonString, 'utf8');
};

// CRUD OPERATIONS

export const getAllHouseHoldItems = async (req, res) => {
    try {
        const householditems = readItems();
        res.json(householditems);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getAllHouseHoldItemsById = async (req, res) => {
    try {
        const items = readItems();
        const householditem = items.find(item => item.id === parseInt(req.params.id));
        
        if (!householditem) return res.status(404).json({message: "Item not found"});
        
        res.status(200).json(householditem);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getAllHouseHoldItemsByCategory = async (req, res) => {
    try {
        const { category } = req.params;
        const items = readItems();
        
        const householditems = items.filter(item => 
            item.category.toLowerCase() === category.toLowerCase()
        );

        if (householditems.length === 0) {
            return res.status(404).json({ message: "No items found in this category" });
        }

        res.status(200).json(householditems);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const createHouseHoldItem = async (req, res) => {
    try {
        const items = readItems();
        
        // Generate new ID
        const newId = items.length > 0 
            ? Math.max(...items.map(item => item.id)) + 1 
            : 1;
        
        // Create new item
        const newhouseholditem = {
            id: newId,
            ...req.body
        };
        
        // Add to array
        items.push(newhouseholditem);
        
        // Save to file
        writeItems(items);
        
        res.status(201).json(newhouseholditem);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
};

export const updateHouseHoldItem = async (req, res) => {
    try {
        const items = readItems();
        const index = items.findIndex(item => item.id === parseInt(req.params.id));
        
        if (index === -1) return res.status(404).json({message: "Item Not Found"});
        
        // Update item
        items[index] = {
            ...items[index],
            ...req.body,
            id: items[index].id // Keep original ID
        };
        
        // Save to file
        writeItems(items);
        
        res.json(items[index]);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
};

export const deleteHouseHoldItem = async (req, res) => {
    try {
        const items = readItems();
        const index = items.findIndex(item => item.id === parseInt(req.params.id));
        
        if (index === -1) return res.status(404).json({message: "Item Not Found"});
        
        // Remove item
        const deletedItem = items.splice(index, 1)[0];
        
        // Save to file
        writeItems(items);
        
        res.json({message: "Item destroyed", item: deletedItem});
    } catch (error) {
        res.status(400).json({error: error.message});
    }
};
*/
