import User from 'models/user.model';
import { ISemester } from 'types/semester';
import { USER_ROLE } from 'types/user';

export const findLastStudentId = async (): Promise<string | undefined> => {
    const lastStudent = await User.findOne({ role: USER_ROLE.STUDENT }, { id: 1, _id: 0 })
        .sort({
            createdAt: -1,
        })
        .lean();

    return lastStudent?.id ? lastStudent.id.substring(4) : undefined;
};

export const findLastFacultyId = async (): Promise<string | undefined> => {
    const lastFaculty = await User.findOne({ role: USER_ROLE.FACULTY }, { id: 1, _id: 0 })
        .sort({
            createdAt: -1,
        })
        .lean();

    return lastFaculty?.id ? lastFaculty.id.substring(2) : undefined;
};

export const findLastAdminId = async (): Promise<string | undefined> => {
    const lastFaculty = await User.findOne({ role: USER_ROLE.ADMIN }, { id: 1, _id: 0 })
        .sort({
            createdAt: -1,
        })
        .lean();

    return lastFaculty?.id ? lastFaculty.id.substring(2) : undefined;
};

export const generateStudentId = async (semester: ISemester | null): Promise<string> => {
    const currentId = (await findLastStudentId()) || (0).toString().padStart(5, '0');

    let incrementedId = (parseInt(currentId, 10) + 1).toString().padStart(5, '0');

    incrementedId = `${semester?.year}${semester?.code}${incrementedId}`;

    return incrementedId;
};

export const generateFacultyId = async (): Promise<string> => {
    const currentId = (await findLastFacultyId()) || (0).toString().padStart(5, '0');

    let incrementedId = (parseInt(currentId, 10) + 1).toString().padStart(5, '0');

    incrementedId = `F-${incrementedId}`;

    return incrementedId;
};

export const generateAdminId = async (): Promise<string> => {
    const currentId = (await findLastAdminId()) || (0).toString().padStart(5, '0');

    let incrementedId = (parseInt(currentId, 10) + 1).toString().padStart(5, '0');

    incrementedId = `A-${incrementedId}`;

    return incrementedId;
};
