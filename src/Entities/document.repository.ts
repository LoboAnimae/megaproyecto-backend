import {Injectable, InternalServerErrorException} from "@nestjs/common";
import {DataSource, FindOneOptions, Repository} from "typeorm";
import {Document} from "./document.entity";

@Injectable()
export class DocumentRepository extends Repository<Document> {
    constructor(private dataSource: DataSource) {
        super(Document, dataSource.createEntityManager());
    }

    #findOne(searchObject: FindOneOptions<Document>): Promise<Document | null> {
        return this.dataSource.getRepository(Document).findOne(searchObject);
    }

    findOneByUUID(documentUUID: string, options?: FindOneOptions<Document>) {
        return this.#findOne({...options, where: {uuid: documentUUID}})
    }

    async deleteModel(document: { model?: Document, uuid?: string }) {
        const {model, uuid} = document;
        let documentModel;
        if (model) documentModel = model;
        else if (uuid) documentModel = await this.findOneByUUID(uuid);
        else throw new InternalServerErrorException()
        await this.remove(documentModel)
    }
}