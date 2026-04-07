import Record from '../models/record.model.js';

export const createRecord = async (data, userId) => {
    return await Record.create({ ...data, createdBy: userId });
};

export const getRecords = async (query, userId) => {
    const {
        type,
        category,
        startDate,
        endDate,
        page = 1,
        limit = 10
    } = query;

    const filter = {
        createdBy: userId
    };

    if (type) filter.type = type;
    if (category) filter.category = category;

    if (startDate || endDate) {
        filter.date = {};
        if (startDate) filter.date.$gte = new Date(startDate);
        if (endDate) filter.date.$lte = new Date(endDate);
    }

    const skip = (page - 1) * limit;

    const records = await Record.find(filter)
        .sort({ date: -1 })
        .skip(skip)
        .limit(Number(limit));

    const total = await Record.countDocuments(filter);

    return {
        records,
        total,
        page: Number(page),
        pages: Math.ceil(total / limit)
    };
};

export const getRecordById = async (id, userId) => {
    return await Record.findOne({ _id: id, createdBy: userId });
};

export const updateRecord = async (id, data, userId) => {
    return await Record.findOneAndUpdate(
        { _id: id, createdBy: userId },
        data,
        { new: true }
    );
};

export const deleteRecord = async (id, userId) => {
    return await Record.findOneAndDelete({
        _id: id,
        createdBy: userId
    });
};