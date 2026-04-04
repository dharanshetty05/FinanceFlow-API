import Record from "../models/record.model.js"

export const getSummary = async () => {
    const result =await Record.aggregate([
        {
            $group: {
                _id: '$type',
                total: { $sum: '$amount' }
            }
        }
    ]);

    let totalIncome = 0;
    let totalExpense = 0;

    result.forEach(item => {
        if (item._id === 'income') totalIncome = item.total;
        if (item._id === 'expense') totalExpense = item.total;
    });

    return {
        totalIncome,
        totalExpense,
        netBalance: totalIncome - totalExpense
    };
};

export const getCategoryBreakdown = async () => {
    return await Record.aggregate([
        {
        $match: { type: 'expense' }
        },
        {
        $group: {
            _id: '$category',
            total: { $sum: '$amount' }
        }
        },
        {
        $project: {
            category: '$_id',
            total: 1,
            _id: 0
        }
        }
    ]);
};

export const getTrends = async () => {
    return await Record.aggregate([
        {
        $group: {
            _id: {
            year: { $year: '$date' },
            month: { $month: '$date' },
            type: '$type'
            },
            total: { $sum: '$amount' }
        }
        }
    ]);
};

export const getRecent = async () => {
    return await Record.find()
        .sort({ createdAt: -1 })
        .limit(5)
        .select('amount type category date');
};