window.CHALLENGE_DATA = {
  challenges: [
    {
      id: "arrays",
      intro:
        "Inside <code class='w3-codespan'>main()</code>, complete the following steps:" +
        "<ol style='margin:8px 0 0 18px;padding:0'>" +
        "<li style='margin-top:8px'>Declare an <code class='w3-codespan'>int</code> array named <code class='w3-codespan'>numbers</code> with 5 elements</li>" +
        "<li style='margin-top:8px'>Set the first element (<code class='w3-codespan'>numbers[0]</code>) to <code class='w3-codespan'>10</code></li>" +
        "<li style='margin-top:8px'>Set the last element (<code class='w3-codespan'>numbers[4]</code>) to <code class='w3-codespan'>50</code></li>" +
        "<li style='margin-top:8px'>Print the first and last element using <code class='w3-codespan'>printf</code></li>" +
        "</ol>",

      starter:
        "#include <stdio.h>\n\n" +
        "int main() {\n" +
        "  // 1) Declare an int array named numbers with 5 elements\n\n" +
        "  // 2) Set numbers[0] to 10\n" +
        "  // 3) Set numbers[4] to 50\n\n" +
        "  // 4) Print numbers[0]\n" +
        "  // 5) Print numbers[4]\n\n" +
        "  return 0;\n" +
        "}\n",

      solution:
        "#include <stdio.h>\n\nint main() {\n  int numbers[5];\n\n  numbers[0] = 10;\n  numbers[4] = 50;\n\n  printf(\"%d\\n\", numbers[0]);\n  printf(\"%d\\n\", numbers[4]);\n\n  return 0;\n}\n",

      requirements: [
        {
          type: "regex",
          id: "hasInclude",
          label: "Include <code class='w3-codespan'>stdio.h</code>",
          pattern: "^\\s*#\\s*include\\s*<\\s*stdio\\.h\\s*>",
          flags: "m",
          linePattern: "^\\s*#\\s*include\\s*<\\s*stdio\\.h\\s*>\\s*(?:(//.*)?)\\s*$",
          lineFlags: "m"
        },

        {
          type: "regex",
          id: "hasMain",
          label: "Have <code class='w3-codespan'>int main()</code>",
          pattern: "\\bint\\s+main\\s*\\(\\s*(?:void\\s*)?\\)\\s*\\{",
          flags: ""
        },

        // Examples:
        // int numbers[5];
        // int numbers[5] = {10,0,0,0,50};
        // int numbers[5] = {10};  (and later numbers[4] = 50;)
        {
          type: "regex",
          id: "declArray",
          label: "Declare: <code class='w3-codespan'>int numbers[5];</code>",
          pattern:
            "\\bint\\s+numbers\\s*\\[\\s*5\\s*\\]\\s*(?:;|=\\s*\\{[\\s\\S]*?\\}\\s*;)",
          flags: ""
        },

        {
          type: "regex",
          id: "setFirst",
          label: "Set <code class='w3-codespan'>numbers[0] = 10;</code>",
          pattern:
            "(?:" +
              "\\bnumbers\\s*\\[\\s*0\\s*\\]\\s*=\\s*10\\s*;" +
            "|" +
              "\\bint\\s+numbers\\s*\\[\\s*5\\s*\\]\\s*=\\s*\\{\\s*10\\b[\\s\\S]*?\\}\\s*;" +
            ")",
          flags: ""
        },

        // (requires 5 elements: 10, x, x, x, 50)
        {
          type: "regex",
          id: "setLast",
          label: "Set <code class='w3-codespan'>numbers[4] = 50;</code>",
          pattern:
            "(?:" +
              "\\bnumbers\\s*\\[\\s*4\\s*\\]\\s*=\\s*50\\s*;" +
            "|" +
              "\\bint\\s+numbers\\s*\\[\\s*5\\s*\\]\\s*=\\s*\\{\\s*10\\s*,[\\s\\S]*?,\\s*50\\s*\\}\\s*;" +
            ")",
          flags: ""
        },

        // Accepts:
        // printf("%d\n", numbers[0]);
        // printf("%d %d", numbers[0], numbers[4]);
        // printf("%d\n%d\n", numbers[0], numbers[4]);
        {
          type: "regex",
          id: "printFirst",
          label: "Print <code class='w3-codespan'>numbers[0]</code> with <code class='w3-codespan'>printf</code>",
          pattern:
            "(?:" +
              "printf\\s*\\(\\s*\"[^\"]*%(?:d|i)(?=(?:\"|\\\\n|[^a-zA-Z\"]))[^\"]*\"\\s*,\\s*\\(*\\s*numbers\\s*\\[\\s*0\\s*\\]\\s*\\)*\\s*\\)\\s*;" +
            "|" +
              "printf\\s*\\(\\s*\"[^\"]*%(?:d|i)[^\"]*%(?:d|i)[^\"]*\"\\s*,\\s*\\(*\\s*numbers\\s*\\[\\s*0\\s*\\]\\s*\\)*\\s*,\\s*\\(*\\s*numbers\\s*\\[\\s*4\\s*\\]\\s*\\)*\\s*\\)\\s*;" +
            ")",
          flags: ""
        },
        {
          type: "regex",
          id: "printLast",
          label: "Print <code class='w3-codespan'>numbers[4]</code> with <code class='w3-codespan'>printf</code>",
          pattern:
            "(?:" +
              "printf\\s*\\(\\s*\"[^\"]*%(?:d|i)(?=(?:\"|\\\\n|[^a-zA-Z\"]))[^\"]*\"\\s*,\\s*\\(*\\s*numbers\\s*\\[\\s*4\\s*\\]\\s*\\)*\\s*\\)\\s*;" +
            "|" +
              "printf\\s*\\(\\s*\"[^\"]*%(?:d|i)[^\"]*%(?:d|i)[^\"]*\"\\s*,\\s*\\(*\\s*numbers\\s*\\[\\s*0\\s*\\]\\s*\\)*\\s*,\\s*\\(*\\s*numbers\\s*\\[\\s*4\\s*\\]\\s*\\)*\\s*\\)\\s*;" +
            ")",
          flags: ""
        },

        {
          type: "regex",
          id: "return0",
          label: "End with <code class='w3-codespan'>return 0;</code>",
          pattern: "\\breturn\\s+0\\s*;",
          flags: ""
        },

        {
          type: "regex",
          id: "endsWithBrace",
          label: "End with a closing <code class='w3-codespan'>}</code>",
          pattern: "\\}\\s*$",
          flags: ""
        }
      ]
    }
  ]
};