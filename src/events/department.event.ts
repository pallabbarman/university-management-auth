import {
    EVENT_DEPARTMENT_CREATED,
    EVENT_DEPARTMENT_DELETED,
    EVENT_DEPARTMENT_UPDATED,
} from 'constants/department';
import {
    createDepartmentFromEvent,
    deleteDepartmentFromEvent,
    updateDepartmentFromEvent,
} from 'services/department.service';
import {
    DepartmentCreatedEvent,
    DepartmentDeletedEvent,
    DepartmentUpdatedEvent,
} from 'types/department';
import { RedisClient } from 'utils/redis';

const initDepartmentEvents = () => {
    RedisClient.subscribe(EVENT_DEPARTMENT_CREATED, async (e: string) => {
        const data: DepartmentCreatedEvent = JSON.parse(e);

        await createDepartmentFromEvent(data);
    });

    RedisClient.subscribe(EVENT_DEPARTMENT_UPDATED, async (e: string) => {
        const data: DepartmentUpdatedEvent = JSON.parse(e);

        await updateDepartmentFromEvent(data);
    });

    RedisClient.subscribe(EVENT_DEPARTMENT_DELETED, async (e: string) => {
        const data: DepartmentDeletedEvent = JSON.parse(e);

        await deleteDepartmentFromEvent(data.id);
    });
};

export default initDepartmentEvents;
