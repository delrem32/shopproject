import { HttpClient } from "@angular/common/http";
import { Injectable, OnDestroy } from "@angular/core";
import { combineLatest, of, Subject, bindCallback, Observable } from "rxjs";
import { flatMap, pluck, share, take, tap } from "rxjs/operators";

const pluckOnLoadResult = pluck("target", "result");

@Injectable({
    providedIn: "root",
})
export class FilesService {
    postImage(photo: Blob) {
        return combineLatest([of(new FormData()), of(photo)])
            .pipe(tap(([form, data]) => form.append("file", data)))
            .pipe(pluck("0"))
            .pipe(
                flatMap((form) =>
                    this.http.post("http://localhost:5000/files", form)
                )
            )
            .pipe(share());
    }
    fetchImag(id: string) {
        return this.http
            .get(`http://localhost:5000/files/${id}`, { responseType: "blob" })
            .pipe(share());
    }
    removeImage(id: string) {
        return this.http
            .delete(`http://localhost:5000/files/${id}`)
            .pipe(share());
    }

    constructor(private http: HttpClient) {}

    readAs(
        formatMethod:
            | "readAsArrayBuffer"
            | "readAsBinaryString"
            | "readAsDataURL"
            | "readAsText",
        file: Blob
    ): Observable<string> {
        const dataURLSubject = new Subject<ProgressEvent>();
        const reader = new FileReader();
        reader.onload = (event: any) => dataURLSubject.next(event);
        reader[formatMethod](file);
        return dataURLSubject
            .asObservable()
            .pipe(pluckOnLoadResult) as Observable<string>;
    }

    readAsDataURL = (file: Blob): Observable<string> => {
        return this.readAs("readAsDataURL", file);
    };

    readAsArrayBuffer(file: Blob): Observable<any> {
        return this.readAs("readAsArrayBuffer", file);
    }
}
