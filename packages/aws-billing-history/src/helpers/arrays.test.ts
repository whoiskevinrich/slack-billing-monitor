import { expect, it } from "vitest";
import { groupBy } from "./arrays";

it('should group by key', () => {
    const data = [
        { service: 'EC2', cost: 10, date: '2020-01-01' },
        { service: 'EC2', cost: 20, date: '2020-01-02' },
        { service: 'S3', cost: 30, date: '2020-01-01' },
        { service: 'S3', cost: 40, date: '2020-01-02' }
    ];
    const result = groupBy(data, (item) => item.service);
    expect(result).toEqual({
        EC2: [
            { service: 'EC2', cost: 10, date: '2020-01-01' },
            { service: 'EC2', cost: 20, date: '2020-01-02' }
        ],
        S3: [
            { service: 'S3', cost: 30, date: '2020-01-01' },
            { service: 'S3', cost: 40, date: '2020-01-02' }
        ]
    });
});