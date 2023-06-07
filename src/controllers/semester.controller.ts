import { RequestHandler } from 'express';
import { createSemester } from 'services/semester.service';

// eslint-disable-next-line import/prefer-default-export
export const newSemester: RequestHandler = async (req, res, next) => {
    try {
        const { ...semesterData } = req.body;
        const result = await createSemester(semesterData);
        res.status(200).json({
            success: true,
            message: 'Semester is created successfully!',
            data: result,
        });
    } catch (error) {
        next(error);
    }
};
