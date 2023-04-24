import { GenericObject } from "../models/generic-object.model";

export class Utils {
    public static distinct<T>(array: T[]): T[] {
        return Array.from(new Set(array));
    }

    public static concatUnique<T>(arrayA: T[], arrayB: T[]): T[] {
        return Utils.distinct(arrayA.concat(arrayB));
    }

    public static mergeGenericObjects(mapA?: GenericObject<string[]>, mapB?: GenericObject<string[]>): GenericObject<string[]> {
        if (!mapA && !!mapB) {
            return mapB;
        } else if (!mapB && !!mapA) {
            return mapA;
        } else if (!!mapA && !!mapB) {
            const keys: string[] = Utils.concatUnique(Object.keys(mapA), Object.keys(mapB));

            return keys
                .map(key => ({ [key]: Utils.concatUnique(mapA[key] || [], mapB[key] || []) }))
                .reduce((a, b) => Object.assign({}, a, b), {});
        }

        return {};
    }
}