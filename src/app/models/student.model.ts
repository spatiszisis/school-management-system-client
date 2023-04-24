import { Grade } from "./grade.model";
import { Level } from "./level.model";

export class Student {
    studentId: number;
    firstName: string;
    lastName: string;
    email: string;
    age: number;
    phone: number;
    level: Level;
    grades: Grade[];

    deserialize(input: any): this {
        return Object.assign(this, input);
    }
}