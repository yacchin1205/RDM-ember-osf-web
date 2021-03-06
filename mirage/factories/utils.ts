import { faker, ModelInstance, Server } from 'ember-cli-mirage';
import SeedRandom from 'seedrandom';

import { GUID_ALPHABET } from 'ember-osf-web/const/guid-alphabet';
import { AbstractQuestion, Answer, RegistrationMetadata, Schema } from 'ember-osf-web/models/registration-schema';

export function guid(referentType: string) {
    return (id: number) => {
        // Generate a pseudo-random guid
        const prng = new SeedRandom(`${referentType}-${id}`);

        const newGuid = Array.from(
            { length: 5 },
            () => GUID_ALPHABET[Math.floor(prng() * GUID_ALPHABET.length)],
        ).join('');

        return newGuid;
    };
}

export function guidAfterCreate(newObj: ModelInstance, server: Server) {
    server.schema.guids.create({
        id: newObj.id,
        referentType: newObj.modelName,
    });
}

function fakeAnswer(question: AbstractQuestion, answerIfRequired: boolean): Answer<any> {
    const answer: Answer<any> = {
        comments: [],
        extra: [],
        value: '',
    };
    if ((answerIfRequired && question.required) || faker.random.boolean()) {
        if (question.type === 'osf-upload') {
            const numFiles = faker.random.number({ min: 1, max: 5 });
            answer.extra = Array.from({ length: numFiles }).map(() => ({
                selectedFileName: faker.system.commonFileName(
                    faker.system.commonFileExt(),
                    faker.system.commonFileType(),
                ),
                viewUrl: '/',
            }));
            answer.value = (answer.extra[0] as any).selectedFileName;
        } else {
            answer.value = faker.lorem.sentences(faker.random.number({ min: 1, max: 10 }));
        }
    }
    return answer;
}

/**
 * Create registration metadata with a random number of questions answered.
 *
 * @param {Schema} schema - The schema to generate metadata for.
 * @param {boolean} answerAllRequired - Whether to ensure all required questions are answered.
 * @return {RegistrationMetadata}
 */
export function createRegistrationMetadata(schema: Schema, answerAllRequired = false) {
    const registrationMetadata: RegistrationMetadata = {};
    schema.pages.forEach(page =>
        page.questions.forEach(question => {
            if (question.type === 'object' && question.properties) {
                const value: RegistrationMetadata = { };
                question.properties.forEach(property => {
                    value[property.id] = fakeAnswer(property, answerAllRequired);
                });
                registrationMetadata[question.qid] = {
                    comments: [],
                    extra: [],
                    value,
                };
            } else {
                registrationMetadata[question.qid] = fakeAnswer(question, answerAllRequired);
            }
        }));
    return registrationMetadata;
}
