import {
    EVENT_SEMESTER_CREATED,
    EVENT_SEMESTER_DELETED,
    EVENT_SEMESTER_UPDATED,
} from 'constants/semester';
import {
    createSemesterFromEvent,
    deleteSemesterFromEvent,
    updateSemesterFromEvent,
} from 'services/semester.service';
import { ISemesterEvents } from 'types/semester';
import { RedisClient } from 'utils/redis';

const initSemesterEvents = () => {
    RedisClient.subscribe(EVENT_SEMESTER_CREATED, async (event: string) => {
        const data: ISemesterEvents = JSON.parse(event);

        await createSemesterFromEvent(data);
    });

    RedisClient.subscribe(EVENT_SEMESTER_UPDATED, async (event: string) => {
        const data: ISemesterEvents = JSON.parse(event);

        await updateSemesterFromEvent(data);
    });

    RedisClient.subscribe(EVENT_SEMESTER_DELETED, async (event: string) => {
        const data: ISemesterEvents = JSON.parse(event);

        await deleteSemesterFromEvent(data.id);
    });
};

export default initSemesterEvents;
