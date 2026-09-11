#include <stdio.h>
#include <string.h>

#define SIZE 100

char stack[SIZE];
int top = -1;

void push(char ch)
{
    stack[++top] = ch;
}

char pop()
{
    return stack[top--];
}

int main()
{
    char exp[100];
    int i;
    char ch;

    printf("Enter expression: ");
    scanf("%s", exp);

    for (i = 0; exp[i] != '\0'; i++)
    {
        ch = exp[i];

        if (ch == '(' || ch == '[' || ch == '{')
        {
            push(ch);
        }
        else if (ch == ')' || ch == ']' || ch == '}')
        {
            if (top == -1)
            {
                printf("Not Balanced\n");
                return 0;
            }

            if (ch == ')' && stack[top] != '(')
            {
                printf("Not Balanced\n");
                return 0;
            }

            if (ch == ']' && stack[top] != '[')
            {
                printf("Not Balanced\n");
                return 0;
            }

            if (ch == '}' && stack[top] != '{')
            {
                printf("Not Balanced\n");
                return 0;
            }

            pop();
        }
    }

    if (top == -1)
        printf("Balanced\n");
    else
        printf("Not Balanced\n");

    return 0;
}