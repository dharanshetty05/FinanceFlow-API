import * as dashboardService from '../services/dashboard.service.js';

export const getSummary = async (req, res, next) => {
    try {
        const data = await dashboardService.getSummary();
        res.json({
            success: true,
            data
        });
    } catch (err) {
        next(err);
    }
};

export const getCategoryBreakdown = async (req, res, next) => {
    try{
        const data = await dashboardService.getCategoryBreakdown();
        res.json({
            success: true,
            data
        });
    } catch (err) {
        next(err);
    }
};

export const getTrends = async (req, res, next) => {
    try {
        const raw = await dashboardService.getTrends();
        const formatted = {};

        raw.forEach(item => {
            const key = `${item._id.year}-${item._id.month}`;
            if (!formatted[key]) {
                formatted[key] = { income: 0, expense: 0 };
            }
            formatted[key][item._id.type] = item.total;
        });

        const result = Object.entries(formatted).map(([period, value]) => ({
            period,
            ...value
        }));
        
        res.json({
            success: true,
            data: result
        });
    } catch (err) {
        next(err);
    }
};

export const getRecent = async (req, res, next) => {
    try {
        const data = await dashboardService.getRecent();

        res.json({
            success: true,
            data
        });
    } catch (err) {
        next(err);
    }
};