import { InlinePolicy } from './InlinePolicy';
import { it, expect } from 'vitest';

it('should have a default Version of "2012-10-17"', () => {
    const policy = new InlinePolicy([]);
    expect(policy.Version).toBe('2012-10-17');
});