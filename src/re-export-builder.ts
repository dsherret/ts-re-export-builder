import {ensureIsReExportFile} from "./ensure-is-re-export-file";
import * as path from "path";
import * as fs from "fs";
import {groupBy, toForwardSlashes} from "./utils";

export class ReExportBuilder {
    private directoryGroups: { directory: string; files: string[] }[];
    private reExportFilePaths: string[] = [];
    private finishedCount: number = 0;

    // make private once typescript supports it
    constructor(globMatches: string[], private onFinish?: (reExportFilePaths?: string[]) => void) {
        this.setGlobMatchesToDirectoryGroups(globMatches);

        this.directoryGroups.forEach((group) => {
            this.handleFolderWithFiles(group.directory, group.files);
        });
    }

    static createReExportFiles(globMatches: string[], onFinish?: (reExportFilePaths?: string[]) => void) {
        return new ReExportBuilder(globMatches, onFinish);
    }

    private setGlobMatchesToDirectoryGroups(globMatches: string[]) {
        let groups = groupBy(globMatches, (item) => path.dirname(item));
        this.directoryGroups = groups.map(g => { return { directory: g.key, files: g.values }; })
            .sort((a, b) => b.directory.length - a.directory.length); // length descending

        // since it is sorted in length descending, the last item in the array will be the main directory.
        // remove it since it's not necessary
        this.directoryGroups.pop();
    }

    private handleFolderWithFiles(folderName: string, files: string[]) {
        const reExportFilePath = toForwardSlashes(path.join(folderName, "..", path.basename(folderName) + ".ts"));
        this.reExportFilePaths.push(reExportFilePath);

        fs.readFile(reExportFilePath, "utf8", (err, data) => {
            this.handleFileWithData({
                reExportFilePath: reExportFilePath,
                data: data,
                files: files
            });
        });
    }

    private handleFileWithData(obj: { reExportFilePath: string; data: string; files: string[]; }) {
        if (ensureIsReExportFile(obj.data)) {
            this.writeReExportFile(obj);
            this.addReExportFileToDirectoryGroups(obj.reExportFilePath);
        }
        else {
            console.warn(`Skipping "${obj.reExportFilePath}". The file did not only contain export statements.`);
        }
    }

    private writeReExportFile({ reExportFilePath, files }: { reExportFilePath: string; files: string[]; }) {
        fs.writeFile(reExportFilePath, this.getFileTextFromFiles(files), (err) => {
            this.onFileFinished();
        });
    }

    private getFileTextFromFiles(fileNames: string[]) {
        return fileNames.map(name => `export * from "./${path.basename(path.dirname(name)) + "/" + path.parse(name).name}";`).join("\n") + "\n";
    }

    private addReExportFileToDirectoryGroups(reExportFilePath: string) {
        const baseGroup = path.dirname(reExportFilePath);
        const baseGroupIndex = this.directoryGroups.map(g => g.directory).indexOf(baseGroup);

        if (baseGroupIndex >= 0) {
            this.directoryGroups[baseGroupIndex].files.push(reExportFilePath);
        }
    }

    private onFileFinished() {
        this.finishedCount++;

        if (this.finishedCount === this.directoryGroups.length && typeof this.onFinish === "function") {
            this.onFinish(this.reExportFilePaths);
        }
    }
}
