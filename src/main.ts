import * as glob from "glob";
import {ReExportBuilder} from "./re-export-builder";

export function build({ files, onFinish }: { files: string; onFinish: (reExportFiles?: string[]) => void }) {
    glob(files, (err, matches) => {
        ReExportBuilder.createReExportFiles(matches, onFinish);
    });
}
