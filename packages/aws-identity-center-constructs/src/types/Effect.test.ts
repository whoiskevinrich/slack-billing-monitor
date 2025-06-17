import { expect, it } from 'vitest';
import { Effect } from './Effect';

it('should have Allow as a value', () => {
    expect(Effect.Allow).toBe('Allow');
});

it('should have Deny as a value', () => {
    expect(Effect.Deny).toBe('Deny');
});