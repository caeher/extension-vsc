// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
    // The command has been defined in the package.json file
    // Now provide the implementation of the command with registerCommand
    // The commandId parameter must match the command field in package.json
    const disposable = vscode.commands.registerCommand(
        "extension.gapline",
        () => {
            const editor = vscode.window.activeTextEditor;
            if (!editor) return;

            const selection = editor.selection;
            let text = editor.document.getText(selection);
            vscode.window.showInputBox({ prompt: "Lineas?" }).then((value) => {
                let numberOfLines = +value;
                var textInChunks: Array<string> = [];
                text.split("\n").forEach((currentLine: string, lineIndex) => {
                    textInChunks.push(currentLine);
                    if ((lineIndex + 1) % numberOfLines === 0)
                        textInChunks.push("");
                });
                text = textInChunks.join("\n");
                editor.edit((editBuilder) => {
                    var range = new vscode.Range(
                        selection.start.line,
                        0,
                        selection.end.line,
                        editor.document.lineAt(selection.end.line).text.length
                    );
                    editBuilder.replace(range, text);
                });
            });
        }
    );

    context.subscriptions.push(disposable);
}

