import {Entity} from 'typeorm'
import {IdAndName} from "./singular";


@Entity()
export class Permission extends IdAndName({primaryColumnType: 'tinyint'}) {

}