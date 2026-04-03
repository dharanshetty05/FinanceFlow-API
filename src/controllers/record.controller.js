import * as recordService from '../services/record.service.js';

export const createRecord = async (req, res) => {
    try {
        const record = await recordService.createRecord(req.body, req.user.id);

        res.status(201).json({
        success: true,
        data: record
        });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

export const getRecords = async (req, res) => {
    try {
        const result = await recordService.getRecords(req.query);

        res.json({
        success: true,
        data: result
        });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

export const getRecord = async (req, res) => {
    try {
        const record = await recordService.getRecordById(req.params.id);

        if (!record) {
        return res.status(404).json({ success: false, message: 'Not found' });
        }

        res.json({ success: true, data: record });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

export const updateRecord = async (req, res) => {
    try {
        const record = await recordService.updateRecord(req.params.id, req.body);

        res.json({ success: true, data: record });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

export const deleteRecord = async (req, res) => {
    try {
        await recordService.deleteRecord(req.params.id);

        res.json({ success: true, message: 'Deleted successfully' });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};