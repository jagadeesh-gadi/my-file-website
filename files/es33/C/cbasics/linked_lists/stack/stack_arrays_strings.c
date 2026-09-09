#include <stdio.h>
#include <stdlib.h>

#define size 10

char data[size];
int top = -1;

void push(char c)
{
    if (top == size - 1)
    {
        printf("stack overflow\n");
        return;
    }

    top++;
    data[top] = c;
}

void pop()
{
    if (top == -1)
    {
        printf("stack underflow\n");
        return;
    }

    printf("delete data :: %c\n", data[top]);
    top--;
}

void display()
{
    int i;

    if (top == -1)
    {
        printf("stack was empty\n");
        return;
    }

    for (i = top; i >= 0; i--)
    {
        printf("%c", data[i]);
    }

    printf("\n");
}

void reverse()
{
    int i;

    if (top == -1)
    {
        printf("stack was empty\n");
        return;
    }

    printf("reverse string :: ");

    for (i = top; i >= 0; i--)
    {
        printf("%c", data[i]);
    }

    printf("\n");
}

int main()
{
    int i;
    char str[size];

    printf("enter string :: ");
    fgets(str, size, stdin);

    for (i = 0; str[i] != '\0' && str[i] != '\n'; i++)
    {
        push(str[i]);
    }

    printf("\nstack data :: ");
    display();

    reverse();

    return 0;
}