import * as recordService from '../services/record.service.js';

export const createRecord = async (req, res, next) => {
    try {
        const record = await recordService.createRecord(req.body, req.user.id);
        res.status(201).json({
        success: true,
        data: record
        });
    } catch (err) {
        next(err);
    }
};

export const getRecords = async (req, res, next) => {
    try {
        const result = await recordService.getRecords(req.query, req.user.id);
        res.json({
        success: true,
        data: result
        });
    } catch (err) {
        next(err);
    }
};

export const getRecord = async (req, res, next) => {
    try {
        const record = await recordService.getRecordById(
            req.params.id,
            req.user.id
        );
        if (!record) {
        return res.status(404).json({ success: false, message: 'Not found' });
        }
        res.json({ success: true, data: record });
    } catch (err) {
        next(err);
    }
};

export const updateRecord = async (req, res, next) => {
    try {
        const record = await recordService.updateRecord(req.params.id, req.body, req.user.id);

        if (!record) {
            return res.status(404).json({
                success: false,
                message: 'Record not found'
            });
        }

        res.json({ success: true, data: record });
    } catch (err) {
        next(err);
    }
};

export const deleteRecord = async (req, res, next) => {
    try {
        const record = await recordService.deleteRecord(req.params.id, req.user.id);

        if (!record) {
            return res.status(404).json({
                success: false,
                message: 'Record not found'
            });
        }

        res.json({ success: true, message: 'Deleted successfully' });
    } catch (err) {
        next(err);
    }
};