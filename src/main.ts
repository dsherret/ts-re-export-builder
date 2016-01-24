import * as glob from "glob";
import {ReExportBuilder} from "./re-export-builder";

interface Options {
    files: string;
}

export function build({files}: Options) {
    glob(files, (err, matches) => {
        if (err) {
            throw err;
        }

        ReExportBuilder.createReExportFiles(matches);
    });
}
