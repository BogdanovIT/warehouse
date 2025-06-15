export interface Progress {
    progressPercent: number
    tariffLessonsCount: number
    userViewedLessonCount: number

}

export type Tariff = {
    id: number
    name: string
    price: number
    type: TariffType
    oldPrice?: number
    creditPrice?: number
    lengthMonth: number
    courseId: number
    createdAt: string
    videoUuid: string
}

export type StudentCourseDescription = {
    id: number
    shortTitle: string
    image: string
    title: string
    alias: string
    length: number
    avgRating: number
    price: number
    courseOnDirection: {direction: Record<'name', string>}[]
    tariffs: Tariff[]
    progress: Progress
}

export enum TariffType {
    free = 'free',
    basic = 'basic',
    mentor = 'mentor',
    project = 'project',

}