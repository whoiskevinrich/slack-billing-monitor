import jestConfig from './jest.config';

const integrationConfig = {
    ...jestConfig,
    testMatch: ['**/*.integration.test.ts']
}

export default integrationConfig