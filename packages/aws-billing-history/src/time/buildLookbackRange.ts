
export function buildLookbackRange(lookbackDays: number = 7): Date[] {
    var dates: Date[] = [];
    for (let i = lookbackDays; i > 0; i--) {
        const itemDate = new Date();
        itemDate.setDate(itemDate.getDate() - i);
        dates.push(itemDate);
    }

    return dates;
}
