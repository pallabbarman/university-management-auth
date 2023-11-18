import {
    EVENT_ACADEMIC_FACULTY_CREATED,
    EVENT_ACADEMIC_FACULTY_DELETED,
    EVENT_ACADEMIC_FACULTY_UPDATED,
} from 'constants/academicFaculty';
import {
    createAcademicFacultyFromEvent,
    deleteAcademicFacultyFromEvent,
    updateAcademicFacultyFromEvent,
} from 'services/academicFaculty.service';
import {
    AcademicFacultyCreatedEvent,
    AcademicFacultyDeletedEvent,
    AcademicFacultyUpdatedEvent,
} from 'types/academicFaculty';
import { RedisClient } from 'utils/redis';

const initAcademicFacultyEvents = () => {
    RedisClient.subscribe(EVENT_ACADEMIC_FACULTY_CREATED, async (e: string) => {
        const data: AcademicFacultyCreatedEvent = JSON.parse(e);

        await createAcademicFacultyFromEvent(data);
    });

    RedisClient.subscribe(EVENT_ACADEMIC_FACULTY_UPDATED, async (e: string) => {
        const data: AcademicFacultyUpdatedEvent = JSON.parse(e);

        await updateAcademicFacultyFromEvent(data);
    });

    RedisClient.subscribe(EVENT_ACADEMIC_FACULTY_DELETED, async (e: string) => {
        const data: AcademicFacultyDeletedEvent = JSON.parse(e);

        await deleteAcademicFacultyFromEvent(data.id);
    });
};

export default initAcademicFacultyEvents;
