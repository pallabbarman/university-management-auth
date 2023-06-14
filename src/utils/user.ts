import User from 'models/user.model';
import { ISemester } from 'types/semester';
import { USER_ROLE } from 'types/user';

export const findLastUserId = async () => {
    const lastUser = await User.findOne({}, { id: 1, _id: 0 })
        .sort({
            createdAt: -1,
        })
        .lean();

    return lastUser?.id;
};

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

export const generateUserId = async () => {
    const currentId = (await findLastUserId()) || (0).toString().padStart(5, '0');

    const incrementedId = (parseInt(currentId, 10) + 1).toString().padStart(5, '0');

    return incrementedId;
};

export const generateStudentId = async (semester: ISemester): Promise<string> => {
    const currentId = (await findLastStudentId()) || (0).toString().padStart(5, '0');

    let incrementedId = (parseInt(currentId, 10) + 1).toString().padStart(5, '0');

    incrementedId = `${semester.year.substring(2)}${semester.code}${incrementedId}`;

    return incrementedId;
};

export const generateFacultyId = async (): Promise<string> => {
    const currentId = (await findLastFacultyId()) || (0).toString().padStart(5, '0');

    let incrementedId = (parseInt(currentId, 10) + 1).toString().padStart(5, '0');

    incrementedId = `F-${incrementedId}`;

    return incrementedId;
};
