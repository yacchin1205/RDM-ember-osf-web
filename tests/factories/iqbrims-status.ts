import FactoryGuy from 'ember-data-factory-guy';
import faker from 'faker';

FactoryGuy.define('iqbrims-status', {
    default: {
        isAdmin: () => faker.random.boolean(),
        state: () => faker.random.arrayElement([
            'initialized',
            'deposit',
            'check',
        ]),
        isDirectlySubmitData: () => faker.random.boolean(),
        laboList: faker.random.arrayElement([
            'aaa:AAA',
            'bbb:BBB',
            'ccc:CCC',
        ]),
    },
});
