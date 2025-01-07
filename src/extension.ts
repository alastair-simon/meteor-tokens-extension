import * as vscode from "vscode";

const FONT_TOKENS = [
  "var(--brand-text-sm)",
  "var(--brand-text-md)",
  "var(--brand-text-lg)",
  "var(--brand-text-xl)",
];

export function activate(context: vscode.ExtensionContext) {
  // This will handle both property and value suggestions
  const provider = vscode.languages.registerCompletionItemProvider(
    [
      { scheme: "file", language: "vue" },
      { scheme: "file", language: "css" },
    ],
    {
      provideCompletionItems(
        document: vscode.TextDocument,
        position: vscode.Position
      ) {
        const lineText = document.lineAt(position).text;

        if (lineText.includes("font:")) {
          return new vscode.CompletionList(
            FONT_TOKENS.map((token) => {
              const suggestion = new vscode.CompletionItem(
                token,
                vscode.CompletionItemKind.Constant
              );
              suggestion.preselect = true;
              suggestion.sortText = "!";
              return suggestion;
            }),
            true
          );
        }

        return undefined;
      },
    },
    " "
  );

  context.subscriptions.push(provider);
}
