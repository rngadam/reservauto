const { haversineDistance } = require('../utils');

describe('haversineDistance', () => {
    it('should return 0 for the same point', () => {
        expect(haversineDistance(0, 0, 0, 0)).toBe(0);
    });

    it('should calculate the distance between two points correctly', () => {
        const lat1 = 46.8139; // Quebec City
        const lon1 = -71.2080;
        const lat2 = 45.5017; // Montreal
        const lon2 = -73.5673;
        const distance = haversineDistance(lat1, lon1, lat2, lon2);
        expect(distance).toBeCloseTo(233028, -3);
    });
});
