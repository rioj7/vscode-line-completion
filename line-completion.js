const vscode = require('vscode');

function activate(context) {

  let configuration = vscode.workspace.getConfiguration('line-completion', null);
  let documentSelector = configuration.get('documentSelector');
  let minimalCharacterCount = Math.max(configuration.get('minimalCharacterCount'), 1);

  context.subscriptions.push(vscode.languages.registerCompletionItemProvider(
    documentSelector,
    {
      /** @param {vscode.TextDocument} document @param {vscode.Position} position */
      provideCompletionItems(document, position) {
        const linePrefix = document.lineAt(position).text.substring(0, position.character).trimStart().toLowerCase();
        if (linePrefix.length < minimalCharacterCount) { return undefined; }
        const range = new vscode.Range(position.line, position.character - linePrefix.length, position.line, position.character);
        let result = [];
        let lineCount = document.lineCount;
        let currentLine = position.line;
        loopLine:
        for (let lineIdx = 0; lineIdx < lineCount; lineIdx++) {
          if (lineIdx === currentLine) { continue; }
          const line = document.lineAt(lineIdx).text.trimStart();
          if (!line.toLowerCase().startsWith(linePrefix)) { continue; }
          for (const item of result) {
            if (item.label === line) { continue loopLine; }
          }
          let item = new vscode.CompletionItem(line, vscode.CompletionItemKind.Text);
          item.range = range;
          result.push(item);
        }
        return result;
      }
    }
  ));
}

function deactivate() {
}

module.exports = {
  activate,
  deactivate
}
