import { Observable, of } from "rxjs"

export const handleError = <T>(operation = 'operation', results?: T) => {
    return (error: any): Observable<T> => {
        console.error(error)
        return of(results as T)
    }
}