import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
} from 'typeorm';
import {PrimaryGeneratedColumnType} from 'typeorm/driver/types/ColumnTypes';

export function IdAndName(options?: {
    primaryColumnType?: PrimaryGeneratedColumnType;
    useUUID?: boolean
}) {
    const generatedColumn = options?.useUUID ? 'uuid' : {type: options?.primaryColumnType ?? 'integer', unsigned: true};

    @Entity()
    class IdAndName {
        // @ts-ignore
        @PrimaryGeneratedColumn(generatedColumn)
        id: number;

        @Column({type: 'varchar', length: 512, nullable: false})
        name: string;
    }

    return IdAndName;
}
