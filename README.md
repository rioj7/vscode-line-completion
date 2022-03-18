# Line Completion

Suggest a line that starts the same as the current line. 

* the starting whitespace is ignored
* the comparison is case insensitive (lowercase compare)
* configure for which files it provides a suggestion
* configure how many characters it should match minimally

## Configuration

The extension has the following settings:

* `line-completion.documentSelector` : An array of [DocumentFilter](https://code.visualstudio.com/api/references/vscode-api#DocumentFilter) objects. It determines for which files a suggestion is provided.  
Default:  
`[{ "language": "plaintext", "scheme": "file" }]`  
In the documentation you can find a list of [language identifiers](https://code.visualstudio.com/docs/languages/identifiers). There are more language identifiers if you have additional language extensions installed.
* `line-completion.minimalCharacterCount` : How many characters to type before a completion suggestion is made. (default: `3`)

If you change any setting you have to restart VSCode. This can be done with the command **Developer: Reload Window**

## TODO

* configure workspace relative selector
