export default Student;

declare class Student {
  id: number | null;
  name: string;
  age: number;
  readonly version: string;

  constructor(id: number | null, name: string, age: number);
  constructor(name: string, age: number);
  constructor(student: Student.StudentInfo, opts?: Options);

  save(): Student.StudentInfo & Student.StudentAutoInfo;
  update(data: Partial<Student.StudentInfo>): boolean;
  delete(): boolean;

  static updateAll(where: Partial<Student.StudentInfo & Student.StudentAutoInfo>, data: Partial<Student.StudentInfo>): boolean;
  static getAll(where: Partial<Student.StudentInfo & Student.StudentAutoInfo>): Record<number, Student.StudentInfo & Student.StudentAutoInfo>;
  static fn: Student.Fn;
}

declare namespace Student {
  interface StudentInfo {
    id?: number | null;
    name: string;
    age: number;
  }
  interface StudentAutoInfo {
    createdAt: number;
  }
  type Lang = 'CN' | 'TW' | 'EN';
  interface Options {
    lang: Lang;
    version: string;
  }
  interface Fn {
    getAgeLabel(age: number): string;
  }
}
