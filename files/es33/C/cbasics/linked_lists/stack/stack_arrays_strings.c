#include <stdio.h>

#define SIZE 80

char data[SIZE];
int top = -1;

void push(char c)
{
    if (top == SIZE - 1)
    {
        printf("Stack Overflow\n");
        return;
    }

    top++;
    data[top] = c;
}

void pop()
{
    if (top == -1)
    {
        printf("Stack Underflow\n");
        return;
    }

    printf("%c", data[top]);
    top--;
}

int main()
{
    char str[SIZE];
    int i = 0;

    printf("Enter string: ");
    fgets(str, SIZE, stdin);

    while (str[i] != '\0' && str[i] != '\n')
    {
        push(str[i]);
        i++;
    }

    printf("Pop characters: ");

    while (top != -1)
    {
        pop();
    }

    printf("\n");

    return 0;
}