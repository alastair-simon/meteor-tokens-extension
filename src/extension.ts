import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext) {
  const provider = vscode.languages.registerCompletionItemProvider(
    { pattern: "**/*.vue" },
    {
      provideCompletionItems(
        document: vscode.TextDocument,
        position: vscode.Position
      ) {
        const linePrefix = document
          .lineAt(position)
          .text.slice(0, position.character);
        console.log("Current line prefix:", linePrefix);

        if (linePrefix.trim() === "font:" || linePrefix.includes("font:")) {
          const suggestion = new vscode.CompletionItem(
            "var(--brand-text-sm)",
            vscode.CompletionItemKind.Variable
          );
          suggestion.detail = "Brand Text Small";
          suggestion.sortText = "0";
          suggestion.insertText = " var(--brand-text-sm)";
          return [suggestion];
        }

        return undefined;
      },
    },
    " " // Trigger on space after colon
  );

  context.subscriptions.push(provider);
}
